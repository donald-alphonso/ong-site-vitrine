"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/users', authMiddleware_1.protect, authMiddleware_1.isAdmin, userController_1.getAllUsers);
router.delete('/users/:id', authMiddleware_1.protect, authMiddleware_1.isAdmin, userController_1.deleteUser);
router.put('/users/:id/promote', authMiddleware_1.protect, authMiddleware_1.isAdmin, userController_1.promoteUser);
exports.default = router;
