import { User } from './users.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): User[];
    addUser(id: string, nickname: string, password: string): User;
    findUser(id: string): User;
    updateLevel(id: string): User;
    deleteUser(id: string): void;
}
