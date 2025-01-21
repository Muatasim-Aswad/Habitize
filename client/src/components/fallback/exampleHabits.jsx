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
      start: "2025-01-01T00:00:00.000Z",

      end: "2025-12-31T23:59:59.999Z",
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
    name: "Strength Training",
    icon: "FitnessCenter",
    goal: {
      number: 2,
      unit: "sessions",
      frequency: "weekly",
    },
    period: {
      start: "2025-01-01T00:00:00.000Z",
      end: "2025-06-30T23:59:59.999Z",
    },
    categories: [],
    reminders: [
      {
        time: "1970-01-01T07:00:00.000Z",
        message: "It's strength training day! Let's get to work.",
      },
    ],
  },
];

export default exampleHabits;
