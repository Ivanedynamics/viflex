import type {
  ICategory,
  IColor,
  IImage,
  IMeasures,
  IPresentacion,
} from "./back";

export type IFrontProduct = {
  id: string;
  name: string;
  category: ICategory;
  clave: string[];
  presentacion: IPresentacion[];
  color: IColor[];
  medida: IMeasures[];
  presentacion_2: string;
  descripcion: string;
  descripcion_larga: string;
  images?: IImage[];
};
