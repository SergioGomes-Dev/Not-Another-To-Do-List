const lists = [
  {
    _id: "1",
    name: "Shopping List",
    content: [
      {
        _id: "1",
        item: "Milk",
        notes: "2%",
        completed: false,
        priority: "High",
        deadline: "2022-04-28-08-00",
        recurring: false,
      },
      {
        _id: "2",
        item: "Eggs",
        notes: "2 Cartons",
        completed: false,
      },
      {
        _id: "3",
        item: "Bread",
      },
    ],
    creator: "John",
  },
  {
    _id: "2",
    name: "General To Do List",
    content: [
      {
        _id: "1",
        item: "Grocery Shopping",
        priority: "Very High",
        notes: "Milk, Eggs & Bread",
        deadline: "2022-04-26-08-00",
        recurring: true,
      },
      {
        _id: "2",
        item: "Wash Car",
        priority: "Medium",
      },
      {
        _id: "3",
        item: "Call Parents",
        notes: "Ask about doctors appointment",
      },
    ],
    creator: "John",
  },
  {
    _id: "3",
    name: "Bucket List",
    content: [
      {
        _id: "1",
        item: "Sky Diving",
        notes: "Not Tandem",
      },
      {
        _id: "2",
        item: "Swim with Dolphin",
      },
      {
        _id: "3",
        item: "Learn a new language",
        deadline: "2022-12-31",
        priority: "High",
      },
    ],
    creator: "John",
  },
];

export default lists;
