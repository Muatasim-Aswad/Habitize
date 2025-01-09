const getUser = async (req, res, next) => {
  try {
    const { user } = req;
    const { _id: id, name, email } = user;

    res.status(200).json({
      success: true,
      message: "User details retrieved successfully.",
      user: { id, name, email },
    });
  } catch (error) {
    next(error);
  }
};

export default getUser;
