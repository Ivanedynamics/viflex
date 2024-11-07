export const InputSearch = ref<string>("");
export const InputSelectColors = ref<string[]>([]);
export const InputSelectCategories = ref<string[]>([]);
export const InputSelectMeasures = ref<string[]>([]);
export const InputSelectPresentation = ref<string[]>([]);
export const splitParam = <T>(value: any): T => {
  return value?.toString()?.split(",") ?? [];
};

export const JointParams = (value: string[]): string => {
  return value?.join(",");
};
