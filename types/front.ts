import type {
  ICategory,
  IColor,
  IImage,
  IMeasure,
  IPresentation,
} from "~/server/api/models";

export type IFrontProduct = {
  id: string;
  name: string;
  category: ICategory[];
  clave: string[];
  presentacion: IPresentation[];
  color: IColor[];
  medida: IMeasure[];
  presentacion_2: string;
  descripcion: string;
  descripcion_larga: string;
  images?: IImage[];
};
