import mongoose, { Schema, Document } from "mongoose";

// Definición de tipos para cada esquema
export interface IColor {
  id: string;
  nombre: string;
  code_hex: string;
}

export interface ICategory {
  id: string;
  nombre: string;
  type: string;
  parentCategory?: string;
  secondayPicture?: string;
  primaryPicture?: string;
  descripcion?: string;
  display?: string;
  featured?: string;
  weight?: string;
  subCategories?: ICategory[];
}

export interface IProduct {
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

export interface IMeasure {
  id: string;
  name: string;
}

export interface IWidth {
  id: string;
  name: string;
}

export interface IPresentation {
  id: string;
  value: string;
}

export interface IImage {
  id: string;
  product_id: string;
  image_url: string;
  visible: boolean;
}

export interface IQuotation {
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
  id: { type: String },
  nombre: { type: String },
  code_hex: { type: String },
});

const categoriesNewSchema = new Schema<ICategory>({
  id: { type: String },
  nombre: { type: String },
  type: { type: String },
  parentCategory: { type: String },
  secondayPicture: { type: String },
  primaryPicture: { type: String },
  descripcion: { type: String },
  display: { type: String },
  featured: { type: String },
  weight: { type: String },
});

const productsNewSchema = new Schema<IProduct>({
  id: { type: String },
  name: { type: String },
  category: { type: [String] },
  clave: { type: [String] },
  presentacion: { type: [String] },
  featured: { type: String },
  color: { type: [String] },
  medida: { type: [String] },
  presentacion_2: { type: String },
  type: { type: String },
  descripcion: { type: String },
  descripcion_larga: { type: String },
});

const measuresNewSchema = new Schema<IMeasure>({
  id: { type: String },
  name: { type: String },
});

const widthsNewSchema = new Schema<IWidth>({
  id: { type: String },
  name: { type: String },
});

const presentationNewSchema = new Schema<IPresentation>({
  id: { type: String },
  value: { type: String },
});

const imagesNewSchema = new Schema<IImage>({
  id: { type: String },
  product_id: { type: String },
  image_url: { type: String },
  visible: { type: Boolean },
});

const QuotationsNewSchema = new Schema<IQuotation>({
  id: { type: String },
  quoteNumber: { type: String },
  createdAt: { type: String },
  fullName: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  state: { type: String },
  entity: { type: String },
  comment: { type: String },
  products: { type: [String] },
});

export type ISeoPage = {
  id: string;
  title: string;
  url: string;
  keywords: string;
  description: string;
  image: string;
  slug: string;
  author: string;
};

const SeoPagesNewSchema = new Schema<ISeoPage>({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  keywords: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
  },
  author: {
    type: String,
  },
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

export const SeoPagesSchema =
  mongoose.models.seopages ||
  mongoose.model<ISeoPage>("seopages", SeoPagesNewSchema);
