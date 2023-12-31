import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import { prisma } from "../db";
import { publicProcedure } from "../procedures/trpc";
import { userInputType } from "../utils/types";
import {
  InternalServerError,
  dataExistsError,
  inactiveUserError,
} from "../utils/error";

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
          throw inactiveUserError();
        }
        throw dataExistsError("user");
      }

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      user=await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });

      const token=await jwt.sign(user.id,"dfs")
        
      return {
        message: "User Created successfully",
        token,
      };
    } catch (error) {
      throw InternalServerError(error);
    }
  });

export const Login = publicProcedure
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
          throw inactiveUserError();
        }
        throw dataExistsError("user");
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return {
        message: "User Created successfully",
        user: {
          name,
          email,
        },
      };
    } catch (error) {
      throw InternalServerError(error);
    }
  });
