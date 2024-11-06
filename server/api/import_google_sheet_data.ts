import { H3Event } from "h3";
import { connectDatabase } from "./connectDB";
import {
  categoriesSchema,
  colorSchema,
  imagesSchema,
  measuresSchema,
  presentationSchema,
  productsSchema,
  widthsSchema,
} from "./models";
export const generateURL = (event: H3Event, sheetRange: string) => {
  const env = useRuntimeConfig(event);
  const GOOGLE_API_KEY = env?.public?.GOOGLE_API_KEY;
  const SPREAD_SHEET_ID = env?.public?.SPREAD_SHEET_ID;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`;

  return url;
};

function deepCompare(obj1: any, obj2: any): boolean {
  // Verifica si ambos son objetos
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  // Verifica si tienen el mismo número de propiedades, ignorando '_id' y '__v'
  const keys1 = Object.keys(obj1).filter(
    (key) => key !== "_id" && key !== "__v"
  );
  const keys2 = Object.keys(obj2).filter(
    (key) => key !== "_id" && key !== "__v"
  );

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Verifica cada propiedad en obj1 y obj2, omitiendo '_id' y '__v'
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

const AdapterColor = (e: string[]) => {
  const payload = {
    id: e?.[0] ?? "",
    nombre: e?.[1] ?? "",
    code_hex: e?.[2] ?? "",
  };
  return payload;
};

export const createColorsJSON = async (event: H3Event) => {
  const url = generateURL(event, "colores!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();

  const data = (json?.values as string[][]) ?? [];
  const excel_colors = data?.slice(1);

  const database_colors = await colorSchema.find({}).lean();

  if (database_colors?.length === 0 || database_colors === null) {
    for await (const e of excel_colors) {
      const newItem = new colorSchema(AdapterColor(e));
      await newItem.save();
    }
  } else {
    for await (const e of excel_colors) {
      const payload = AdapterColor(e);
      const color_of_database = database_colors?.find(
        (color) => color?.id === payload?.id
      );
      if (!color_of_database) {
        const newItem = new colorSchema(payload);
        await newItem.save();
        return;
      }
      if (!deepCompare(color_of_database, payload)) {
        const filter = { id: color_of_database?.id };
        await colorSchema.findOneAndUpdate(filter, payload);
      }
    }
  }
};

const AdapterCategory = (e: string[]) => {
  const payload = {
    id: e?.[0] ?? "",
    nombre: e?.[1] ?? "",
    type: e?.[2] ?? "",
    parentCategory: e?.[3] ?? "",
    secondayPicture: e?.[4] ?? "",
    primaryPicture: e?.[5] ?? "",
    descripcion: e?.[6] ?? "",
    display: e?.[7] ?? "",
    featured: e?.[8] ?? "",
    weight: e?.[9] ?? "",
  };
  return payload;
};
export const createCategoriesJSON = async (event: H3Event) => {
  const url = generateURL(event, "categorias!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();

  const data = (json?.values as string[][]) ?? [];
  const excel_categories = data?.slice(1);
  const database_categories = await categoriesSchema.find({}).lean();
  if (database_categories?.length === 0 || database_categories === null) {
    for await (const e of excel_categories) {
      const payload = AdapterCategory(e);
      const newItem = new categoriesSchema(payload);
      await newItem.save();
    }
  } else {
    for await (const e of excel_categories) {
      const payload = AdapterCategory(e);
      const categorie_of_database = database_categories?.find(
        (color) => color?.id === payload?.id
      );
      if (!categorie_of_database) {
        const newItem = new categoriesSchema(payload);
        await newItem.save();
        return;
      }
      if (!deepCompare(categorie_of_database, payload)) {
        const filter = { id: categorie_of_database?.id };
        await categoriesSchema.findOneAndUpdate(filter, payload);
      }
    }
  }
};

const normalizeField = (value: string) => {
  return (
    value
      ?.replace(/ /g, "")
      ?.trim()
      ?.split(",")
      ?.filter((e) => e !== "") ?? []
  );
};

const AdapterProduct = (e: string[]) => {
  const payload = {
    id: e?.[0] ?? "",
    name: e?.[1] ?? "",
    category: normalizeField(e?.[2]),
    clave: normalizeField(e?.[3]),
    presentacion: normalizeField(e?.[4]),
    color: normalizeField(e?.[5]),
    medida: normalizeField(e?.[6]),
    presentacion_2: e?.[7] ?? "",
    descripcion: e?.[8] ?? "",
    type: e?.[9] ?? "",
    featured: e?.[10] ?? "",
    descripcion_larga: e?.[11] ?? "",
  };
  return payload;
};
export const createProductsJSON = async (event: H3Event) => {
  const url = generateURL(event, "productos!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  const database_products = await productsSchema.find({}).lean();
  const excel_products = data?.slice?.(1);

  if (database_products?.length === 0 || database_products === null) {
    for await (const e of excel_products) {
      const payload = AdapterProduct(e);
      const newItem = new productsSchema(payload);
      await newItem.save();
    }
  } else {
    for await (const e of excel_products) {
      const payload = AdapterProduct(e);
      const product_of_database = database_products?.find(
        (color) => color?.id === payload?.id
      );
      if (!product_of_database) {
        const newItem = new productsSchema(payload);
        await newItem.save();
        return;
      }
      if (!deepCompare(product_of_database, payload)) {
        const filter = { id: product_of_database?.id };
        await productsSchema.findOneAndUpdate(filter, payload);
      }
    }
  }
};

const AdapterMeasure = (e: string[]) => {
  const payload = {
    id: e?.[0] ?? "",
    name: e?.[1] ?? "",
  };
  return payload;
};
export const createMeasuresJSON = async (event: H3Event) => {
  const url = generateURL(event, "medida!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  const excel_measures = data?.slice?.(1);

  const datatbase_measures = await measuresSchema.find({}).lean();

  if (datatbase_measures?.length === 0 || datatbase_measures === null) {
    for await (const e of excel_measures) {
      const newItem = new measuresSchema(AdapterMeasure(e));
      await newItem.save();
    }
  } else {
    for await (const e of excel_measures) {
      const payload = AdapterMeasure(e);
      const measure_of_database = datatbase_measures?.find(
        (color) => color?.id === payload?.id
      );
      if (!measure_of_database) {
        const newItem = new measuresSchema(payload);
        await newItem.save();
        return;
      }
      if (!deepCompare(measure_of_database, payload)) {
        const filter = { id: measure_of_database?.id };
        await measuresSchema.findOneAndUpdate(filter, payload);
      }
    }
  }
};

const AdapterWidths = (e: string[]) => {
  const payload = {
    id: e?.[0] ?? "",
    name: e?.[1] ?? "",
  };
  return payload;
};
export const createWidthsJSON = async (event: H3Event) => {
  const url = generateURL(event, "ancho!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];
  const excel_widths = data?.slice(1);
  const database_widths = await widthsSchema.find({}).lean();

  if (database_widths?.length === 0 || database_widths === null) {
    for await (const e of excel_widths) {
      const payload = AdapterWidths(e);
      const newItem = new widthsSchema(payload);
      await newItem.save();
    }
    return;
  } else {
    for await (const e of excel_widths) {
      const payload = AdapterWidths(e);
      const width_of_database = database_widths?.find(
        (color) => color?.id === payload?.id
      );
      if (!width_of_database) {
        const newItem = new widthsSchema(payload);
        await newItem.save();
        return;
      }
      if (!deepCompare(width_of_database, payload)) {
        const filter = { id: width_of_database?.id };
        await widthsSchema.findOneAndUpdate(filter, payload);
      }
    }
    return;
  }
};

const AdapterPresentation = (e: string[]) => {
  const payload = {
    id: e?.[0] ?? "",
    value: e?.[1] ?? "",
  };

  return payload;
};
export const createPresentationJSON = async (event: H3Event) => {
  const url = generateURL(event, "presentacion!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];
  const excel_presentations = data?.slice(1);
  const database_presentations = await presentationSchema.find({}).lean();

  if (database_presentations?.length === 0 || database_presentations === null) {
    for await (const e of excel_presentations) {
      const payload = AdapterPresentation(e);
      const newItem = new presentationSchema(payload);
      await newItem.save();
    }
    return;
  } else {
    for await (const e of excel_presentations) {
      const payload = AdapterPresentation(e);
      const presentation_of_database = database_presentations?.find(
        (color) => color?.id === payload?.id
      );
      if (!presentation_of_database) {
        const newItem = new presentationSchema(payload);
        await newItem.save();
        return;
      }
      if (!deepCompare(presentation_of_database, payload)) {
        const filter = { id: presentation_of_database?.id };
        await presentationSchema.findOneAndUpdate(filter, payload);
      }
    }
    return;
  }
};

const AdapterImage = (e: string[]) => {
  const payload = {
    id: e?.[0] ?? "",
    product_id: e?.[1] ?? "",
    image_url: e?.[2] ?? "",
    visible: Boolean(parseInt(e?.[3], 10)) ?? false,
  };
  return payload;
};

export const createImagesJSON = async (event: H3Event) => {
  const url = generateURL(event, "images!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  const excel_images = data?.slice(1);
  const database_images = await imagesSchema.find({}).lean();

  if (database_images?.length === 0 || database_images === null) {
    for await (const e of excel_images) {
      const payload = AdapterImage(e);
      const newItem = new imagesSchema(payload);
      await newItem.save();
    }
    return;
  } else {
    for await (const e of excel_images) {
      const payload = AdapterImage(e);
      const image_of_database = database_images?.find(
        (color) => color?.id === payload?.id
      );
      if (!image_of_database) {
        const newItem = new imagesSchema(payload);
        await newItem.save();
        return;
      }

      if (!deepCompare(image_of_database, payload)) {
        const filter = { id: image_of_database?.id };
        await imagesSchema.findOneAndUpdate(filter, payload);
      }
    }
    return;
  }
};

export default defineEventHandler(async (event) => {
  await connectDatabase();
  await createColorsJSON(event);
  await createCategoriesJSON(event);
  await createProductsJSON(event);
  await createMeasuresJSON(event);
  await createWidthsJSON(event);
  await createPresentationJSON(event);
  await createImagesJSON(event);
  return {
    message: "Se actualizo la base de datos exitosamente",
  };
});
