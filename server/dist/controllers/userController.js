'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.promoteUser =
  exports.deleteUser =
  exports.login =
  exports.createUser =
  exports.getAllUsers =
    void 0;
const User_1 = __importDefault(require('../models/User'));
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const getAllUsers = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const users = yield User_1.default.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  });
exports.getAllUsers = getAllUsers;
const createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
      const existingUser = yield User_1.default.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: 'Email already exists' });
      const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
      const newUser = new User_1.default({
        name,
        email,
        password: hashedPassword,
      });
      yield newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  });
exports.createUser = createUser;
const login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
      const user = yield User_1.default.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      const isMatch = yield bcryptjs_1.default.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: 'Invalid credentials' });
      // token JWT
      const token = jsonwebtoken_1.default.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'votre_jwt_secret',
        { expiresIn: '24h' }
      );
      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error during login', error });
    }
  });
exports.login = login;
const deleteUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      yield User_1.default.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted sucessfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  });
exports.deleteUser = deleteUser;
const promoteUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const user = yield User_1.default.findByIdAndUpdate(
        id,
        { role: 'admin' },
        { new: true }
      );
      res.status(200).json({ message: 'User promoted sucessfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error promoting user', error });
    }
  });
exports.promoteUser = promoteUser;
