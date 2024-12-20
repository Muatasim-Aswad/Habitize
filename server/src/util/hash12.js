import { hash } from "bcrypt";

//returns a promise
//main goal is to keep hashing salt consistent
const hash12 = (toHash) => {
  return hash(toHash, 12);
};

export default hash12;
