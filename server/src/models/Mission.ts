import mongoose, { Document, Schema } from 'mongoose';

export interface IMission extends Document {
  title: string;
  description: string;
  icon: string; // Nom de l'icône Lucide
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const missionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IMission>('Mission', missionSchema);
