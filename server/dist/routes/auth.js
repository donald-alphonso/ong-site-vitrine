"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/register', ((req, res) => {
    return (0, userController_1.createUser)(req, res);
}));
router.post('/login', ((req, res) => {
    return (0, userController_1.login)(req, res);
}));
exports.default = router;
