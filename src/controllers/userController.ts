import { NextFunction, Request, Response } from "express";
import {
  createUserModel,
  findUserByEmailModel,
  findUserByIdModel,
  updateUserModel,
} from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// sign up or register
export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, age, email, password } = req.body;
  try {
    // checking if account exist
    const userexist = await findUserByEmailModel(email);
    if (userexist) {
      res.status(409).json("User exists");
      return;
    }
    // hashing password
    const hashPassword = bcrypt.hashSync(password, 10);

    // saving user details to DB
    const user = await createUserModel({
      firstname,
      lastname,
      age,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//login
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const userExist = await findUserByEmailModel(email);
    if (!userExist) {
      res.status(404).json("Account not found");
      return;
    }

    //check if password is valid
    const isValid = bcrypt.compareSync(password, userExist.password);
    if (!isValid) {
      res.status(400).json("Incorrect credentials");
      return;
    }
    //destructuring unneccesary info out
    const { age, password: pass, ...others } = userExist;

    const token = jwt.sign(others, process.env.ACCESS_TOKEN!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// find user by ID
export const fetchUserbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    //checking if id is passed in
    if (!id) {
      res.status(400).json("Id is neded to continue");
      return;
    }

    // chcecking if user is available
    const user = await findUserByIdModel(parseInt(id));
    if (!user) {
      res.status(404).json("User not found");
      return;
    }

    res.status(200).json({
      success: true,
      message: "user found",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, email, age, password } = req.body;
  const { id } = req.params;

  let data: {
    firstname?: string;
    lastname?: string;
    age?: number;
    email?: string;
    password?: string;
  } = {};
  try {
    if (firstname) data.firstname = firstname;
    if (lastname) data.lastname = lastname;
    if (email) data.email = email;
    if (age) data.age = age;
    if (password) data.password = bcrypt.hashSync(password, 10);
    if (Object.keys(data).length < 1) {
      res.status(400).json("No data to update");
      return;
    }
    const updatedUser = await updateUserModel({
      id: parseInt(id),
      age: data.age,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
    });

    res.status(200).json({
      success: true,
      mesage: "User details updated",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
