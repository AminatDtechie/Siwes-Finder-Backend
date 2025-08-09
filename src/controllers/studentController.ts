import { NextFunction, Request, Response } from "express";
import {
  createStudentModel,
  findStudentByEmailModel,
  findStudentByIdModel,
  updateStudentModel,
} from "../models/studentModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findRecruiterByEmailModel, findRecruiterByIdModel } from "../models/recruiterModel";

// sign up or register
export const signUpStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // checking if account exist
    const studentExists = await findStudentByEmailModel(email);
    const recruiterExists = await findRecruiterByEmailModel(email);
    
    if (studentExists || recruiterExists ) {
      res.status(409).json("User exists");
      return;
    }
    // hashing password
    const hashPassword = bcrypt.hashSync(password, 10);

    // saving user details to DB
    const user = await createStudentModel({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Assuming your auth middleware adds `user` to req with id and role
    const userId = req.user.id;
    const role = req.user.role;

    let user;

    if (role === "Student") {
      user = await findStudentByIdModel(userId);
    } else if (role === "Recruiter") {
      user = await findRecruiterByIdModel(userId);
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive info
    const { password, ...profile } = user;

    return res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};


// find user by ID
export const fetchStudentbyId = async (
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
    const user = await findStudentByIdModel(id);
    if (!user) {
      res.status(404).json("Student not found");
      return;
    }

    res.status(200).json({
      success: true,
      message: "Student details found",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudentDetails = async (
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
    const updatedStudent = await updateStudentModel({
      id: id,
      age: data.age,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
    });

    res.status(200).json({
      success: true,
      mesage: "Student details updated",
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};
