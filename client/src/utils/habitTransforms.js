import React from "react";
import IconRenderer from "../components/IconRenderer";
import { getMotivationalMessage } from "./motivationalMessages";

/**
 * Transforms form data to API format
 */
export const transformHabitToApiFormat = (habitData) => {
  if (!habitData) return null;

  habitData.period.start.setHours(0, 0, 0, 0);
  habitData.period.end.setHours(23, 59, 59, 999);

  return {
    name: habitData.name,
    icon: habitData.icon,
    goal: {
      number: parseInt(habitData.goal.number),
      unit: habitData.goal.unit.toLowerCase(),
      frequency: habitData.goal.frequency.toLowerCase(),
    },
    period: {
      start: habitData.period.start.toISOString(),
      end: habitData.period.end.toISOString(),
    },
    reminders: habitData.reminder.time
      ? [
          {
            time: habitData.reminder.time.toISOString(),
            message: habitData.reminder.message || "",
          },
        ]
      : [],
  };
};

/**
 * Transforms API data to form format
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
          time: new Date(apiData.reminders[0].time),
          message: apiData.reminders[0].message,
        }
      : {
          time: null,
          message: "",
        },
  };
};

/**
 * Transforms API data to HabitCard format
 */
export const transformApiToCardFormat = (apiData) => {
  if (!apiData) return null;

  const timesDone = apiData.checkIn?.times_done || 0;
  const goalNumber = apiData.goal?.number || 0;
  const frequency = apiData.goal?.frequency || "daily";

  return {
    id: apiData._id,
    name: apiData.name,
    icon: ({ size, color }) => (
      <IconRenderer iconName={apiData.icon} size={size} style={{ color }} />
    ),
    count: timesDone,
    target: goalNumber,
    isDone: timesDone >= goalNumber,
    reminderTime: apiData.reminders?.[0]?.time
      ? new Date(apiData.reminders[0].time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null,
    reminderMessage: apiData.reminders?.[0]?.message || null,
    goal: {
      number: goalNumber,
      frequency: frequency,
    },
    motivationalMessage: getMotivationalMessage(
      timesDone,
      goalNumber,
      frequency,
    ),
    checkIn: apiData.checkIn || null,
  };
};
