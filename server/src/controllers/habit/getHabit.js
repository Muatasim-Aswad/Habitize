const getHabit = async (req, res, next) => {
  try {
    const { habit } = req;

    res.status(200).json({
      success: true,
      message: "Habit details retrieved successfully.",
      habit,
    });
  } catch (error) {
    next(error);
  }
};

export default getHabit;
