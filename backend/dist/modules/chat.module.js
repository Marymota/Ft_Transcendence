"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("../gateways/chat.gateway");
const user_module_1 = require("./user.module");
const user_service_1 = require("../services/user.service");
const user_controller_1 = require("../controllers/user.controller");
const chat_service_1 = require("../services/chat.service");
const typeorm_1 = require("@nestjs/typeorm");
const channel_entity_1 = require("../entitys/channel.entity");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([channel_entity_1.default]), user_module_1.UserModule],
        providers: [chat_gateway_1.ChatGateway, user_service_1.UserService, chat_service_1.ChatService],
        controllers: [user_controller_1.UserController],
        exports: [chat_service_1.ChatService],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map