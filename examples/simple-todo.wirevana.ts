import { defineWireframe, render as runtimeRender } from "@wirevana/runtime";

const todoApp = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "SimpleTodoApp",
  description: "A minimal todo list app demonstrating basic CRUD operations with clean mobile UI.",
  imports: [
    {
      namespace: "http://schemas.microsoft.com/dotnet/2021/maui",
      description: "MAUI controls for mobile-first design.",
      docUrl: "https://learn.microsoft.com/dotnet/maui/user-interface/controls/",
    },
  ],
  metadata: {
    platforms: ["ios", "android"],
    targetHost: "chatgpt-canvas",
  },
  styleLibrary: {
    styles: {
      "app-header": {
        surface: "level1",
        colorRole: "primary",
        textStyle: "headline-large",
        platform: "auto"
      },
      "todo-item": {
        surface: "level0",
        colorRole: "surface",
        platform: "auto"
      },
      "add-button": {
        surface: "level2",
        colorRole: "primary",
        variant: "filled",
        platform: "auto"
      },
      "delete-button": {
        colorRole: "error",
        variant: "text",
        platform: "auto"
      }
    },
    platform: "auto",
    theme: "light",
    brandColors: {
      primary: "#2563eb",
      secondary: "#64748b",
      accent: "#0ea5e9"
    }
  },
  sampleData: {
    todos: [
      { id: "1", text: "Buy groceries", completed: false },
      { id: "2", text: "Walk the dog", completed: true },
      { id: "3", text: "Finish project", completed: false },
      { id: "4", text: "Call dentist", completed: false },
    ],
  },
  actions: {
    addTodo: { type: "command", command: "todos.add" },
    toggleTodo: { type: "command", command: "todos.toggle" },
    deleteTodo: { type: "command", command: "todos.delete" },
  },
  shell: {
    type: "Shell",
    title: "My Todos",
    style: "surface-primary",
  },
  pages: {
    TodoPage: {
      type: "ContentPage",
      title: "My Todos",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "AppHeader" },
          { component: "AddTodoSection" },
          { component: "TodosList" },
        ],
      },
    },
  },
  components: {
    AppHeader: {
      type: "Label",
      props: {
        text: "My Todos",
        style: "app-header",
        horizontalTextAlignment: "Center",
        padding: "standard"
      }
    },

    AddTodoSection: {
      type: "HorizontalStack",
      spacing: "standard",
      props: { padding: "standard" },
      children: [
        {
          type: "Entry",
          props: {
            placeholder: "What needs to be done?",
            value: "@state.newTodoText",
            variant: "outlined",
            flex: 1
          }
        },
        {
          type: "Button",
          props: {
            text: "Add",
            icon: "add",
            style: "add-button"
          },
          interactions: { Clicked: "actions.addTodo" }
        }
      ]
    },

    TodosList: {
      type: "CollectionView",
      props: {
        items: "@sampleData.todos",
        emptyView: { component: "EmptyTodos" }
      },
      template: { type: "DataTemplate", component: "TodoItem" }
    },

    TodoItem: {
      type: "Border",
      style: "todo-item",
      props: {
        variant: "outlined",
        padding: "standard",
        margin: { horizontal: "standard", vertical: "tight" }
      },
      layout: {
        type: "HorizontalStack",
        spacing: "standard",
        children: [
          {
            type: "CheckBox",
            props: {
              checked: "{binding completed}",
              size: "medium"
            },
            interactions: { CheckedChanged: "actions.toggleTodo" }
          },
          {
            type: "Label",
            props: {
              text: "{binding text}",
              style: "body-large",
              flex: 1,
              textDecorations: "{binding completed, converter=CompletedToStrikethrough}"
            }
          },
          {
            type: "Button",
            props: {
              text: "Delete",
              icon: "delete",
              style: "delete-button"
            },
            interactions: { Clicked: "actions.deleteTodo" }
          }
        ]
      }
    },

    EmptyTodos: {
      type: "VerticalStack",
      spacing: "standard",
      props: { alignment: "center", padding: "loose" },
      children: [
        { type: "Icon", props: { name: "check-circle", size: "large" } },
        { type: "Label", props: { text: "No todos yet", style: "headline-medium" } },
        {
          type: "Label",
          props: {
            text: "Add your first todo above to get started!",
            style: "body-medium",
          },
        },
      ],
    },
  },
  state: {
    newTodoText: "",
    todos: "@sampleData.todos"
  },
  render: "shell",
  rootComponents: {
    shell: {
      type: "Shell",
      content: "TodoPage",
      style: "surface-primary"
    }
  },
});

export function renderToCanvas(canvasEl: HTMLElement, context?: any): any {
  runtimeRender(todoApp);
  console.log("Simple todo app rendered:", todoApp.name);
  return todoApp;
}

export const render = renderToCanvas;

export function renderDebug(canvasEl: HTMLElement) {
  console.log("[wirevana] Debug mode for todo app");
  return todoApp;
}

export default todoApp;