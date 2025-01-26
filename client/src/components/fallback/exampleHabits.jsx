const startDay = new Date();
startDay.setHours(0, 0, 0, 0);

const days40 = new Date(startDay.getTime() + 40 * 24 * 60 * 60 * 1000);
days40.setHours(23, 59, 59, 999);

const weeks4 = new Date(startDay.getTime() + 4 * 7 * 24 * 60 * 60 * 1000);
weeks4.setHours(23, 59, 59, 999);

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
      end: days40.toISOString(),
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
      end: weeks4.toISOString(),
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
