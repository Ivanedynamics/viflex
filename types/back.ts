export type IProduct = {
  id: string;
  name: string;
  category: string[];
  clave: string[];
  presentacion: string[];
  color: string[];
  medida: string[];
  presentacion_2: string;
  descripcion: string;
  descripcion_larga: string;
  images?: IImage[];
};

export type ICategory = {
  id: string;
  nombre: string;
  parentCategory: string;
  secondayPicture: string;
  primaryPicture: string;
  descripcion: string;
  weight: string;
};

export type IPresentacion = {
  id: string;
  value: string;
};
export type IColor = {
  id: string;
  nombre: string;
  code_hex: string;
};
export type IMeasures = {
  id: string;
  name: string;
};

export type IImage = {
  id: string;
  product_id: string;
  image_url: string;
  visible: boolean;
};
