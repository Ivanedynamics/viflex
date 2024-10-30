import { H3Event } from "h3";
import { kv } from "@vercel/kv";
import { clearCollections, connectDatabase } from "./connectDB";
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

export const createColorsJSON = async (event: H3Event) => {
  const url = generateURL(event, "colores!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();

  const data = (json?.values as string[][]) ?? [];

  for await (const e of data?.slice(1)) {
    const payload = {
      id: e?.[0] ?? "",
      nombre: e?.[1] ?? "",
      code_hex: e?.[2] ?? "",
    };
    const newItem = new colorSchema(payload);
    await newItem.save();
  }
};
export const createCategoriesJSON = async (event: H3Event) => {
  const url = generateURL(event, "categorias!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();

  const data = (json?.values as string[][]) ?? [];

  for await (const e of data?.slice(1)) {
    const payload = {
      id: e?.[0] ?? "",
      nombre: e?.[1] ?? "",
      parentCategory: e?.[2] ?? "",
      secondayPicture: e?.[3] ?? "",
      primaryPicture: e?.[4] ?? "",
      descripcion: e?.[5] ?? "",
      weight: e?.[6] ?? "",
    };

    const newItem = new categoriesSchema(payload);
    await newItem.save();
  }
  // const categoriesArray = data?.slice(1)?.map((e) => {
  //   return {
  //     id: e?.[0] ?? "",
  //     nombre: e?.[1] ?? "",
  //     parentCategory: e?.[2] ?? "",
  //     secondayPicture: e?.[3] ?? "",
  //     primaryPicture: e?.[4] ?? "",
  //     descripcion: e?.[5] ?? "",
  //     weight: e?.[6] ?? "",
  //   };
  // });

  // kv.set("categories.json", categoriesArray);
};
export const createProductsJSON = async (event: H3Event) => {
  const url = generateURL(event, "productos!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  const normalizeField = (value: string) => {
    return (
      value
        ?.replace(/ /g, "")
        ?.trim()
        ?.split(",")
        ?.filter((e) => e !== "") ?? []
    );
  };

  for await (const e of data?.slice(1)) {
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
      featured: e?.[9] ?? "",
      descripcion_larga: e?.[10] ?? "",
    };
    const newItem = new productsSchema(payload);
    await newItem.save();
  }
  // const productsArray = data?.slice(1)?.map((e) => {
  //   return {
  //     id: e?.[0] ?? "",
  //     name: e?.[1] ?? "",
  //     category: normalizeField(e?.[2]),
  //     clave: normalizeField(e?.[3]),
  //     presentacion: normalizeField(e?.[4]),
  //     color: normalizeField(e?.[5]),
  //     medida: normalizeField(e?.[6]),
  //     presentacion_2: e?.[7] ?? "",
  //     descripcion: e?.[8] ?? "",
  //     descripcion_larga: e?.[9] ?? "",
  //   };
  // });
  // kv.set("products.json", productsArray);
};
export const createMeasuresJSON = async (event: H3Event) => {
  const url = generateURL(event, "medida!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  for await (const e of data?.slice(1)) {
    const payload = {
      id: e?.[0] ?? "",
      name: e?.[1] ?? "",
    };
    const newItem = new measuresSchema(payload);
    await newItem.save();
  }

  // const measuresArray = data?.slice(1)?.map((e) => {
  //   return {
  //     id: e?.[0] ?? "",
  //     name: e?.[1] ?? "",
  //   };
  // });

  // kv.set("measures.json", measuresArray);
};
export const createWidthsJSON = async (event: H3Event) => {
  const url = generateURL(event, "ancho!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  for await (const e of data?.slice(1)) {
    const payload = {
      id: e?.[0] ?? "",
      name: e?.[1] ?? "",
    };
    const newItem = new widthsSchema(payload);
    await newItem.save();
  }

  // const widthsArray = data?.slice(1)?.map((e) => {
  //   return {
  //     id: e?.[0] ?? "",
  //     name: e?.[1] ?? "",
  //   };
  // });

  // kv.set("widths.json", widthsArray);
};
export const createPresentationJSON = async (event: H3Event) => {
  const url = generateURL(event, "presentacion!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  for await (const e of data?.slice(1)) {
    const payload = {
      id: e?.[0] ?? "",
      value: e?.[1] ?? "",
    };
    const newItem = new presentationSchema(payload);
    await newItem.save();
  }
  // const presentacionArra = data?.slice(1)?.map((e) => {
  //   return {
  //     id: e?.[0] ?? "",
  //     value: e?.[1] ?? "",
  //   };
  // });

  // kv.set("presentacion.json", presentacionArra);
};

export const createImagesJSON = async (event: H3Event) => {
  const url = generateURL(event, "images!A1:Z900");
  const response = await fetch(url);
  const json = await response.json();
  const data = (json?.values as string[][]) ?? [];

  for await (const e of data?.slice(1)) {
    const payload = {
      id: e?.[0] ?? "",
      product_id: e?.[1] ?? "",
      image_url: e?.[2] ?? "",
      visible: Boolean(parseInt(e?.[3], 10)) ?? false,
    };
    const newItem = new imagesSchema(payload);
    await newItem.save();
  }

  // const imagesArray = data?.slice(1)?.map((e) => {
  //   return {
  //     id: e?.[0] ?? "",
  //     product_id: e?.[1] ?? "",
  //     image_url: e?.[2] ?? "",
  //     visible: Boolean(parseInt(e?.[3], 10)) ?? false,
  //   };
  // });

  // kv.set("images.json", imagesArray);
};

export default defineEventHandler(async (event) => {
  await connectDatabase();
  await clearCollections();
  await createColorsJSON(event);
  await createCategoriesJSON(event);
  await createProductsJSON(event);
  await createMeasuresJSON(event);
  await createWidthsJSON(event);
  await createPresentationJSON(event);
  await createImagesJSON(event);
  return {
    message: "Archivos generados exitosamente",
  };
});
