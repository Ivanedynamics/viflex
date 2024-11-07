export const buildQueryParams = (filters: {
  [key in string]: string | Array<number> | string[];
}) => {
  const params = new URLSearchParams();
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (Array.isArray(value) && value.length > 0) {
      params.append(key, value.join(",")); // "1,2,3"
    } else if (typeof value === "string" && value) {
      params.append(key, value);
    }
  });
  return params.toString(); // Genera una cadena de query params
};

export const parseQueryParams = (url: string) => {
  const params = new URL(url);
  const filters = {
    buscar: params?.searchParams.get("buscar") || "",
    colores: params?.searchParams.get("colores")?.split(",").map(String) || [],
    categorias:
      params?.searchParams.get("categorias")?.split(",").map(String) || [],
    medidas: params?.searchParams?.get("medidas")?.split(",").map(String) || [],
    presentacion:
      params?.searchParams?.get("presentacion")?.split(",").map(String) || [],
    anchos: params?.searchParams?.get("anchos")?.split(",").map(String) || [],
  };
  return filters;
};
