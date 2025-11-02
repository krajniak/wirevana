import { defineWireframe, render as runtimeRender } from "@wirevana/runtime";

const notesApp = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "SimpleNotesApp",
  description: "A minimal notes app showcasing text input, lists, and basic note management.",
  imports: [
    {
      namespace: "http://schemas.microsoft.com/dotnet/2021/maui",
      description: "MAUI controls for note taking.",
      docUrl: "https://learn.microsoft.com/dotnet/maui/user-interface/controls/",
    },
  ],
  metadata: {
    platforms: ["ios", "android"],
    targetHost: "chatgpt-canvas",
  },
  styleLibrary: {
    styles: {
      "note-card": {
        surface: "level1",
        colorRole: "surface",
        variant: "outlined",
        platform: "auto"
      },
      "note-title": {
        textStyle: "title-medium",
        colorRole: "surface",
        platform: "auto"
      },
      "note-preview": {
        textStyle: "body-medium",
        colorRole: "surface",
        platform: "auto"
      },
      "note-date": {
        textStyle: "label-small",
        colorRole: "surface",
        platform: "auto"
      },
      "fab-button": {
        surface: "level3",
        colorRole: "primary",
        variant: "filled",
        platform: "auto"
      }
    },
    platform: "auto",
    theme: "light",
    brandColors: {
      primary: "#7c3aed",
      secondary: "#8b5cf6",
      accent: "#a78bfa"
    }
  },
  sampleData: {
    notes: [
      {
        id: "1",
        title: "Shopping List",
        content: "Milk, Bread, Eggs, Apples, Cheese",
        date: "2024-03-01",
        preview: "Milk, Bread, Eggs..."
      },
      {
        id: "2",
        title: "Meeting Notes",
        content: "Discussed project timeline and deliverables. Need to follow up with design team.",
        date: "2024-02-28",
        preview: "Discussed project timeline..."
      },
      {
        id: "3",
        title: "Book Ideas",
        content: "1. Time travel mystery\n2. Space exploration adventure\n3. Historical fiction set in Renaissance",
        date: "2024-02-27",
        preview: "1. Time travel mystery..."
      },
      {
        id: "4",
        title: "Recipe - Pasta",
        content: "Ingredients: Pasta, tomatoes, garlic, basil, olive oil\nBoil pasta, sauté garlic, add tomatoes...",
        date: "2024-02-25",
        preview: "Ingredients: Pasta, tomatoes..."
      }
    ]
  },
  actions: {
    createNote: { type: "popup", target: "NoteEditor" },
    editNote: { type: "popup", target: "NoteEditor" },
    deleteNote: { type: "command", command: "notes.delete" },
    saveNote: { type: "command", command: "notes.save" },
  },
  shell: {
    type: "Shell",
    title: "Notes",
    style: "surface-primary",
  },
  pages: {
    NotesPage: {
      type: "ContentPage",
      title: "Notes",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "NotesHeader" },
          { component: "NotesList" },
          { component: "CreateNoteFab" }
        ],
      },
    },
  },
  components: {
    NotesHeader: {
      type: "HorizontalStack",
      spacing: "standard",
      props: {
        padding: "standard",
        justify: "space-between",
        alignment: "center"
      },
      children: [
        {
          type: "Label",
          props: {
            text: "My Notes",
            style: "headline-large"
          }
        },
        {
          type: "Label",
          props: {
            text: "@sampleData.notes.length notes",
            style: "body-medium",
            opacity: 0.7
          }
        }
      ]
    },

    NotesList: {
      type: "CollectionView",
      props: {
        items: "@sampleData.notes",
        emptyView: { component: "EmptyNotes" }
      },
      template: { type: "DataTemplate", component: "NoteCard" }
    },

    NoteCard: {
      type: "Border",
      style: "note-card",
      props: {
        padding: "standard",
        margin: { horizontal: "standard", vertical: "tight" }
      },
      layout: {
        type: "VerticalStack",
        spacing: "tight",
        children: [
          {
            type: "HorizontalStack",
            spacing: "standard",
            props: { justify: "space-between" },
            children: [
              {
                type: "Label",
                props: {
                  text: "{binding title}",
                  style: "note-title",
                  flex: 1
                }
              },
              {
                type: "Button",
                props: {
                  icon: "more-vertical",
                  variant: "text",
                  size: "small"
                }
              }
            ]
          },
          {
            type: "Label",
            props: {
              text: "{binding preview}",
              style: "note-preview",
              opacity: 0.8,
              maxLines: 2
            }
          },
          {
            type: "HorizontalStack",
            spacing: "standard",
            props: { justify: "space-between", alignment: "center" },
            children: [
              {
                type: "Label",
                props: {
                  text: "{binding date, converter=RelativeDate}",
                  style: "note-date",
                  opacity: 0.6
                }
              },
              {
                type: "HorizontalStack",
                spacing: "tight",
                children: [
                  {
                    type: "Button",
                    props: {
                      text: "Edit",
                      icon: "edit",
                      variant: "text",
                      size: "small"
                    },
                    interactions: { Clicked: "actions.editNote" }
                  },
                  {
                    type: "Button",
                    props: {
                      text: "Delete",
                      icon: "delete",
                      variant: "text",
                      size: "small",
                      colorRole: "error"
                    },
                    interactions: { Clicked: "actions.deleteNote" }
                  }
                ]
              }
            ]
          }
        ]
      },
      interactions: { Tapped: "actions.editNote" }
    },

    CreateNoteFab: {
      type: "FabButton",
      style: "fab-button",
      props: {
        icon: "add",
        variant: "filled",
        size: "large",
        accessibilityLabel: "Create new note"
      },
      interactions: { Clicked: "actions.createNote" }
    },

    EmptyNotes: {
      type: "VerticalStack",
      spacing: "standard",
      props: { alignment: "center", padding: "loose" },
      children: [
        { type: "Icon", props: { name: "file-text", size: "large", opacity: 0.5 } },
        { type: "Label", props: { text: "No notes yet", style: "headline-medium" } },
        {
          type: "Label",
          props: {
            text: "Tap the + button to create your first note!",
            style: "body-medium",
            opacity: 0.7
          },
        },
      ],
    },

    NoteEditor: {
      type: "Popup",
      props: {
        title: "@state.isEditing ? 'Edit Note' : 'New Note'",
        variant: "fullscreen"
      },
      content: {
        type: "VerticalStack",
        spacing: "standard",
        props: { flex: 1 },
        children: [
          {
            type: "Entry",
            props: {
              placeholder: "Note title...",
              value: "@state.currentNote.title",
              variant: "outlined",
              style: "title-large"
            }
          },
          {
            type: "Editor",
            props: {
              placeholder: "Start writing your note...",
              value: "@state.currentNote.content",
              variant: "outlined",
              multiline: true,
              flex: 1,
              minHeight: 300
            }
          }
        ]
      },
      footer: {
        type: "HorizontalStack",
        spacing: "standard",
        props: { justify: "space-between" },
        children: [
          {
            type: "Button",
            props: {
              text: "Cancel",
              variant: "text"
            }
          },
          {
            type: "HorizontalStack",
            spacing: "tight",
            children: [
              {
                type: "Label",
                props: {
                  text: "@state.currentNote.wordCount words",
                  style: "caption-small",
                  opacity: 0.6
                }
              },
              {
                type: "Button",
                props: {
                  text: "Save",
                  variant: "filled",
                  icon: "save"
                },
                interactions: { Clicked: "actions.saveNote" }
              }
            ]
          }
        ]
      }
    }
  },
  state: {
    isEditing: false,
    currentNote: {
      id: null,
      title: "",
      content: "",
      wordCount: 0
    }
  },
  render: "shell",
  rootComponents: {
    shell: {
      type: "Shell",
      content: "NotesPage",
      style: "surface-primary"
    }
  },
});

export function renderToCanvas(canvasEl: HTMLElement, context?: any): any {
  runtimeRender(notesApp);
  console.log("Notes app rendered:", notesApp.name);
  return notesApp;
}

export const render = renderToCanvas;

export function renderDebug(canvasEl: HTMLElement) {
  console.log("[wirevana] Debug mode for notes app");
  return notesApp;
}

export default notesApp;