import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import User from 'src/entitys/user.entity';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(username: string, password: string, twoFactor: string): Promise<User>;
}
export {};
