export * from "./components";
export * from "./canvas/adapter";

import React from "react";
import { createRoot } from "react-dom/client";
import { BorderCard } from "./components/Card";
import { getCanvasHostAdapter } from "./canvas/adapter";

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

  // Render a preview of the wireframe
  root.render(
    React.createElement(BorderCard, {
      header: wireframe.name || "Wirevana Wireframe",
      footer: wireframe.description || "Interactive wireframe preview",
      background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
      style: { margin: 20, color: "white" },
      children: React.createElement("div", null, 
        React.createElement("p", null, `Components: ${Object.keys(wireframe.components || {}).length}`),
        React.createElement("p", null, `Pages: ${Object.keys(wireframe.pages || {}).length}`),
        React.createElement("p", null, `Tabs: ${Object.keys(wireframe.tabs || {}).length}`)
      )
    })
  );

  // Notify adapter that rendering is complete
  adapter.post("wireframe-rendered", {
    name: wireframe.name,
    timestamp: Date.now()
  });
}
