import { defineWireframe, render as runtimeRender } from "@wirevana/runtime";

const uiMock = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "MvpAllComponentsShowcase",
  description:
    "Demonstrates every MVP-supported control, including navigation, lists, cards, forms, and overlays for an item lending tracker.",
  imports: [
    {
      namespace: "http://schemas.microsoft.com/dotnet/2021/maui",
      description:
        "Default MAUI controls (Shell, ContentPage, Border, Grid, CollectionView, Entry, Picker, etc.).",
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
    {
      alias: "toolkitViews",
      namespace: "clr-namespace:CommunityToolkit.Maui.Views;assembly=CommunityToolkit.Maui",
      description: "Popup visual element hosting the create/edit loan form.",
      docUrl: "https://learn.microsoft.com/dotnet/communitytoolkit/maui/views/popup",
    },
    {
      alias: "toolkitAlerts",
      namespace: "clr-namespace:CommunityToolkit.Maui.Alerts;assembly=CommunityToolkit.Maui",
      description: "Snackbar alert emitted after saving or undoing a loan.",
      docUrl: "https://learn.microsoft.com/dotnet/communitytoolkit/maui/alerts/snackbar",
    },
  ],
  metadata: {
    platforms: ["ios", "android"],
    targetHost: "chatgpt-canvas",
  },
  sampleData: {
    items: [
      { id: "dslr", name: "DSLR Camera" },
      { id: "projector", name: "Mini Projector" },
      { id: "tripod", name: "Travel Tripod" },
    ],
    borrowers: [
      { id: "1", name: "Jordan" },
      { id: "2", name: "Sky" },
      { id: "3", name: "Harper" },
    ],
    loans: [
      {
        id: "l1",
        itemId: "dslr",
        itemName: "DSLR Camera",
        borrowerId: "1",
        borrowerName: "Jordan",
        loanedOn: "2024-02-18T18:30:00Z",
        status: "On schedule",
        due: "Due Mar 2",
      },
      {
        id: "l2",
        itemId: "projector",
        itemName: "Mini Projector",
        borrowerId: "2",
        borrowerName: "Sky",
        loanedOn: "2024-02-16T20:15:00Z",
        status: "Returned",
        due: "Returned Feb 20",
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
  },
  tabs: {
    HomeTab: { type: "Tab", title: "Home", icon: "home", content: "HomeShellContent" },
    InventoryTab: {
      type: "Tab",
      title: "Inventory",
      icon: "archive",
      content: "InventoryShellContent",
    },
    BorrowersTab: {
      type: "Tab",
      title: "Borrowers",
      icon: "users",
      content: "BorrowersShellContent",
    },
    LoansTab: { type: "Tab", title: "Loans", icon: "clipboard", content: "LoansShellContent" },
    SettingsTab: {
      type: "Tab",
      title: "Settings",
      icon: "settings",
      content: "SettingsShellContent",
    },
  },
  pages: {
    HomePage: {
      type: "ContentPage",
      title: "Dashboard",
      layout: {
        type: "Grid",
        rows: ["auto", "*", "auto"],
        columns: ["*"],
        children: [
          { row: 0, component: "HeroCard" },
          { row: 1, component: "RecentLoansCollection" },
          { row: 2, component: "SuccessSnackbar" },
        ],
      },
    },
    InventoryPage: {
      type: "ContentPage",
      title: "Inventory",
      layout: {
        type: "VerticalStack",
        spacing: 16,
        children: [{ component: "ItemsFlexWrap" }],
      },
    },
    BorrowersPage: {
      type: "ContentPage",
      title: "Borrowers",
      layout: {
        type: "VerticalStack",
        spacing: 16,
        children: [{ component: "ItemsFlexWrap" }],
      },
    },
    LoansPage: {
      type: "ContentPage",
      title: "Loans",
      layout: {
        type: "VerticalStack",
        spacing: 16,
        children: [{ component: "ItemsFlexWrap" }],
      },
    },
    SettingsPage: {
      type: "ContentPage",
      title: "Settings",
      layout: {
        type: "VerticalStack",
        spacing: 16,
        children: [
          { component: "RemindersSwitch" },
          { component: "ReminderCadenceRadios" },
          { component: "FabAnchor" },
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
    HeroCard: {
      type: "Border",
      props: {
        background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
        header: "Welcome back!",
        footer: "Keep tabs on who has what and when it's coming back.",
      },
      layout: {
        type: "VerticalStack",
        spacing: 12,
        children: [
          { component: "HeroMetrics" },
          { component: "HeroActions" },
        ],
      },
    },
    HeroMetrics: {
      type: "HorizontalStack",
      spacing: 16,
      children: [
        { component: "MetricItemsOut" },
        { component: "MetricDueSoon" },
        { component: "MetricOverdue" },
      ],
    },
    MetricItemsOut: {
      type: "Border",
      props: { background: "rgba(255,255,255,0.15)", header: "Items out", footer: "Currently loaned" },
      layout: {
        type: "VerticalStack",
        children: [{ component: "MetricItemsOutValue" }],
      },
    },
    MetricItemsOutValue: { type: "Label", props: { text: "8", style: "display-hero" } },
    MetricDueSoon: {
      type: "Border",
      props: { background: "rgba(255,255,255,0.15)", header: "Due soon", footer: "Next 7 days" },
      layout: {
        type: "VerticalStack",
        children: [{ component: "MetricDueSoonValue" }],
      },
    },
    MetricDueSoonValue: { type: "Label", props: { text: "3", style: "display-hero" } },
    MetricOverdue: {
      type: "Border",
      props: { background: "rgba(255,255,255,0.15)", header: "Overdue", footer: "Needs attention" },
      layout: {
        type: "VerticalStack",
        children: [{ component: "MetricOverdueValue" }],
      },
    },
    MetricOverdueValue: { type: "Label", props: { text: "1", style: "display-hero" } },
    HeroActions: {
      type: "HorizontalStack",
      spacing: 12,
      children: [{ component: "QuickAddLoanButton" }, { component: "ViewScheduleButton" }],
    },
    QuickAddLoanButton: {
      type: "Button",
      props: { text: "Log loan", appearance: "primary" },
      interactions: { Clicked: "actions.openCreateLoan" },
    },
    ViewScheduleButton: {
      type: "Button",
      props: { text: "See due dates", appearance: "outlined" },
    },
    RecentLoansCollection: {
      type: "CollectionView",
      props: {
        items: "@sampleData.loans",
        emptyView: { component: "EmptyLoans" },
      },
      template: { type: "DataTemplate", component: "LoanSwipeContainer" },
      footer: { component: "LoansFooter" },
    },
    LoanSwipeContainer: {
      type: "SwipeView",
      props: {
        rightItems: [
          { content: "Edit", background: "#2563eb", action: "actions.editLoan" },
          { content: "Delete", background: "#ef4444", action: "actions.deleteLoan" },
        ],
      },
      content: { component: "LoanItemCard" },
    },
    LoanItemCard: {
      type: "Border",
      props: {
        padding: 16,
        header: "{binding itemName}",
        footer: "{binding loanedOn, converter=RelativeDate}",
      },
      layout: {
        type: "VerticalStack",
        spacing: 8,
        children: [{ component: "LoanStatusRow" }, { component: "LoanBorrowerRow" }],
      },
    },
    LoanStatusRow: {
      type: "HorizontalStack",
      spacing: 12,
      children: [
        { type: "Label", props: { text: "Status", style: "label-muted" } },
        { type: "Label", props: { text: "{binding status}", style: "label-strong" } },
        { type: "Label", props: { text: "Due", style: "label-muted" } },
        { type: "Label", props: { text: "{binding due}", style: "label-strong" } },
      ],
    },
    LoanBorrowerRow: {
      type: "HorizontalStack",
      spacing: 8,
      children: [
        { type: "Label", props: { text: "Borrower", style: "label-muted" } },
        { type: "Label", props: { text: "{binding borrowerName}", style: "label-default" } },
      ],
    },
    EmptyLoans: {
      type: "VerticalStack",
      spacing: 8,
      children: [
        { type: "Label", props: { text: "No loans yet", style: "label-strong" } },
        {
          type: "Label",
          props: {
            text: "Tap the floating action button to track your first loan.",
            style: "label-muted",
          },
        },
      ],
    },
    LoansFooter: {
      type: "Label",
      props: {
        text: "Swipe left on any loan to edit or delete.",
        style: "label-caption",
        horizontalTextAlignment: "Center",
      },
    },
    ItemsFlexWrap: {
      type: "FlexLayout",
      props: { direction: "row", wrap: "wrap", justify: "flex-start", gap: 12 },
      children: [{ component: "ItemChipTemplate" }],
    },
    ItemChipTemplate: {
      type: "DataTemplate",
      props: { items: "@sampleData.items" },
      component: {
        type: "Border",
        props: { padding: 12, background: "#111827", footer: "Tap to mark priority" },
        layout: {
          type: "VerticalStack",
          children: [{ type: "Label", props: { text: "{binding name}", style: "label-pill" } }],
        },
      },
    },
    RemindersSwitch: {
      type: "HorizontalStack",
      spacing: 12,
      children: [
        { type: "Label", props: { text: "Loan reminders" } },
        {
          type: "Switch",
          props: { isToggled: "@state.remindersEnabled", onToggle: "actions.toggleReminders" },
        },
      ],
    },
    ReminderCadenceRadios: {
      type: "VerticalStack",
      spacing: 8,
      children: [
        { type: "Label", props: { text: "Reminder cadence", style: "label-strong" } },
        {
          type: "RadioButtonGroup",
          props: { value: "@state.reminderCadence" },
          children: [
            { type: "RadioButton", props: { value: "daily", content: "Daily nudges" } },
            { type: "RadioButton", props: { value: "weekly", content: "Weekly summaries" } },
          ],
        },
      ],
    },
    FabAnchor: { type: "AbsoluteLayout", children: [{ component: "GlobalLoanFab" }] },
    GlobalLoanFab: {
      type: "FabButton",
      props: { label: "New loan", icon: "+" },
      interactions: { Clicked: "actions.openCreateLoan" },
    },
    CreateLoanPopup: {
      type: "Popup",
      props: { title: "Log item loan" },
      content: { component: "LoanForm" },
      footer: { component: "LoanFormFooter" },
    },
    EditLoanPopup: {
      type: "Popup",
      props: { title: "Edit item loan" },
      content: { component: "LoanForm" },
      footer: { component: "LoanFormFooter" },
    },
    LoanForm: {
      type: "VerticalStack",
      spacing: 16,
      children: [
        {
          type: "Picker",
          props: {
            label: "Item",
            options: "@sampleData.items",
            labelPath: "name",
            valuePath: "id",
            selectedValue: "@state.form.itemId",
          },
        },
        {
          type: "Picker",
          props: {
            label: "Borrower",
            options: "@sampleData.borrowers",
            labelPath: "name",
            valuePath: "id",
            selectedValue: "@state.form.borrowerId",
          },
        },
        {
          type: "Entry",
          props: {
            label: "Notes",
            placeholder: "Optional hand-off notes",
            value: "@state.form.notes",
          },
        },
        { type: "DatePicker", props: { label: "Loan date", value: "@state.form.loanDate" } },
        { type: "TimePicker", props: { label: "Pickup time", value: "@state.form.pickupTime" } },
        {
          type: "RadioButtonGroup",
          props: { label: "Status", value: "@state.form.status" },
          children: [
            { type: "RadioButton", props: { value: "checked-out", content: "Checked out" } },
            { type: "RadioButton", props: { value: "returned", content: "Returned" } },
          ],
        },
        {
          type: "Switch",
          props: { label: "Send borrower reminder", isToggled: "@state.form.sendReminder" },
        },
      ],
    },
    LoanFormFooter: {
      type: "HorizontalStack",
      spacing: 12,
      children: [
        {
          type: "Button",
          props: { text: "Cancel", appearance: "text" },
          interactions: { Clicked: "actions.closePopup" },
        },
        {
          type: "Button",
          props: { text: "Save loan", appearance: "primary" },
          interactions: { Clicked: "actions.saveLoan" },
        },
      ],
    },
    SuccessSnackbar: {
      type: "Snackbar",
      props: {
        message: "Loan saved",
        actionLabel: "Undo",
        isVisible: "@state.flags.showLoanSnackbar",
      },
      interactions: { ActionInvoked: "actions.undoDelete" },
    },
  },
  state: {
    remindersEnabled: true,
    reminderCadence: "daily",
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
      showLoanSnackbar: true,
    },
  },
  render: "shell",
  rootComponents: {
    shell: { type: "Shell", tabBar: "PrimaryTabBar" },
    PrimaryTabBar: {
      type: "TabBar",
      tabs: ["HomeTab", "InventoryTab", "BorrowersTab", "LoansTab", "SettingsTab"],
    },
  },
});

export function renderToCanvas(canvasEl: HTMLElement, context?: any): any {
  // Use the runtime render function to initialize the wireframe  
  runtimeRender(uiMock);
  console.log("Wireframe rendered:", uiMock.name);
  return uiMock;
}

// Alias for compatibility with CLI fallback
export const render = renderToCanvas;

export default uiMock;
