import { defineWireframe, render as runtimeRender } from "@wirevana/runtime";

const uiMock = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "MvpMobileNativeShowcase",
  description:
    "Demonstrates mobile-native styling with Material Design 3 and iOS design patterns for an item lending tracker.",
  imports: [
    {
      namespace: "http://schemas.microsoft.com/dotnet/2021/maui",
      description:
        "Default MAUI controls with mobile-native styling (Shell, ContentPage, Border, Grid, CollectionView, Entry, Picker, etc.).",
      docUrl: "https://learn.microsoft.com/dotnet/maui/user-interface/controls/",
    },
    {
      alias: "x",
      namespace: "http://schemas.microsoft.com/winfx/2009/xaml",
      description: "XAML language primitives used by DataTemplate bindings and static resources.",
      docUrl: "https://learn.microsoft.com/dotnet/maui/xaml/fundamentals/xaml-basics",
    },
    {
      alias: "toolkit",
      namespace: "http://schemas.microsoft.com/dotnet/2022/maui/toolkit",
      assembly: "CommunityToolkit.Maui",
      description: "Toolkit helpers used for Popup and Snackbar experiences.",
      docUrl: "https://learn.microsoft.com/dotnet/communitytoolkit/maui/overview",
    },
  ],
  metadata: {
    platforms: ["ios", "android"],
    targetHost: "chatgpt-canvas",
  },
  styleLibrary: {
    styles: {
      // Mobile-native surface styles
      "hero-card": {
        surface: "level3",
        colorRole: "primary",
        platform: "auto"
      },
      "metric-card": {
        surface: "level2",
        colorRole: "surface",
        platform: "auto"
      },
      "list-item": {
        surface: "level0",
        colorRole: "surface",
        platform: "auto"
      },
      "floating-action": {
        surface: "level4",
        colorRole: "primary",
        variant: "elevated",
        platform: "auto"
      },
      // Typography styles
      "display-text": {
        textStyle: "display-large",
        colorRole: "surface",
        platform: "auto"
      },
      "metric-value": {
        textStyle: "headline-large",
        colorRole: "primary",
        platform: "auto"
      },
      "card-title": {
        textStyle: "title-medium",
        colorRole: "surface",
        platform: "auto"
      },
      "body-text": {
        textStyle: "body-medium",
        colorRole: "surface",
        platform: "auto"
      },
      "caption-text": {
        textStyle: "label-small",
        colorRole: "surface",
        platform: "auto"
      },
      // Button styles
      "primary-action": {
        surface: "level2",
        colorRole: "primary",
        variant: "filled",
        textStyle: "label-large",
        platform: "auto"
      },
      "secondary-action": {
        surface: "level1",
        colorRole: "primary",
        variant: "tonal",
        textStyle: "label-large",
        platform: "auto"
      },
      "destructive-action": {
        surface: "level1",
        colorRole: "error",
        variant: "tonal",
        textStyle: "label-large",
        platform: "auto"
      }
    },
    platform: "auto",
    theme: "light",
    brandColors: {
      primary: "#94a3b8",
      secondary: "#94a3b8", 
      accent: "#cbd5e1"
    }
  },
  sampleData: {
    items: [
      { id: "dslr", name: "DSLR Camera" },
      { id: "projector", name: "Mini Projector" },
      { id: "tripod", name: "Travel Tripod" },
      { id: "lens", name: "Wide Angle Lens" },
      { id: "microphone", name: "Wireless Mic" },
    ],
    borrowers: [
      { id: "1", name: "Jordan Smith" },
      { id: "2", name: "Sky Chen" },
      { id: "3", name: "Harper Kim" },
      { id: "4", name: "River Johnson" },
    ],
    loans: [
      {
        id: "l1",
        itemId: "dslr",
        itemName: "DSLR Camera",
        borrowerId: "1",
        borrowerName: "Jordan Smith",
        loanedOn: "2024-02-18T18:30:00Z",
        status: "On schedule",
        due: "Due Mar 2",
      },
      {
        id: "l2",
        itemId: "projector",
        itemName: "Mini Projector",
        borrowerId: "2",
        borrowerName: "Sky Chen",
        loanedOn: "2024-02-16T20:15:00Z",
        status: "Returned",
        due: "Returned Feb 20",
      },
      {
        id: "l3",
        itemId: "microphone",
        itemName: "Wireless Mic",
        borrowerId: "3",
        borrowerName: "Harper Kim",
        loanedOn: "2024-02-15T14:20:00Z",
        status: "Overdue",
        due: "Was due Feb 25",
      },
    ],
  },
  actions: {
    openCreateLoan: { type: "popup", target: "CreateLoanPopup" },
    editLoan: { type: "popup", target: "EditLoanPopup" },
    saveLoan: { type: "command", command: "loans.save" },
    deleteLoan: { type: "command", command: "loans.delete" },
    undoDelete: { type: "command", command: "loans.undo" },
    toggleReminders: { type: "command", command: "settings.toggleReminders" },
  },
  shell: {
    type: "Shell",
    title: "Borrow Tracker",
    tabBar: "PrimaryTabBar",
    style: "surface-primary",
  },
  tabs: {
    HomeTab: { 
      type: "Tab", 
      title: "Home", 
      icon: "home", 
      content: "HomeShellContent",
      style: "surface-primary"
    },
    InventoryTab: {
      type: "Tab",
      title: "Inventory",
      icon: "archive",
      content: "InventoryShellContent",
      style: "surface-primary"
    },
    BorrowersTab: {
      type: "Tab",
      title: "Borrowers",
      icon: "users",
      content: "BorrowersShellContent",
      style: "surface-primary"
    },
    LoansTab: { 
      type: "Tab", 
      title: "Loans", 
      icon: "clipboard", 
      content: "LoansShellContent",
      style: "surface-primary"
    },
    SettingsTab: {
      type: "Tab",
      title: "Settings",
      icon: "settings",
      content: "SettingsShellContent",
      style: "surface-primary"
    },
  },
  pages: {
    HomePage: {
      type: "ContentPage",
      title: "Dashboard",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "HeroCard" },
          { component: "RecentLoansCollection" },
        ],
      },
    },
    InventoryPage: {
      type: "ContentPage",
      title: "Inventory",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "SearchBar" },
          { component: "ItemsFlexWrap" }
        ],
      },
    },
    BorrowersPage: {
      type: "ContentPage",
      title: "Borrowers",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "BorrowersGrid" }
        ],
      },
    },
    LoansPage: {
      type: "ContentPage",
      title: "Loans",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        style: "surface-primary",
        children: [
          { component: "LoanFilters" },
          { component: "LoansCollection" }
        ],
      },
    },
    SettingsPage: {
      type: "ContentPage",
      title: "Settings",
      style: "surface-primary",
      layout: {
        type: "VerticalStack",
        spacing: "loose",
        style: "surface-primary",
        children: [
          { component: "NotificationSettings" },
          { component: "AppearanceSettings" },
          { component: "DataSettings" },
        ],
      },
    },
  },
  components: {
    HomeShellContent: { type: "ShellContent", page: "HomePage" },
    InventoryShellContent: { type: "ShellContent", page: "InventoryPage" },
    BorrowersShellContent: { type: "ShellContent", page: "BorrowersPage" },
    LoansShellContent: { type: "ShellContent", page: "LoansPage" },
    SettingsShellContent: { type: "ShellContent", page: "SettingsPage" },

    // Hero Dashboard Card with Mobile-Native Styling
    HeroCard: {
      type: "Border",
      style: "hero-card",
      props: {
        variant: "elevated",
        padding: "loose"
      },
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        children: [
          { component: "WelcomeText" },
          { component: "MetricsGrid" },
          { component: "QuickActions" },
        ],
      },
    },

    WelcomeText: {
      type: "VerticalStack",
      spacing: "tight",
      children: [
        { 
          type: "Label", 
          props: { 
            text: "Welcome back!", 
            style: "display-text"
          } 
        },
        { 
          type: "Label", 
          props: { 
            text: "Keep tabs on who has what and when it's coming back.", 
            style: "body-text"
          } 
        },
      ],
    },

    MetricsGrid: {
      type: "Grid",
      props: {
        columns: 3,
        gap: "standard"
      },
      children: [
        { component: "MetricItemsOut" },
        { component: "MetricDueSoon" },
        { component: "MetricOverdue" },
      ],
    },

    MetricItemsOut: {
      type: "Border",
      style: "metric-card",
      props: {
        variant: "elevated",
        padding: "standard"
      },
      layout: {
        type: "VerticalStack",
        spacing: "tight",
        children: [
          { type: "Label", props: { text: "8", style: "metric-value" } },
          { type: "Label", props: { text: "Items out", style: "caption-text" } },
        ],
      },
    },

    MetricDueSoon: {
      type: "Border",
      style: "metric-card",
      props: {
        variant: "elevated",
        padding: "standard"
      },
      layout: {
        type: "VerticalStack",
        spacing: "tight",
        children: [
          { type: "Label", props: { text: "3", style: "metric-value" } },
          { type: "Label", props: { text: "Due soon", style: "caption-text" } },
        ],
      },
    },

    MetricOverdue: {
      type: "Border",
      style: "metric-card",
      props: {
        variant: "elevated",
        padding: "standard",
        colorRole: "error"
      },
      layout: {
        type: "VerticalStack",
        spacing: "tight",
        children: [
          { type: "Label", props: { text: "1", style: "metric-value" } },
          { type: "Label", props: { text: "Overdue", style: "caption-text" } },
        ],
      },
    },

    QuickActions: {
      type: "HorizontalStack",
      spacing: "standard",
      children: [
        { 
          type: "Button",
          props: { 
            text: "Log new loan", 
            icon: "add",
            variant: "filled",
            style: "primary-action"
          },
          interactions: { Clicked: "actions.openCreateLoan" },
        },
        { 
          type: "Button",
          props: { 
            text: "View schedule", 
            icon: "calendar",
            variant: "tonal",
            style: "secondary-action"
          },
        },
      ],
    },

    // Modern Search Bar
    SearchBar: {
      type: "Entry",
      props: {
        placeholder: "Search inventory...",
        icon: "search",
        variant: "filled",
        style: "surface-secondary"
      }
    },

    // Enhanced Collection Views
    RecentLoansCollection: {
      type: "CollectionView",
      style: "list-container",
      props: {
        items: "@sampleData.loans",
        emptyView: { component: "EmptyLoans" },
      },
      template: { type: "DataTemplate", component: "ModernLoanCard" },
      footer: { component: "LoansFooter" },
    },

    ModernLoanCard: {
      type: "Border",
      style: "list-item",
      props: {
        variant: "default",
        padding: "standard"
      },
      layout: {
        type: "HorizontalStack",
        spacing: "standard",
        children: [
          { component: "LoanIcon" },
          { component: "LoanDetails" },
          { component: "LoanStatus" },
        ],
      },
    },

    LoanIcon: {
      type: "Border",
      style: "metric-card",
      props: {
        variant: "tonal",
        padding: "tight"
      },
      layout: {
        type: "VerticalStack",
        children: [
          { type: "Icon", props: { name: "camera", size: "medium" } }
        ],
      },
    },

    LoanDetails: {
      type: "VerticalStack",
      spacing: "tight",
      props: { flex: 1 },
      children: [
        { type: "Label", props: { text: "{binding itemName}", style: "card-title" } },
        { type: "Label", props: { text: "Borrowed by {binding borrowerName}", style: "body-text" } },
        { type: "Label", props: { text: "{binding loanedOn, converter=RelativeDate}", style: "caption-text" } },
      ],
    },

    LoanStatus: {
      type: "Border",
      props: {
        variant: "tonal",
        padding: "tight"
      },
      layout: {
        type: "VerticalStack",
        children: [
          { type: "Label", props: { text: "{binding status}", style: "caption-text" } },
          { type: "Label", props: { text: "{binding due}", style: "caption-text" } },
        ],
      },
    },

    // Modern Form Components
    CreateLoanPopup: {
      type: "Popup",
      style: "surface-modal",
      props: { 
        title: "Log item loan",
        variant: "elevated"
      },
      content: { component: "ModernLoanForm" },
      footer: { component: "FormActions" },
    },

    ModernLoanForm: {
      type: "VerticalStack",
      spacing: "standard",
      children: [
        {
          type: "Picker",
          props: {
            label: "Item",
            icon: "camera",
            options: "@sampleData.items",
            labelPath: "name",
            valuePath: "id",
            selectedValue: "@state.form.itemId",
            variant: "outlined",
            style: "surface-secondary"
          },
        },
        {
          type: "Picker",
          props: {
            label: "Borrower",
            icon: "profile",
            options: "@sampleData.borrowers",
            labelPath: "name",
            valuePath: "id",
            selectedValue: "@state.form.borrowerId",
            variant: "outlined",
            style: "surface-secondary"
          },
        },
        {
          type: "Entry",
          props: {
            label: "Notes",
            placeholder: "Optional hand-off notes",
            value: "@state.form.notes",
            icon: "message",
            variant: "outlined",
            style: "surface-secondary"
          },
        },
        {
          type: "Switch",
          props: { 
            label: "Send borrower reminder", 
            checked: "@state.form.sendReminder",
            style: "surface-secondary"
          },
        },
      ],
    },

    FormActions: {
      type: "HorizontalStack",
      spacing: "standard",
      props: { justify: "flex-end" },
      children: [
        {
          type: "Button",
          props: { 
            text: "Cancel", 
            variant: "text",
            style: "secondary-action"
          },
          interactions: { Clicked: "actions.closePopup" },
        },
        {
          type: "Button",
          props: { 
            text: "Save loan", 
            variant: "filled",
            icon: "save",
            style: "primary-action"
          },
          interactions: { Clicked: "actions.saveLoan" },
        },
      ],
    },

    // Modern Settings Components
    NotificationSettings: {
      type: "Border",
      style: "list-item",
      props: {
        variant: "outlined",
        padding: "standard"
      },
      layout: {
        type: "VerticalStack",
        spacing: "standard",
        children: [
          { type: "Label", props: { text: "Notifications", style: "card-title" } },
          { component: "RemindersSwitch" },
          { component: "ReminderFrequency" },
        ],
      },
    },

    RemindersSwitch: {
      type: "Switch",
      props: { 
        label: "Loan reminders", 
        checked: "@state.remindersEnabled",
        size: "medium"
      },
    },

    ReminderFrequency: {
      type: "Picker",
      props: {
        label: "Reminder frequency",
        options: [
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" }
        ],
        value: "@state.reminderCadence",
        variant: "filled",
        style: "surface-secondary"
      }
    },

    // Enhanced FAB
    GlobalLoanFab: {
      type: "FabButton",
      style: "floating-action",
      props: { 
        icon: "add",
        variant: "filled",
        size: "large",
        accessibilityLabel: "Add new loan"
      },
      interactions: { Clicked: "actions.openCreateLoan" },
    },

    // Empty states and other components...
    EmptyLoans: {
      type: "VerticalStack",
      spacing: "standard",
      props: { alignment: "center", padding: "loose" },
      children: [
        { type: "Icon", props: { name: "clipboard", size: "large" } },
        { type: "Label", props: { text: "No loans yet", style: "card-title" } },
        {
          type: "Label",
          props: {
            text: "Tap the floating action button to track your first loan.",
            style: "body-text",
          },
        },
      ],
    },

    LoansFooter: {
      type: "Label",
      props: {
        text: "Swipe left on any loan to edit or delete.",
        style: "caption-text",
        horizontalTextAlignment: "Center",
      },
    },
  },
  state: {
    remindersEnabled: true,
    reminderCadence: "weekly",
    form: {
      itemId: "dslr",
      borrowerId: "1",
      notes: "Lens cap included",
      loanDate: "2024-02-20",
      pickupTime: "18:30",
      status: "checked-out",
      sendReminder: true,
    },
    flags: {
      showLoanSnackbar: false,
    },
  },
  render: "shell",
  rootComponents: {
    shell: { 
      type: "Shell", 
      tabBar: "PrimaryTabBar",
      style: "surface-primary"
    },
    PrimaryTabBar: {
      type: "TabBar",
      tabs: ["HomeTab", "InventoryTab", "BorrowersTab", "LoansTab", "SettingsTab"],
      style: "surface-primary"
    },
  },
});

export function renderToCanvas(canvasEl: HTMLElement, context?: any): any {
  // Use the runtime render function to initialize the wireframe  
  runtimeRender(uiMock);
  console.log("Mobile-native wireframe rendered:", uiMock.name);
  return uiMock;
}

// Alias for compatibility with CLI fallback
export const render = renderToCanvas;

// Optional debug render (manual iterative component stepping)
export function renderDebug(canvasEl: HTMLElement) {
  const root = (canvasEl as any).root || null;
  // In a full environment we'd create a React root; here we just log intent.
  console.log("[wirevana] Debug mode requested. Use <DebugWireframePlayer wireframe={uiMock} /> inside a React app.");
  return uiMock;
}

export default uiMock;
