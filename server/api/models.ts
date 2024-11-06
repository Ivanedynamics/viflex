import mongoose, { Schema, Document } from "mongoose";

// Definición de tipos para cada esquema
export interface IColor extends Document {
  id: string;
  nombre: string;
  code_hex: string;
}

export interface ICategory extends Document {
  id: string;
  nombre: string;
  parentCategory?: string;
  secondayPicture?: string;
  primaryPicture?: string;
  descripcion?: string;
  display?: string;
  featured?: string;
  weight?: string;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  category: string[];
  clave: string[];
  presentacion: string[];
  featured: string;
  color: string[];
  medida: string[];
  presentacion_2?: string;
  type?: string;
  descripcion?: string;
  descripcion_larga?: string;
}

export interface IMeasure extends Document {
  id: string;
  name: string;
}

export interface IWidth extends Document {
  id: string;
  name: string;
}

export interface IPresentation extends Document {
  id: string;
  value: string;
}

export interface IImage extends Document {
  id: string;
  product_id: string;
  image_url: string;
  visible: boolean;
}

export interface IQuotation extends Document {
  id: string;
  quoteNumber: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  entity: string;
  comment?: string;
  products: string[];
}

// Esquemas de Mongoose tipados
const colorNewSchema = new Schema<IColor>({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  code_hex: { type: String, required: true },
});

const categoriesNewSchema = new Schema<ICategory>({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  parentCategory: { type: String },
  secondayPicture: { type: String },
  primaryPicture: { type: String },
  descripcion: { type: String },
  display: { type: String },
  featured: { type: String },
  weight: { type: String },
});

const productsNewSchema = new Schema<IProduct>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: [String], required: true },
  clave: { type: [String], required: true },
  presentacion: { type: [String], required: true },
  featured: { type: String, required: true },
  color: { type: [String], required: true },
  medida: { type: [String], required: true },
  presentacion_2: { type: String },
  type: { type: String },
  descripcion: { type: String },
  descripcion_larga: { type: String },
});

const measuresNewSchema = new Schema<IMeasure>({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const widthsNewSchema = new Schema<IWidth>({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const presentationNewSchema = new Schema<IPresentation>({
  id: { type: String, required: true },
  value: { type: String, required: true },
});

const imagesNewSchema = new Schema<IImage>({
  id: { type: String, required: true },
  product_id: { type: String, required: true },
  image_url: { type: String, required: true },
  visible: { type: Boolean, required: true },
});

const QuotationsNewSchema = new Schema<IQuotation>({
  id: { type: String, required: true },
  quoteNumber: { type: String, required: true },
  createdAt: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  entity: { type: String, required: true },
  comment: { type: String },
  products: { type: [String], required: true },
});

// Modelos tipados de Mongoose
export const colorSchema =
  mongoose.models.colors || mongoose.model<IColor>("colors", colorNewSchema);
export const categoriesSchema =
  mongoose.models.categories ||
  mongoose.model<ICategory>("categories", categoriesNewSchema);
export const productsSchema =
  mongoose.models.products ||
  mongoose.model<IProduct>("products", productsNewSchema);
export const measuresSchema =
  mongoose.models.measures ||
  mongoose.model<IMeasure>("measures", measuresNewSchema);
export const widthsSchema =
  mongoose.models.widths || mongoose.model<IWidth>("widths", widthsNewSchema);
export const presentationSchema =
  mongoose.models.presentation ||
  mongoose.model<IPresentation>("presentation", presentationNewSchema);
export const imagesSchema =
  mongoose.models.images || mongoose.model<IImage>("images", imagesNewSchema);
export const QuotationSchema =
  mongoose.models.quotations ||
  mongoose.model<IQuotation>("quotations", QuotationsNewSchema);
