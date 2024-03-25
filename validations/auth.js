import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email":"Email ko hợp lệ",
    "any.required":"Email không được để trống"
    
  }),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(6),
  phoneNumber: Joi.string().min(10).max(11),
  avatar: Joi.string(),
  address: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages(),
  password: Joi.string().min(6).required(),
 
});