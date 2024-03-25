import User from "../models/User";
import { hashPassword } from "../utils/hashPassword";
import { validAuth } from "../utils/validAuth";
import { loginSchema, registerSchema } from "../validations/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    /**
     * 1. Kiem tra du lieu dau vao
     * 2. Kiem tra email da ton tai chua?
     * 3. Ma hoa mat khau
     * 4. Tao user moi
     * 5. Thong bao thanh cong
     */

    const { email, password } = req.body;
    validAuth(req.body, registerSchema);

    // ? B2: Kiem tra email da ton tai chua?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email da ton tai!" });
    }

    // B3: Ma hoa mat khau
    hashPassword(password);
    // B4: Tao user moi

    const user = await User.create({ ...req.body, password: hashPassword });
    user.password = undefined;
    return res.status(201).json({
      message: "Dang ky thanh cong!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    validAuth(req.body, loginSchema);

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Email khong ton tai!" });
    }


    const checkPass = await bcryptjs.compare(password, userExist.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Mat khau khong dung!" });
    }


    const token = jwt.sign({ id: userExist._id }, "secretcode", {
      expiresIn: "1d",
    });

  
    userExist.password = undefined;
    return res.status(304).json({
      message: "Dang nhap thanh cong!",
      token,
      userExist,
    });
  } catch (error) {
    next(error);
  }
};
