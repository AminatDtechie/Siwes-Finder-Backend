import { NextFunction, Request, Response } from "express";
import {
  createRecruiterModel,
  deleteRecruiterModel,
  findRecruiterByEmailModel,
  findRecruiterByIdModel,
  updateRecruiterModel,
} from "../models/recruiterModel";
import bcrypt from "bcryptjs";
import { findStudentByEmailModel } from "../models/studentModel";
import {
  generateVerificationToken,
  generateVerificationEmail,
  sendEmail,
} from "../utils/email";

// sign up or register
export const signUpRecruiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // checking if account exist
    const recruiterExists = await findRecruiterByEmailModel(email);
    const studentExists = await findStudentByEmailModel(email);
    if (recruiterExists || studentExists) {
      res.status(409).json({
        message: "Email has already been used",
      });
      return;
    }
    // hashing password
    const hashPassword = bcrypt.hashSync(password, 10);

    // saving recruiter details to DB
    const recruiterArr = await createRecruiterModel({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    const recruiter = recruiterArr[0];

    const { password: _, ...data } = recruiter;

    const token = generateVerificationToken(data.id, "Recruiter");
    const verificationLink = `${process.env.BACKEND_URL}/verify-email?token=${token}`;
    const html = generateVerificationEmail(data.firstname, verificationLink);

    const mail = await sendEmail(
      data.email,
      "Welcome to Siwes Finder! Please verify your email",
      html
    );
    if (mail.success) {
      console.log(mail);

      res.status(201).json({
        success: true,
        message:
          "Account created successfully. Please check your email to verify your account before logging in.",
        data: {
          email: data.email,
          firstname: data.firstname,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// find user by ID
export const fetchRecruiterbyId = async (
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
    const user = await findRecruiterByIdModel(id);
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

import { fetchRecruitersModel } from "../models/recruiterModel"; // make sure this exists

export const fetchRecruiters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recruiters = await fetchRecruitersModel(); // fetch from DB
    res.status(200).json({
      success: true,
      message: "Recruiters fetched successfully",
      data: recruiters,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecruiterDetails = async (
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
    const updatedRecruiter = await updateRecruiterModel({
      id: id,
      age: data.age,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
    });

    res.status(200).json({
      success: true,
      mesage: "User details updated",
      data: updatedRecruiter,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecruiterDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Recruiter ID is required to delete",
    });
  }

  try {
    // Check if recruiter exists
    const user = await findRecruiterByIdModel(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    // Delete recruiter
    await deleteRecruiterModel(id);

    res.status(200).json({
      success: true,
      message: "Recruiter deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
