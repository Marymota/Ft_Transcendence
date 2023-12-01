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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const player_service_1 = require("../services/player.service");
let PlayerGateway = class PlayerGateway {
    constructor(playerService) {
        this.playerService = playerService;
    }
    async handleRegistrationPlayer(client, data) {
        const { nickname, country, avatar } = data;
        try {
            const player = await this.playerService.createPlayer(nickname, country, avatar);
            this.server.emit('registrationResponse', { success: true, player });
        }
        catch (error) {
            this.server.emit('registrationResponse', { error: 'Failed to register player' });
        }
    }
};
exports.PlayerGateway = PlayerGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PlayerGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('registerPlayer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlayerGateway.prototype, "handleRegistrationPlayer", null);
exports.PlayerGateway = PlayerGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: 'http://localhost:5173' } }),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerGateway);
//# sourceMappingURL=register.gateway.js.map