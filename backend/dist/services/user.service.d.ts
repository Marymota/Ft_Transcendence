import User from "src/models/user.entity";
import { Repository } from 'typeorm';
import { ChangeDisplayNameDto } from 'src/dtos/user-changedisplay.dto';
import UserRegisterDto from 'src/dtos/user-register.dto';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    findById(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    create(userData: UserRegisterDto): Promise<User>;
    updateDisplayName(id: string, registerData: ChangeDisplayNameDto): Promise<void>;
    updateImage(id: string, path: string): Promise<User>;
    getImageId(id: string): Promise<string>;
    GetAllUsersFromDB(): Promise<any>;
    FindUserOnDB(hash: string): Promise<string>;
    getUserPublicData(userID: string): Promise<any>;
    setTwoFactorAuthenticationSecret(secret: string, userId: string): Promise<User>;
    turnOnTwoFactorAuthentication(userId: string): Promise<User>;
    turnOffTwoFactorAuthentication(userId: string): Promise<User>;
    generateQrCodeDataURL(otpAuthUrl: string): Promise<string>;
    updateWebSocketId(userId: string, socketId: string): Promise<void>;
    findByDisplayname(displayname: string): Promise<string>;
}