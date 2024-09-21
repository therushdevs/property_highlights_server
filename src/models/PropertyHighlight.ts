// src/models/PropertyHighlight.ts
import mongoose, { Schema, Document } from "mongoose";

interface IPropertyHighlight extends Document {
  title: string;
  created_at: string;
  updated_at: string;
  order: number;
}

const PropertyHighlightSchema: Schema = new Schema({
  title: { type: String, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
  order: { type: Number, required: true },
});

export default mongoose.model<IPropertyHighlight>(
  "PropertyHighlight",
  PropertyHighlightSchema
);
