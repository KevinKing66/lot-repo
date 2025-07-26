  import { User } from "../../entities/User";

declare global {
  namespace Express {
    interface CustomRequest extends Request {
      user?: User | jwt.JwtPayload;
    }
  }
}
