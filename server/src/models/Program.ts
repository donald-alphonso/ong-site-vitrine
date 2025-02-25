import mongoose, { Document, Schema } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  description: string;
  image?: string;
  objectives: string[];
  benefits: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    image: {
      type: String,
    },
    objectives: [{
      type: String,
    }],
    benefits: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProgram>('Program', ProgramSchema);
