import User from "src/models/user.entity";

interface TokenPayload {
	user:User;
}

export default TokenPayload;