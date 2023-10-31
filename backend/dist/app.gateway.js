"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let AppGateway = class AppGateway {
    constructor() {
        this.logger = new common_1.Logger('Gateway Log');
    }
    async print(client) {
        const users = await prisma.user.findMany();
        console.log(users);
    }
    async createUser(messageData) {
        const allUsers = await prisma.user.findMany();
        for (let index = 0; index < allUsers.length; index++) {
            if (messageData.userName == allUsers[index].userName) {
                console.log('invalid userName');
                return 'invalid userName';
            }
        }
        await prisma.user.create({
            data: {
                firstName: messageData.firstName,
                userName: messageData.userName,
                avatar: messageData.avatar,
            },
        });
        console.log('created user');
        return 'created user';
    }
    async sendMessage(messageData) {
        if (messageData.content == '')
            return 'invalid message';
        const allUsers = await prisma.user.findMany();
        for (let index = 0; index < allUsers.length; index++) {
            if (messageData.sender == allUsers[index].userName) {
                for (let idx = 0; idx < allUsers.length; idx++) {
                    if (messageData.recipient == allUsers[idx].userName) {
                        const msg = await prisma.message.create({
                            data: {
                                content: messageData.content,
                                recepientId: allUsers[idx].id,
                            },
                        });
                        const res = await prisma.user.findUnique({
                            where: { userName: allUsers[index].userName },
                            select: {
                                Messages: true,
                            },
                        });
                        await prisma.user.update({
                            data: {
                                Messages: {
                                    set: [...res.Messages, msg],
                                },
                            },
                            where: { userName: allUsers[index].userName },
                        });
                        return 'sent message';
                    }
                }
            }
        }
        return 'invalid message';
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('printUsers'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "print", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "createUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "sendMessage", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], AppGateway);
//# sourceMappingURL=app.gateway.js.map