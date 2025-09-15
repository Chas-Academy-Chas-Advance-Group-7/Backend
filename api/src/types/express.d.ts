import type { jwtPayload } from "./types.ts"; // adjust path if needed

declare module "express-serve-static-core" {
  interface Request {
    user?: jwtPayload;
  }
}
