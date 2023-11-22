import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entitys/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from 'src/dtos/user-register.dto';
import { ChangeDisplayNameDto } from 'src/dtos/user-changedisplay.dto';
import { toDataURL } from 'qrcode';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import UserRegisterDto from 'src/dtos/user-register.dto';
import { ChatService } from './chat.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => ChatService))
    private chatService: ChatService,
  ) {}

  async findById(id: string) {
    const user: User = await this.userRepo.findOneBy({ id });
    if (user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException(
      'UserId provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByUsername(username: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (user) return user;
    throw new HttpException(
      'Username provided is invalid!',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: UserRegisterDto) {
    const newUser = await this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async updateDisplayName(id: string, registerData: ChangeDisplayNameDto) {
    try {
      const user = await this.findById(id);
      (await user).displayname = registerData.displayname;
      await this.userRepo.save(user);
    } catch (e) {
      throw new HttpException(
        'Error while update user displayname!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateImage(id: string, path: string) {
    try {
      const user = await this.findById(id);
      (await user).avatar = path;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error while update user image!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }

  async getImageId(id: string) {
    try {
      const user = await this.findById(id);
      return user.avatar;
    } catch (e) {
      throw new HttpException(
        'Error while get user image!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }

  async GetAllUsersFromDB() {
    // const user = await this.userRepo.query(
    //   `SELECT userName, displayname, id, elo, xp FROM public."user"`,
    // );
    const users = await this.userRepo.query(
      `SELECT userName, displayname, email, avatar, elo, friends, blocked FROM public."user"`,
    );
    if (users) return users;
    throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);
  }

  async FindUserOnDB(hash: string): Promise<string> {
    const user = await this.userRepo.query(`SELECT id FROM public."user"`);
    if (!user) return undefined;
    for (let i = 0; user[i]; i++) {
      if (await bcrypt.compare(user[i].id, hash)) return user[i].id;
    }
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  async getUserPublicData(userID: string) {
    const user = await this.userRepo.query(
      `SELECT displayname, id, elo FROM public."user" WHERE id = userID`,
    );
    if (user) return user;
    throw new HttpException(
      'Error in get user public information!',
      HttpStatus.NOT_FOUND,
    );
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: string) {
    try {
      const user = await this.findById(userId);
      (await user).secret2F = secret;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error in 2fa authentication!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }
  async turnOnTwoFactorAuthentication(userId: string) {
    try {
      const user = await this.findById(userId);
      (await user).is2FOn = true;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error in 2fa authentication!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }

  async turnOffTwoFactorAuthentication(userId: string) {
    try {
      const user = await this.findById(userId);
      (await user).is2FOn = false;
      await this.userRepo.save(user);
      return user;
    } catch (e) {
      throw new HttpException(
        'Error in 2fa authentication',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }
  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  async updateWebSocketId(userId: string, socketId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new HttpException(
        'Error during socket update request!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    user.idWebSocket = socketId;
    await this.userRepo.save(user);
  }

  async findByDisplayname(displayname: string): Promise<string> {
    try {
      const users = await this.userRepo.query(
        `SELECT displayname, id FROM public."user"`,
      );
      if (!users)
        throw new HttpException(
          'User not found QRY!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      for (let i = 0; users[i]; i++) {
        if (users[i].displayname == displayname) return users[i].id;
      }
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (e) {
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return '';
  }

  async addChannelToUser(userName: string, channelDisplayName: string) {
    const user = await this.findByUsername(userName);
    if (!user) {
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const channel =
      await this.chatService.findByDisplayName(channelDisplayName);
    if (!channel) {
      throw new HttpException(
        'Cahnnel not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    user.channels.push(channel);
    await this.userRepo.save(user);
  }
}
