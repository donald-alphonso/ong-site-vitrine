import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating: number;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Le contenu du témoignage est requis'],
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
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

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
