'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const mongoose_1 = __importDefault(require('mongoose'));
const cors_1 = __importDefault(require('cors'));
const dotenv_1 = __importDefault(require('dotenv'));
const auth_1 = __importDefault(require('./routes/auth'));
const adminRoutes_1 = __importDefault(require('./routes/adminRoutes'));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database connection
mongoose_1.default
  .connect(process.env.MONGO_URI || '', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));
app.use('/api/auth', auth_1.default);
app.use('/api/admin', adminRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
