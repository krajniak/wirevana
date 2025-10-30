export type CanvasMessageHandler<T = unknown> = (
  payload: T | undefined,
  event: MessageEvent
) => void;

interface CanvasEnvelope<T = unknown> {
  readonly source: "wirevana";
  readonly type: string;
  readonly payload?: T;
}

const CHATGPT_CANVAS_ORIGIN = "https://chat.openai.com";

function isCanvasEnvelope(value: unknown): value is CanvasEnvelope {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return candidate.source === "wirevana" && typeof candidate.type === "string";
}

export class CanvasHostAdapter {
  private readonly handlers = new Map<string, Set<CanvasMessageHandler>>();
  private readonly hostWindow: Window;
  private readonly targetOrigin: string;
  private readonly listener: (event: MessageEvent) => void;

  public constructor(targetOrigin: string = CHATGPT_CANVAS_ORIGIN) {
    if (typeof window === "undefined") {
      throw new Error("CanvasHostAdapter can only run in a browser context.");
    }

    if (window.parent === window) {
      throw new Error(
        "CanvasHostAdapter expects to run inside ChatGPT Canvas within an iframe."
      );
    }

    this.hostWindow = window.parent;
    this.targetOrigin = targetOrigin;

    this.listener = (event: MessageEvent) => {
      if (event.origin !== this.targetOrigin) {
        return;
      }

      if (!isCanvasEnvelope(event.data)) {
        return;
      }

      const { type, payload } = event.data;
      const typeHandlers = this.handlers.get(type);
      if (!typeHandlers) {
        return;
      }

      typeHandlers.forEach((handler) => handler(payload, event));
    };

    window.addEventListener("message", this.listener);
    this.post("ready", { timestamp: Date.now() });
  }

  public post<T = unknown>(type: string, payload?: T) {
    const envelope: CanvasEnvelope<T> = {
      source: "wirevana",
      type,
      payload,
    };

    this.hostWindow.postMessage(envelope, this.targetOrigin);
  }

  public on<T = unknown>(type: string, handler: CanvasMessageHandler<T>) {
    const current = this.handlers.get(type) ?? new Set();
    current.add(handler as CanvasMessageHandler);
    this.handlers.set(type, current);

    return () => {
      current.delete(handler as CanvasMessageHandler);
      if (current.size === 0) {
        this.handlers.delete(type);
      }
    };
  }

  public updateHeight(height: number) {
    this.post("resize", { height });
  }

  public navigate(to: string) {
    this.post("navigate", { to });
  }

  public dispose() {
    window.removeEventListener("message", this.listener);
    this.handlers.clear();
  }
}

let adapterSingleton: CanvasHostAdapter | undefined;

export function getCanvasHostAdapter() {
  if (!adapterSingleton) {
    adapterSingleton = new CanvasHostAdapter();
  }

  return adapterSingleton;
}
