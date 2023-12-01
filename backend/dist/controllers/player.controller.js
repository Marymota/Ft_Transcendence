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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../services/player.service");
let PlayerController = class PlayerController {
    constructor(playerService) {
        this.playerService = playerService;
    }
    async registerPlayer(nickname, country, avatar) {
        const existingPlayer = await this.playerService.findPlayerByNickname(nickname);
        if (existingPlayer) {
            return { error: 'Nickname is already taken' };
        }
        const newPlayer = await this.playerService.createPlayer(nickname, country, avatar);
        return { success: true, user: newPlayer };
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('nickname')),
    __param(1, (0, common_1.Body)('country')),
    __param(2, (0, common_1.Body)('avatar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "registerPlayer", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('player'),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map