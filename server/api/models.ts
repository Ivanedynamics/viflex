import mongoose from "mongoose";
import { Schema } from "mongoose";

const colorNewSchema = new Schema({
  id: {
    type: String,
  },
  nombre: {
    type: String,
  },
  code_hex: {
    type: String,
  },
});

const categoriesNewSchema = new Schema({
  id: {
    type: String,
  },
  nombre: {
    type: String,
  },
  parentCategory: {
    type: String,
  },
  secondayPicture: {
    type: String,
  },
  primaryPicture: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  weight: {
    type: String,
  },
});

const productsNewSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  category: {
    type: Array,
  },
  clave: {
    type: Array,
  },
  presentacion: {
    type: Array,
  },
  color: {
    type: Array,
  },
  medida: {
    type: Array,
  },
  presentacion_2: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  descripcion_larga: {
    type: String,
  },
});

const measuresNewSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
});

const widthsNewSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
});

const presentationNewSchema = new Schema({
  id: {
    type: String,
  },
  value: {
    type: String,
  },
});

const imagesNewSchema = new Schema({
  id: {
    type: String,
  },
  product_id: {
    type: String,
  },
  image_url: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
});

export const colorSchema =
  mongoose.models?.colors ?? mongoose.model("colors", colorNewSchema);

export const categoriesSchema =
  mongoose?.models?.categories ??
  mongoose?.model("categories", categoriesNewSchema);

export const productsSchema =
  mongoose?.models?.products ?? mongoose?.model("products", productsNewSchema);

export const measuresSchema =
  mongoose?.models?.measures ?? mongoose?.model("measures", measuresNewSchema);

export const widthsSchema =
  mongoose?.models?.widths ?? mongoose?.model("widths", widthsNewSchema);

export const presentationSchema =
  mongoose?.models?.presentation ??
  mongoose?.model("presentation", presentationNewSchema);

export const imagesSchema =
  mongoose?.models?.images ?? mongoose?.model("images", imagesNewSchema);
