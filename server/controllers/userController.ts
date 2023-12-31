import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../db";
import { publicProcedure } from "../procedures/trpc";
import { loginInputType, userInputType } from "../utils/types";
import {
  InternalServerError,
  DataExistsError,
  InactiveUserError,
} from "../utils/error";
import { secretKey } from "..";

export const userSignup = publicProcedure
  .input(userInputType)
  .mutation(async (opt) => {
    try {
      const { name, email, password } = opt.input;

      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        if (!user.active) {
          throw InactiveUserError();
        }
        throw DataExistsError("user", true);
      }

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });

      const token = await jwt.sign({ id: user.id }, secretKey);

      return {
        message: "Registered successfully",
        token,
      };
    } catch (error) {
      throw InternalServerError(error);
    }
  });

export const userLogin = publicProcedure
  .input(loginInputType)
  .mutation(async (opt) => {
    try {
      const stream = opt.input;

      let user = await prisma.user.findUnique({
        where: {
          email: stream.email,
        },
      });

      if (!user) {
        throw DataExistsError("user", false);
      }
      if (!user.active) {
        throw InactiveUserError();
      }

      const token = await jwt.sign({ id: user.id }, secretKey);

      return {
        message: "Logged in successfully",
        token,
      };
    } catch (error) {
      throw InternalServerError(error);
    }
  });
