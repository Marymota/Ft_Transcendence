import { Request } from "express";
import User from "src/models/user.entity";

interface RequestWithUser extends Request {
	user: User;
}
export default RequestWithUser;