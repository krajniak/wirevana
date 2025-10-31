export * from "./components";
export * from "./canvas/adapter";
export * from "./WireframeRenderer";

import React from "react";
import { createRoot } from "react-dom/client";
import { BorderCard } from "./components/Card";
import { getCanvasHostAdapter } from "./canvas/adapter";
import { WireframeRenderer } from "./WireframeRenderer";

export function renderToCanvas(canvasEl: HTMLElement, context?: any) {
  if (!canvasEl) {
    throw new Error("renderToCanvas(canvasEl) requires a valid canvas element.");
  }

  // Create React root
  const root = createRoot(canvasEl);
  
  // Initialize canvas adapter for communication with ChatGPT Canvas
  const adapter = getCanvasHostAdapter();
  
  // Extract wireframe definition from context
  const wireframe = context?.module?.default || context?.module;
  
  if (!wireframe) {
    root.render(
      React.createElement(BorderCard, {
        header: "Wirevana Canvas",
        footer: "No wireframe definition found",
        style: { margin: 20 },
        children: React.createElement("div", null, "Please ensure your module exports a wireframe definition.")
      })
    );
    return;
  }

  // Render the interactive wireframe
  root.render(
    React.createElement(WireframeRenderer, { wireframe })
  );

  // Notify adapter that rendering is complete
  adapter.post("wireframe-rendered", {
    name: wireframe.name,
    timestamp: Date.now()
  });
}
