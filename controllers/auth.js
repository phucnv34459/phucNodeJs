import { errorMessages, successMessages } from "../constants/message.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwt";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    if (checkEmail) {
      return res.status(400).json({ message: errorMessages.EMAIL_EXISTED });
    }

    // B3: Ma hoa mat khau
    const hashPass = await hashPassword(password);
    // B4: Tao user moi

    const user = await User.create({ ...req.body, password: hashPass });
    user.password = undefined;
    return res.status(201).json({
      message:successMessages.REGISTER_SUCCESS,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
   

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Email khong ton tai!" });
    }

    if (!(await comparePassword(password, userExist.password))) {
      return res.status(400).json({ message: errorMessages.INVALID_PASSWORD });
    }

    const token = generateToken({ _id: userExist._id }, "10d");

    userExist.password = undefined;
    return res.status(201).json({
      message: "Dang nhap thanh cong!",
      token,
      user:userExist,
    });
  } catch (error) {
    next(error);
  }
};
