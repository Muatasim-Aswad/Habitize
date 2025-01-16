import httpClient from "./httpClient";

// GET /habits?date=yyyy-mm-dd
const getHabits = async () => {
  const today = new Date().toISOString().split("T")[0];
  const response = await httpClient.get(`/habits?date=${today}`);
  return response;
};

// GET /habits/progress
const getHabitProgress = async () => {
  const response = await httpClient.get("/habits/progress");
  return response;
};

// GET /habits/:habitId
const getHabit = async (habitId) => {
  const response = await httpClient.get(`/habits/${habitId}`);
  return response;
};

// POST /habits
const createHabit = async (habitData) => {
  const response = await httpClient.post("/habits", {
    habit: habitData,
  });
  return response;
};

// PATCH /habits/:habitId
const updateHabit = async (habitId, habitData) => {
  const response = await httpClient.patch(`/habits/${habitId}`, {
    habit: habitData,
  });
  return response;
};

// DELETE /habits/:habitId
const deleteHabit = async (habitId) => {
  const response = await httpClient.delete(`/habits/${habitId}`);
  return response;
};

// PATCH /check-ins/:checkInId
const updateCheckIn = async (checkInId, times_done) => {
  const response = await httpClient.patch(`/check-ins/${checkInId}`, {
    checkIn: {
      times_done,
    },
  });
  return response;
};

export const habitService = {
  getHabits,
  getHabitProgress,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  updateCheckIn,
};
