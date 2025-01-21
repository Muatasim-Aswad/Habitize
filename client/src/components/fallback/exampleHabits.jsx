const startDay = new Date();
const endDay = new Date(startDay.getTime() + 40 * 24 * 60 * 60 * 1000);
endDay.setUTCHours(23, 59, 59, 999);

const exampleHabits = [
  {
    name: "Meditate",
    icon: "SelfImprovement",
    goal: {
      number: 1,
      unit: "sessions",
      frequency: "daily",
    },
    period: {
      start: startDay.toISOString(),
      end: endDay.toISOString(),
    },
    categories: [],
    reminders: [
      {
        time: "1970-01-01T06:30:00.000Z",
        message: "Time to meditate and clear your mind.",
      },
    ],
  },
  {
    name: "Running",
    icon: "DirectionsRun",
    goal: {
      number: 10,
      unit: "kilometers",
      frequency: "weekly",
    },
    period: {
      start: startDay.toISOString(),
      end: endDay.toISOString(),
    },
    categories: [],
    reminders: [
      {
        time: "1970-01-01T07:00:00.000Z",
        message: "Lace up and hit the road.",
      },
    ],
  },
];

export default exampleHabits;
