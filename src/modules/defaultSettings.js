export const AFFILIATES = [
  { key: "key:status", value: "status" },
  { key: "key:title", value: "name" },
  { key: "key:teammates", value: "assign" },
  { key: "key:currentWeek", value: "current_week" },
  { key: "value:currentWeek", value: "Yes" },

  { key: "i3p:shippedStatus", value: "Done" },
  { key: "i3p:lineStructure", value: "app,name" },
  { key: "i3p:planStatus", value: "To do,Waiting,Inbox" },
  { key: "i3p:progressStatus", value: "Doing,Review" },

  { key: "t3p:lineStructure", value: "name,assign" },
  { key: "t3p:planStatus", value: "To do,Waiting,Inbox" },
  { key: "t3p:progressStatus", value: "Done,Doing" },
  { key: "t3p:groupLineBy", value: "project" },

  { key: "w:status", value: "To do,Review" },
  { key: "w:groupLineBy", value: "project" },
];

export const SOCIAL = [
  { key: "key:status", value: "status" },
  { key: "key:title", value: "name" },
  { key: "key:teammates", value: "assign" },
  { key: "key:currentWeek", value: "this_week" },
  { key: "value:currentWeek", value: "Yes" },

  { key: "i3p:shippedStatus", value: "Done" },
  { key: "i3p:lineStructure", value: "app,name" },
  { key: "i3p:planStatus", value: "To do,Waiting,Inbox" },
  { key: "i3p:progressStatus", value: "Doing,Review" },

  { key: "t3p:lineStructure", value: "name,assign,status" },
  {
    key: "t3p:planStatus",
    value: "To do,Waiting,Inbox,📌 Backlog,🔦 Analysis",
  },
  {
    key: "t3p:progressStatus",
    value: "Done,Doing,🧑‍💻 Development,Staging,✅ Done,📤 Ready to Pull",
  },
  { key: "t3p:groupLineBy", value: "feature" },

  { key: "w:status", value: "To do,Review" },
  { key: "w:groupLineBy", value: "project" },
];

export const AFFILIATES_2 = {
  status: "status",
  title: "title",
  teammate: "assign",
  currentWeek: {
    key: "current_week",
    value: "Yes"
  },
  i3p: {
    shippedStatus: ["Done"],
    lineStructure: ["app", "name"],
    planStatus: ["To do", "Waiting", "Inbox"],
    progressStatus: ["Doing", "Review"],
    lineFormat: {
      teammates: false,
      status: true,
      category: true
    }
  },
  t3p: {
    lineStructure: ["name", "assign"],
    planStatus: ["To do", "Waiting", "Inbox"],
    progressStatus: ["Doing", "Doing"],
    groupLineBy: "project"
  },
  weekly: {
    status: ["To do", "Review"],
    groupLineBy: "project"
  }
};
