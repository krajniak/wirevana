import React, { useState } from "react";
import * as Components from "./components";

interface WireframeDefinition {
  name: string;
  description?: string;
  shell: any;
  tabs: Record<string, any>;
  pages: Record<string, any>;
  components: Record<string, any>;
  sampleData: Record<string, any>;
  actions: Record<string, any>;
  state: Record<string, any>;
}

interface ComponentRenderer {
  renderComponent(componentDef: any, props?: any): React.ReactElement;
}

export function WireframeRenderer({ wireframe }: { wireframe: WireframeDefinition }) {
  const [currentTab, setCurrentTab] = useState(Object.keys(wireframe.tabs)[0]);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(wireframe.state?.flags?.showLoanSnackbar || false);

  // Helper to resolve bindings from sample data
  const resolveBinding = (value: string) => {
    if (!value?.startsWith("{binding ")) return value;
    
    const path = value.replace("{binding ", "").replace("}", "").split(",")[0].trim();
    
    // For now, return mock values based on common patterns
    switch (path) {
      case "itemName": return "DSLR Camera";
      case "status": return "On schedule";
      case "due": return "Due Mar 2";
      case "borrowerName": return "Jordan";
      case "loanedOn": return "2 days ago";
      case "name": return "Travel Tripod";
      default: return value;
    }
  };

  // Component renderer that maps wireframe components to React components
  const renderComponent = (componentDef: any, key?: string): React.ReactElement => {
    if (!componentDef) {
      return <div key={key}>Component definition not found</div>;
    }

    const componentId = key || componentDef.id;
    const definition = componentDef.component 
      ? wireframe.components[componentDef.component] 
      : componentDef;

    if (!definition) {
      return <div key={componentId}>Component '{componentDef.component}' not found</div>;
    }

    const props = { ...definition.props, ...componentDef.props };

    switch (definition.type) {
      case "Border":
        return (
          <Components.BorderCard
            key={componentId}
            header={resolveBinding(props.header)}
            footer={resolveBinding(props.footer)}
            variant={props.variant || "default"}
            padding={props.padding}
            style={props.style}
          >
            {definition.layout?.children?.map((child: any, index: number) => 
              renderComponent(child, `${componentId}-child-${index}`)
            )}
          </Components.BorderCard>
        );

      case "VerticalStack":
        return (
          <Components.StackLayout
            key={componentId}
            orientation="vertical"
            gap={definition.spacing || 12}
            style={props.style}
          >
            {definition.children?.map((child: any, index: number) => 
              renderComponent(child, `${componentId}-child-${index}`)
            )}
          </Components.StackLayout>
        );

      case "HorizontalStack":
        return (
          <Components.StackLayout
            key={componentId}
            orientation="horizontal"
            gap={definition.spacing || 12}
            style={props.style}
          >
            {definition.children?.map((child: any, index: number) => 
              renderComponent(child, `${componentId}-child-${index}`)
            )}
          </Components.StackLayout>
        );
      
      case "Grid":
        return (
          <Components.GridLayout
            key={componentId}
            columns={props.columns || 2}
            gap={props.gap || 12}
            style={props.style}
          >
            {definition.children?.map((child: any, index: number) =>
              renderComponent(child, `${componentId}-child-${index}`)
            )}
          </Components.GridLayout>
        );

      case "FlexLayout":
        return (
          <Components.FlexLayout
            key={componentId}
            direction={props.direction || "row"}
            wrap={props.wrap || "wrap"}
            gap={props.gap || 12}
            style={props.style}
          >
            {wireframe.sampleData.items?.map((item: any, index: number) => (
              <Components.BorderCard
                key={index}
                header={item.name}
                footer="Tap to mark priority"
                variant="elevated"
                style={{ color: "white", minWidth: 120 }}
              >
                <div />
              </Components.BorderCard>
            ))}
          </Components.FlexLayout>
        );

      case "CollectionView":
        const items = wireframe.sampleData.loans || [];
        return (
          <Components.CollectionView
            key={componentId}
            items={items}
            emptyPlaceholder="No loans yet. Tap the floating action button to track your first loan."
            renderItem={(item: any, index: number) => (
              <Components.SwipeView
                key={index}
                rightItems={[
                  { content: "Edit", background: "#2563eb" },
                  { content: "Delete", background: "#ef4444" }
                ]}
              >
                <Components.BorderCard
                  header={item.itemName}
                  footer={`Loaned ${item.loanedOn ? "2 days ago" : ""}`}
                  style={{ margin: 8 }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ color: "#6b7280", fontSize: 12 }}>Status</span>
                      <span style={{ fontWeight: 600 }}>{item.status}</span>
                      <span style={{ color: "#6b7280", fontSize: 12 }}>Due</span>
                      <span style={{ fontWeight: 600 }}>{item.due}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "#6b7280", fontSize: 12 }}>Borrower</span>
                      <span>{item.borrowerName}</span>
                    </div>
                  </div>
                </Components.BorderCard>
              </Components.SwipeView>
            )}
            footer={
              <div style={{ textAlign: "center", color: "#6b7280", fontSize: 12, padding: 16 }}>
                Swipe left on any loan to edit or delete.
              </div>
            }
          />
        );

      case "Button":
        return (
          <button
            key={componentId}
            type="button"
            style={{
              padding: "12px 24px",
              borderRadius: 12,
              border: props.appearance === "outlined" ? "1px solid #2563eb" : "none",
              background: props.appearance === "primary" ? "#2563eb" : props.appearance === "outlined" ? "transparent" : "#f3f4f6",
              color: props.appearance === "primary" ? "white" : "#2563eb",
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={() => {
              if (componentDef.interactions?.Clicked === "actions.openCreateLoan") {
                setShowPopup("CreateLoanPopup");
              }
            }}
          >
            {resolveBinding(props.text)}
          </button>
        );

      case "Label":
        return (
          <span
            key={componentId}
            style={{
              fontSize: props.style === "display-hero" ? 32 : props.style === "label-caption" ? 12 : 14,
              fontWeight: props.style === "label-strong" || props.style === "display-hero" ? 600 : 400,
              color: props.style === "label-muted" ? "#6b7280" : "inherit",
              textAlign: props.horizontalTextAlignment === "Center" ? "center" : undefined
            }}
          >
            {resolveBinding(props.text)}
          </span>
        );

      case "Entry":
        return (
          <Components.Entry
            key={componentId}
            label={props.label}
            placeholder={props.placeholder}
            value={props.value || ""}
            onChange={() => {}}
          />
        );

      case "Picker":
        const options = props.options?.startsWith("@sampleData.") 
          ? wireframe.sampleData[props.options.replace("@sampleData.", "")] || []
          : [];
        return (
          <Components.Picker
            key={componentId}
            label={props.label}
            options={options.map((item: any) => ({ 
              value: item.id, 
              label: item.name 
            }))}
            value={null}
            onChange={() => {}}
          />
        );

      case "Switch":
        return (
          <div key={componentId} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span>{props.label}</span>
            <input 
              type="checkbox" 
              defaultChecked={props.isToggled} 
              style={{ transform: "scale(1.2)" }}
            />
          </div>
        );

      case "FabButton":
        return (
          <Components.FabButton
            key={componentId}
            icon={props.icon}
            label={props.label}
            onClick={() => setShowPopup("CreateLoanPopup")}
            position="bottom-right"
          />
        );

      default:
        return (
          <div key={componentId} style={{ padding: 8, border: "1px dashed #ccc", borderRadius: 4 }}>
            {componentDef.type} ({componentId})
          </div>
        );
    }
  };

  // Render current page based on selected tab
  const currentTabDef = wireframe.tabs[currentTab];
  const currentPageId = wireframe.components[currentTabDef.content]?.page;
  const currentPage = wireframe.pages[currentPageId];

  return (
    <div style={{ 
      width: "390px", 
      height: "844px", 
      display: "flex", 
      flexDirection: "column",
      margin: "0 auto",
      border: "1px solid #e5e7eb",
      borderRadius: "24px",
      overflow: "hidden",
      background: "#f9fafb",
      position: "relative"
    }}>
      {/* Page Content */}
      <div style={{ flex: 1, overflow: "auto", background: "#f9fafb", paddingBottom: "80px" }}>
        {currentPage?.layout && (
          <div style={{ padding: 16 }}>
            {currentPage.layout.children?.map((child: any, index: number) => 
              renderComponent(child, `page-child-${index}`)
            )}
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <div style={{ 
        display: "flex", 
        borderTop: "1px solid #e5e7eb", 
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "80px",
        paddingTop: "8px"
      }}>
        {Object.entries(wireframe.tabs).map(([tabId, tab]: [string, any]) => (
          <button
            key={tabId}
            type="button"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              padding: "8px 4px",
              border: "none",
              background: "transparent",
              color: currentTab === tabId ? "#6750a4" : "#6b7280",
              fontSize: "10px",
              fontWeight: 500,
              cursor: "pointer"
            }}
            onClick={() => setCurrentTab(tabId)}
          >
            <Components.InlineIcon 
              name={tab.icon} 
              size={20}
              color={currentTab === tabId ? "#6750a4" : "#6b7280"}
            />
            {tab.title}
          </button>
        ))}
      </div>

      {/* Floating Action Button */}
      {/* FAB handled by individual pages */}

      {/* Popups */}
      {showPopup && (
        <Components.Popup
          isOpen={true}
          onClose={() => setShowPopup(null)}
          title={showPopup === "CreateLoanPopup" ? "Log item loan" : "Edit item loan"}
          content={
            <Components.StackLayout orientation="vertical" gap={16}>
              <Components.Picker
                label="Item"
                options={wireframe.sampleData.items?.map((item: any) => ({ value: item.id, label: item.name })) || []}
                value="dslr"
                onChange={() => {}}
              />
              <Components.Picker
                label="Borrower"
                options={wireframe.sampleData.borrowers?.map((borrower: any) => ({ value: borrower.id, label: borrower.name })) || []}
                value="1"
                onChange={() => {}}
              />
              <Components.Entry
                label="Notes"
                placeholder="Optional hand-off notes"
                value="Lens cap included"
                onChange={() => {}}
              />
            </Components.StackLayout>
          }
          footer={
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button
                type="button"
                style={{ padding: "8px 16px", border: "none", background: "transparent", color: "#6b7280" }}
                onClick={() => setShowPopup(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#2563eb", color: "white" }}
                onClick={() => {
                  setShowPopup(null);
                  setShowSnackbar(true);
                }}
              >
                Save loan
              </button>
            </div>
          }
        />
      )}

      {/* Snackbar */}
      {showSnackbar && (
        <Components.Snackbar
          message="Loan saved"
          actionLabel="Undo"
          isVisible={true}
          onAction={() => setShowSnackbar(false)}
          durationMs={3000}
        />
      )}
    </div>
  );
}