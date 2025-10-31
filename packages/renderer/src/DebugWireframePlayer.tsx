import React, { useState, useMemo, useEffect } from 'react';
import { WireframeRenderer } from './WireframeRenderer';
import { BorderCard } from './components/Card';
import { StackLayout } from './components/Layout';
import { InlineIcon } from './components/Icons';

interface DebugWireframePlayerProps {
  wireframe: any;
  autoPlay?: boolean;
  intervalMs?: number;
}

interface InspectEntry {
  id: string;
  type: string;
  style?: string;
  variant?: string;
  errors?: string[];
}

// Simple heuristic inspection of component definitions
function inspectWireframe(wireframe: any): InspectEntry[] {
  if (!wireframe?.components) return [];
  return Object.entries(wireframe.components).map(([id, def]: [string, any]) => {
    const errors: string[] = [];
    if (def.type === 'Button' && !def.props?.text && !def.props?.icon) {
      errors.push('Button without text or icon');
    }
    if (def.type === 'Border' && !def.style && !def.props?.variant) {
      errors.push('Border without style or variant');
    }
    if (def.type === 'CollectionView' && !def.props?.items) {
      errors.push('CollectionView missing items');
    }
    return {
      id,
      type: def.type,
      style: def.style || def.props?.style,
      variant: def.props?.variant,
      errors: errors.length ? errors : undefined,
    };
  });
}

export const DebugWireframePlayer: React.FC<DebugWireframePlayerProps> = ({ wireframe, autoPlay = false, intervalMs = 1500 }) => {
  const componentIds = Object.keys(wireframe.components || {});
  const [index, setIndex] = useState(0);
  const [showInspector, setShowInspector] = useState(true);
  const [paused, setPaused] = useState(!autoPlay);

  const inspection = useMemo(() => inspectWireframe(wireframe), [wireframe]);

  useEffect(() => {
    if (paused) return;
    const handle = setTimeout(() => {
      setIndex(i => (i + 1) % componentIds.length);
    }, intervalMs);
    return () => clearTimeout(handle);
  }, [index, paused, intervalMs, componentIds.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setIndex(i => (i + 1) % componentIds.length);
        setPaused(true);
      } else if (e.key === 'ArrowLeft') {
        setIndex(i => (i - 1 + componentIds.length) % componentIds.length);
        setPaused(true);
      } else if (e.key === ' ') {
        setPaused(p => !p);
      } else if (e.key === 'i') {
        setShowInspector(s => !s);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [componentIds.length]);

  const currentId = componentIds[index];
  const currentDef = wireframe.components[currentId];

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Player area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
        <BorderCard header={`Component: ${currentId}`} variant='elevated' padding='loose' style={{ width: 420, minHeight: 320 }}>
          <div style={{ marginBottom: 12, fontSize: 12, color: '#6b7280' }}>
            {currentDef?.type} {currentDef?.style ? `· style: ${currentDef.style}` : ''} {currentDef?.props?.variant ? `· variant: ${currentDef.props.variant}` : ''}
          </div>
          {/* Re-render single component via tiny wireframe slice */}
          <WireframeRenderer wireframe={{ ...wireframe, components: { [currentId]: currentDef }, tabs: wireframe.tabs, pages: wireframe.pages }} />
        </BorderCard>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button onClick={() => setIndex(i => (i - 1 + componentIds.length) % componentIds.length)} style={btnStyle}>
            <InlineIcon name='back' size={16} /> Prev
          </button>
          <button onClick={() => setPaused(p => !p)} style={btnStyle}>
            <InlineIcon name={paused ? 'play' : 'pause'} size={16} /> {paused ? 'Play' : 'Pause'}
          </button>
          <button onClick={() => setIndex(i => (i + 1) % componentIds.length)} style={btnStyle}>
            Next <InlineIcon name='forward' size={16} />
          </button>
          <button onClick={() => setShowInspector(s => !s)} style={btnStyle}>
            <InlineIcon name='search' size={16} /> {showInspector ? 'Hide Inspector' : 'Show Inspector'}
          </button>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#6b7280' }}>Keyboard: ← → step · Space play/pause · i toggle inspector</div>
      </div>

      {/* Inspector */}
      {showInspector && (
        <div style={{ width: 360, borderLeft: '1px solid #e5e7eb', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', fontWeight: 600 }}>Component Inspector</div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {inspection.map(entry => (
              <div key={entry.id} style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{entry.id}</strong>
                  <span style={{ color: '#6b7280' }}>{entry.type}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {entry.style && <Tag label={entry.style} />}
                  {entry.variant && <Tag label={entry.variant} />}
                  {entry.errors?.map(err => <Tag key={err} label={err} tone='error' />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '6px 12px',
  fontSize: 12,
  borderRadius: 6,
  background: '#eef2ff',
  border: '1px solid #c7d2fe',
  cursor: 'pointer',
};

const Tag: React.FC<{ label: string; tone?: 'error' | 'info' }> = ({ label, tone }) => (
  <span style={{
    padding: '2px 6px',
    fontSize: 10,
    borderRadius: 4,
    background: tone === 'error' ? '#fee2e2' : '#f1f5f9',
    color: tone === 'error' ? '#b91c1c' : '#334155',
    border: '1px solid',
    borderColor: tone === 'error' ? '#fecaca' : '#e2e8f0'
  }}>{label}</span>
);

export default DebugWireframePlayer;