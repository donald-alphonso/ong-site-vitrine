"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Not authorized, no token' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.user = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token invalid or expired' });
    }
};
exports.protect = protect;
const isAdmin = (req, res, next) => {
    const user = req.body.user;
    if (user.role !== 'admin') {
        res.status(403).json({ message: 'Admin access required' });
        return;
    }
    else {
        next();
    }
};
exports.isAdmin = isAdmin;
