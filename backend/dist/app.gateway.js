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
        if (messageData.content == '' ||
            messageData.sender == '' ||
            messageData.recipient == '')
            return 'invalid message';
        const senderUser = await prisma.user.findUnique({
            where: { userName: messageData.sender },
            select: {
                id: true,
                userName: true,
                MessagesSent: true,
                MessagesReceived: true,
            },
        });
        const recepientUser = await prisma.user.findUnique({
            where: { userName: messageData.recipient },
            select: {
                id: true,
                userName: true,
                MessagesSent: true,
                MessagesReceived: true,
            },
        });
        if (!senderUser || !recepientUser)
            return 'invalid isers';
        const msg = await prisma.message.create({
            data: {
                content: messageData.content,
                senderId: senderUser.id,
                recepientId: recepientUser.id,
            },
        });
        return 'msg added';
    }
    async getUsers(client) {
        const users = await prisma.user.findMany();
        console.log('asked for users');
        this.server.emit('getUsers', users);
        console.log('sent users');
    }
    async getMessages(messageData) {
        if (messageData.sender == '' || messageData.recepient == '')
            return 'invalid parameters';
        const sender = await prisma.user.findFirst({
            where: { userName: messageData.sender },
            select: {
                MessagesSent: true,
            },
        });
        const recepient = await prisma.user.findFirst({
            where: { userName: messageData.recepient },
            select: {
                id: true,
            },
        });
        let messages = sender.MessagesSent;
        let index = 0;
        while (index < messages.length) {
            for (index = 0; index < messages.length; index++) {
                if (messages[index].recepientId != recepient.id) {
                    messages = messages.splice(index, 1);
                    break;
                }
            }
        }
        this.server.emit('getChannelMessages', messages);
        return 'sucess';
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
__decorate([
    (0, websockets_1.SubscribeMessage)('getUsers'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "getUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getChannelMessages'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "getMessages", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], AppGateway);
//# sourceMappingURL=app.gateway.js.map