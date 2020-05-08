export const EMPTY = {
  status: "",
  title: "",
  teammates: "",
  currentWeek: {},
  i3p: {},
  t3p: {},
  weekly: {},
};

export const SOCIAL = {
  status: "status",
  title: "name",
  teammates: "assign",
  category: "feature",
  currentWeek: {
    key: "this_week",
    value: "Yes",
  },
  i3p: {
    shippedStatus: ["Done"],
    planStatus: ["To do", "Waiting", "Inbox"],
    progressStatus: ["Doing", "Review"],
    lineFormat: {
      teammates: false,
      status: true,
      category: true,
    },
  },
  t3p: {
    planStatus: ["To do", "Waiting", "Inbox", "📌 Backlog", "🔦 Analysis"],
    progressStatus: [
      "Done",
      "Doing",
      "🧑‍💻 Development",
      "Staging",
      "✅ Done",
      "📤 Ready to Pull",
    ],
    groupLineBy: "feature",
    lineFormat: {
      teammates: true,
      status: true,
      category: false,
    },
  },
};

export const AFFILIATES = {
  status: "status",
  title: "name",
  teammates: "assign",
  category: "project",
  currentWeek: {
    key: "current_week",
    value: "Yes",
  },
  i3p: {
    shippedStatus: ["Done"],
    planStatus: ["To do", "Waiting", "Inbox"],
    progressStatus: ["Doing", "Review"],
    lineFormat: {
      teammates: false,
      status: false,
      category: true,
    },
  },
  t3p: {
    planStatus: ["To do", "Waiting", "Inbox"],
    progressStatus: ["Doing", "Done"],
    groupLineBy: "project",
    lineFormat: {
      teammates: true,
      status: true,
      category: false,
    },
  },
};

export const defaultSettings = {
  affiliates: AFFILIATES,
  social: SOCIAL,
  initial: EMPTY,
};
