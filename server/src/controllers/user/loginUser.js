import { User } from "../../models/User.js";
import hash12 from "../../util/hash12.js";

const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body.newUser;
    password = await hash12(password);

    User.findOne({ email, password }); //isAuthenticated

    //to do: complete logging logic, if authenticated create a session
  } catch (error) {
    next(error);
  }
};

export default loginUser;
