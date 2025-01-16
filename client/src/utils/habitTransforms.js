/**
 * Form verilerini API formatına dönüştürür
 */
export const transformHabitToApiFormat = (habitData) => {
  if (!habitData) return null;

  return {
    name: habitData.name,
    icon: habitData.icon,
    goal: {
      number: parseInt(habitData.goal.number),
      unit: habitData.goal.unit.toLowerCase(),
      frequency: habitData.goal.frequency.toLowerCase(),
    },
    period: {
      start: habitData.period.start.toISOString().split("T")[0],
      end: habitData.period.end.toISOString().split("T")[0],
    },
    reminders: habitData.reminder.time
      ? [
          {
            time: habitData.reminder.time
              .toISOString()
              .split("T")[1]
              .split(".")[0]
              .slice(0, 5),
            message: habitData.reminder.message || "",
          },
        ]
      : [],
  };
};

/**
 * API verilerini form formatına dönüştürür
 */
export const transformApiToFormFormat = (apiData) => {
  if (!apiData) return null;

  return {
    name: apiData.name,
    icon: apiData.icon,
    goal: {
      number: apiData.goal.number,
      unit: apiData.goal.unit,
      frequency: apiData.goal.frequency,
    },
    period: {
      start: new Date(apiData.period.start),
      end: new Date(apiData.period.end),
    },
    reminder: apiData.reminders?.[0]
      ? {
          time: new Date(`1970-01-01T${apiData.reminders[0].time}`),
          message: apiData.reminders[0].message,
        }
      : {
          time: null,
          message: "",
        },
  };
};
