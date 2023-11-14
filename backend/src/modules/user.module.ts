import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import User from '../models/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from 'src/auth/jwtauth/jwt.strategy';


@Module({
	imports: [TypeOrmModule.forFeature([User]), PassportModule, ConfigModule, JwtModule.registerAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: async(configService: ConfigService) => ({
			secret: configService.get('JWT_SECRET'),
			signOptions: {
				expiresIn: `${configService.get("JWT_EXPIRATION_TIME")}s`,
				},
			}),
		}),
	],
	controllers: [UserController],
	providers: [UserService, JwtStrategy],
	exports: [UserService, TypeOrmModule],
})
export class UserModule {}