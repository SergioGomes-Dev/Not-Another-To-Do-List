const lists = [
  {
    name: "Shopping List",
    content: [
      {
        item: "Milk",
        notes: "2%",
        completed: true,
        priority: "High",
        deadline: "2022-04-28-08-00",
        recurring: false,
      },
      {
        item: "Eggs",
        notes: "2 Cartons",
        completed: false,
      },
      {
        item: "Bread",
      },
    ],
  },
  {
    name: "General To Do List",
    content: [
      {
        item: "Grocery Shopping",
        priority: "Very High",
        notes: "Milk, Eggs & Bread",
        deadline: "2022-04-26-08-00",
        recurring: true,
      },
      {
        item: "Wash Car",
        priority: "Medium",
      },
      {
        item: "Call Parents",
        notes: "Ask about doctors appointment",
      },
    ],
  },
  {
    name: "Bucket List",
    content: [
      {
        item: "Sky Diving",
        notes: "Not Tandem",
      },
      {
        item: "Swim with Dolphin",
      },
      {
        item: "Learn a new language",
        deadline: "2022-12-31",
        priority: "High",
      },
    ],
  },
];

export default lists;
