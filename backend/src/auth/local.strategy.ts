import {HttpException, Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import User from "src/models/user.entity";

@Injectable()
	export class LocalStrategy extends PassportStrategy(Strategy) {
		constructor(private readonly authService: AuthService) {
			super ({
				usernameField: "username",
			});
		}

		async validate(username: string, password:string, twoFactor: string) : Promise<User> {
			return  await this.authService.getAutenticatedUser(username, password);
		}
}