import { User } from './users.model';
export declare class UsersService {
    private users;
    getAll(): User[];
    addUser(user: User): User;
    findUser(id: string): User;
    updateLevel(id: string): User;
    deleteUser(id: string): void;
}
