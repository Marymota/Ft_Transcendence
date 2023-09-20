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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const existingRooms = [];
const chatLogs = [];
let ChatGateway = class ChatGateway {
    constructor() {
        this.logger = new common_1.Logger('Gateway Log');
    }
    handleMessage(message, socket) {
        const roomId = message.toString().substring(message.toString().indexOf(',') + 1);
        const roomName = message.toString().substring(0, message.toString().indexOf(','));
        this.logger.log(`message recieved ${roomName}, in room ${roomId}`);
        chatLogs[roomId] = [...chatLogs[roomId], roomName];
        this.logger.log(`Chat log: ${chatLogs[roomId]}`);
        const rooms = [...socket.rooms].slice(0);
        this.server.to(rooms[1]).emit('update', roomName);
    }
    joinOrUpdateRoom(roomId, socket) {
        this.logger.log(`User ${socket.id}, joined Room ${roomId}`);
        const rooms = [...socket.rooms].slice(0);
        if (rooms.length == 2)
            socket.leave(rooms[1]);
        socket.join(roomId);
    }
    createRoom(roomId, socket) {
        this.logger.log(`User ${socket.id}, created Room ${roomId}`);
        existingRooms.push(roomId);
        chatLogs.push([]);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "joinOrUpdateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "createRoom", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map