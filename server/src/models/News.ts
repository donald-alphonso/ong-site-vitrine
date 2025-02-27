import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  summary: string;
  image?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Le contenu est requis'],
    },
    summary: {
      type: String,
      required: [true, 'Le résumé est requis'],
    },
    image: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "Le nom de l'auteur est requis"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INews>('News', NewsSchema);
