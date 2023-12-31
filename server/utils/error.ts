import { TRPCError } from "@trpc/server";

export const InternalServerError = (err: any) => {
  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred, please try again later.",
    cause: err,
  });
};

export const InactiveUserError = () => {
  return new TRPCError({
    code: "CLIENT_CLOSED_REQUEST",
    message: "Please activate your created account",
  });
};

export const DataExistsError = (type: string, cnd: boolean) => {
  if (cnd) {
    return new TRPCError({
      code: "CONFLICT",
      message: `An active ${type} account already exists , Please login !`,
    });
  } else {
    return new TRPCError({
      code: "CONFLICT",
      message: `${type} doesn't exists , Please register !`,
    });
  }
};

export const UnauthorizedRouteError = () => {
  return new TRPCError({
    code: "FORBIDDEN",
    message: "Please Login with correct credentials please",
  });
};
