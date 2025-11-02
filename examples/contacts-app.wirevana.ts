import { defineWireframe, render as runtimeRender } from "@wirevana/runtime";

const contactsApp = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "ContactsApp",
  description: "A simple contacts app demonstrating lists, search, and basic contact management.",
  imports: [
    {
      namespace: "http://schemas.microsoft.com/dotnet/2021/maui",
      description: "MAUI controls for contact management.",
      docUrl: "https://learn.microsoft.com/dotnet/maui/user-interface/controls/",
    },
  ],
  metadata: {
    platforms: ["ios", "android"],
    targetHost: "chatgpt-canvas",
  },
  styleLibrary: {
    styles: {
      "contact-item": {
        surface: "level0",
        colorRole: "surface",
        platform: "auto"
      },
      "contact-avatar": {
        surface: "level2",
        colorRole: "primary",
        variant: "tonal",
        platform: "auto"
      },
      "contact-name": {
        textStyle: "title-medium",
        colorRole: "surface",
        platform: "auto"
      },
      "contact-details": {
        textStyle: "body-medium",
        colorRole: "surface",
        platform: "auto"
      },
      "search-bar": {
        surface: "level1",
        colorRole: "surface",
        platform: "auto"
      }
    },
    platform: "auto",
    theme: "light",
    brandColors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    }
  },
  sampleData: {
    contacts: [
      {
        id: "1",
        name: "Alice Johnson",
        phone: "(555) 123-4567",
        email: "alice@example.com",
        initials: "AJ"
      },
      {
        id: "2",
        name: "Bob Smith",
        phone: "(555) 234-5678",
        email: "bob@example.com",
        initials: "BS"
      },
      {
        id: "3",
        name: "Carol Davis",
        phone: "(555) 345-6789",
        email: "carol@example.com",
        initials: "CD"
      },
      {
        id: "4",
        name: "David Wilson",
        phone: "(555) 456-7890",
        email: "david@example.com",
        initials: "DW"
      },
      {
        id: "5",
        name: "Emma Brown",
        phone: "(555) 567-8901",
        email: "emma@example.com",
        initials: "EB"
      }
    ]
  },
  actions: {
    searchContacts: { type: "command", command: "contacts.search" },
    callContact: { type: "command", command: "contacts.call" },
    messageContact: { type: "command", command: "contacts.message" },
    addContact: { type: "popup", target: "AddContactForm" },
  },
  shell: {
    type: "Shell",
    title: "Contacts",
    style: "surface-primary",
  },
  pages: {
    ContactsPage: {
      type: "ContentPage",
      title: "Contacts",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "ContactsHeader" },
          { component: "SearchSection" },
          { component: "ContactsList" },
        ],
      },
    },
  },
  components: {
    ContactsHeader: {
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
            text: "Contacts",
            style: "headline-large"
          }
        },
        {
          type: "Button",
          props: {
            text: "Add",
            icon: "add",
            variant: "filled",
            style: "primary-action"
          },
          interactions: { Clicked: "actions.addContact" }
        }
      ]
    },

    SearchSection: {
      type: "Entry",
      props: {
        placeholder: "Search contacts...",
        icon: "search",
        variant: "filled",
        style: "search-bar",
        margin: { horizontal: "standard", bottom: "standard" },
        value: "@state.searchQuery"
      },
      interactions: { TextChanged: "actions.searchContacts" }
    },

    ContactsList: {
      type: "CollectionView",
      props: {
        items: "@sampleData.contacts",
        emptyView: { component: "EmptyContacts" }
      },
      template: { type: "DataTemplate", component: "ContactItem" }
    },

    ContactItem: {
      type: "Border",
      style: "contact-item",
      props: {
        variant: "default",
        padding: "standard",
        margin: { horizontal: "standard", vertical: "tight" }
      },
      layout: {
        type: "HorizontalStack",
        spacing: "standard",
        children: [
          { component: "ContactAvatar" },
          { component: "ContactInfo" },
          { component: "ContactActions" }
        ]
      }
    },

    ContactAvatar: {
      type: "Border",
      style: "contact-avatar",
      props: {
        variant: "tonal",
        padding: "standard",
        width: 50,
        height: 50,
        cornerRadius: 25
      },
      layout: {
        type: "VerticalStack",
        props: { alignment: "center", justify: "center" },
        children: [
          {
            type: "Label",
            props: {
              text: "{binding initials}",
              style: "title-medium",
              horizontalTextAlignment: "Center"
            }
          }
        ]
      }
    },

    ContactInfo: {
      type: "VerticalStack",
      spacing: "tight",
      props: { flex: 1 },
      children: [
        {
          type: "Label",
          props: {
            text: "{binding name}",
            style: "contact-name"
          }
        },
        {
          type: "Label",
          props: {
            text: "{binding phone}",
            style: "contact-details",
            opacity: 0.8
          }
        },
        {
          type: "Label",
          props: {
            text: "{binding email}",
            style: "contact-details",
            opacity: 0.6
          }
        }
      ]
    },

    ContactActions: {
      type: "HorizontalStack",
      spacing: "tight",
      children: [
        {
          type: "Button",
          props: {
            icon: "phone",
            variant: "text",
            size: "small"
          },
          interactions: { Clicked: "actions.callContact" }
        },
        {
          type: "Button",
          props: {
            icon: "message",
            variant: "text",
            size: "small"
          },
          interactions: { Clicked: "actions.messageContact" }
        }
      ]
    },

    EmptyContacts: {
      type: "VerticalStack",
      spacing: "standard",
      props: { alignment: "center", padding: "loose" },
      children: [
        { type: "Icon", props: { name: "users", size: "large", opacity: 0.5 } },
        { type: "Label", props: { text: "No contacts found", style: "headline-medium" } },
        {
          type: "Label",
          props: {
            text: "Add your first contact to get started!",
            style: "body-medium",
            opacity: 0.7
          },
        },
      ],
    },

    AddContactForm: {
      type: "Popup",
      props: {
        title: "Add Contact",
        variant: "elevated"
      },
      content: {
        type: "VerticalStack",
        spacing: "standard",
        children: [
          {
            type: "Entry",
            props: {
              label: "Full Name",
              placeholder: "Enter full name",
              icon: "profile",
              variant: "outlined"
            }
          },
          {
            type: "Entry",
            props: {
              label: "Phone Number",
              placeholder: "(555) 123-4567",
              icon: "phone",
              variant: "outlined",
              keyboard: "telephone"
            }
          },
          {
            type: "Entry",
            props: {
              label: "Email",
              placeholder: "email@example.com",
              icon: "mail",
              variant: "outlined",
              keyboard: "email"
            }
          }
        ]
      },
      footer: {
        type: "HorizontalStack",
        spacing: "standard",
        props: { justify: "flex-end" },
        children: [
          {
            type: "Button",
            props: {
              text: "Cancel",
              variant: "text"
            }
          },
          {
            type: "Button",
            props: {
              text: "Save",
              variant: "filled",
              icon: "save"
            }
          }
        ]
      }
    }
  },
  state: {
    searchQuery: "",
    filteredContacts: "@sampleData.contacts"
  },
  render: "shell",
  rootComponents: {
    shell: {
      type: "Shell",
      content: "ContactsPage",
      style: "surface-primary"
    }
  },
});

export function renderToCanvas(canvasEl: HTMLElement, context?: any): any {
  runtimeRender(contactsApp);
  console.log("Contacts app rendered:", contactsApp.name);
  return contactsApp;
}

export const render = renderToCanvas;

export function renderDebug(canvasEl: HTMLElement) {
  console.log("[wirevana] Debug mode for contacts app");
  return contactsApp;
}

export default contactsApp;