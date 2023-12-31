import { TRPCError } from "@trpc/server";

export const InternalServerError = (err: any) => {
  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred, please try again later.",
    cause: err,
  });
};

export const inactiveUserError = () => {
  return new TRPCError({
    code: "CLIENT_CLOSED_REQUEST",
    message: "Please activate your created account",
  });
};

export const dataExistsError = (type: string) => {
  return new TRPCError({
    code: "CONFLICT",
    message: `An active ${type} account already exists , Please login !`,
  });
};
