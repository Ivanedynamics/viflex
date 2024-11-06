<script setup lang="ts">
import { useForm } from "vee-validate";
import { CONTACT_COFING } from "~/mocks/contact";
import { useCartStore } from "~/store/cart";
import type { IFrontProduct } from "~/types/front";
import { capitalizeText } from "~/utils/capitalize";
import { object, string } from "yup";

const route = useRoute();
const response = await useFetch<{ product: IFrontProduct }>(
  `/api/getProductById?productById=${route?.params?.id}`
);
const data = response?.data?.value;

const product = computed(() => {
  return {
    name: data?.product?.name,
    descripcion: data?.product?.descripcion,
    colores: data?.product?.color,
    measures: data?.product?.medida,
    clave: data?.product?.clave,
    categoria: data?.product?.category,
    presentacion: data?.product?.presentacion,
    descripcion_larga: data?.product?.descripcion_larga,
    images: data?.product?.images,
  };
});
const viewImage = ref(product.value?.images?.[0] ?? null);

const { setProduct } = useCartStore();

const url = useRequestURL();

const message = computed(() => {
  return `¡Hola! Me gustaría obtener más información sobre este producto: ${url}. ¿Podrías ayudarme, por favor?`;
});

const { errors, handleSubmit, defineField, handleReset } = useForm({
  initialValues: {
    presentationId: "",
    measureId: "",
    colorId: "",
  },
  validationSchema: object({
    presentationId: string().required("Debes escoger una presentacion"),
    measureId: string().required("Debes escoger una medida"),
    colorId: string().required("Debes escoger un color"),
  }),
  initialTouched: {
    presentationId: false, // touched
    measureId: false, // non-touched
    colorId: false,
  },
});

type Values = {
  presentationId: string;
  measureId: string;
  colorId: string;
};

const onSubmit = (values: Values) => {
  const product = data?.product;
  if (!product) {
    return;
  }
  const color = product?.color?.find((e) => e?.id === values?.colorId);
  const medida = product?.medida?.find((e) => e?.id === values?.measureId);
  const presentacion = product?.presentacion?.find(
    (e) => e?.id === values?.presentationId
  );

  if (!color || !medida || !presentacion) {
    return;
  }
  setProduct({
    product,
    selection: {
      color,
      medida,
      presentacion,
    },
  });

  handleReset();
};

const handleFormSubmit = () => {
  handleSubmit(onSubmit)();
};
const [presentationId] = defineField("presentationId");
const [measureId] = defineField("measureId");
const [colorId] = defineField("colorId");
</script>

<template>
  <main class="flex-col pt-5 flex items-center justify-center px-3 mb-20">
    <div
      class="w-full max-w-[1240px] grid grid-cols-5 gap-2 grid-rows-1 mobile_s:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-5"
    >
      <section class="gap-2 tablet:col-span-1 laptop:col-span-3">
        <div :class="`sticky top-24 w-full gap-2 flex flex-col`">
          <ImagePreviewCard
            :image_url="viewImage?.image_url"
            custom-css="w-full h-[520px] mobile_s:h-[320px] tablet:h-[420px] laptop:h-[460px]"
          />
          <aside
            v-if="Number(product?.images?.length) > 1"
            class="flex flex-row w-full gap-2"
          >
            <div
              v-for="img in product?.images"
              :key="`image-preview-product-${img?.id}`"
              class="bg-gray-200 w-[50px] h-[50px] rounded-md border-primary border-2"
              :style="{
                borderColor:
                  viewImage?.id === img?.id
                    ? 'rgb(41 91 172 / var(--tw-border-opacity))'
                    : 'transparent',
              }"
              @click="() => (viewImage = img)"
            >
              <img
                :src="img?.image_url"
                class="w-full h-full object-contain mix-blend-darken"
                alt=""
                srcset=""
              />
            </div>
          </aside>
        </div>
      </section>

      <section
        class="p-2 flex flex-col gap-6 tablet:col-span-1 laptop:col-span-2"
      >
        <div class="flex flex-col gap-2">
          <p class="font-bold text-2xl">{{ capitalizeText(product?.name) }}</p>
          <p class="text-base">
            {{ product?.descripcion }}
          </p>
        </div>
        <div v-if="product?.colores?.length !== 0">
          <p class="text-sm">Disponible en:</p>
          <ul class="flex flex-row gap-2 flex-wrap">
            <li v-for="item in product?.colores">
              <div
                class="rounded-md border container-box"
                :style="{
                  width: '25px',
                  height: '25px',
                  backgroundColor: item?.code_hex,
                  border: '1px solid gray',
                }"
              ></div>
            </li>
          </ul>
        </div>
        <div v-if="product?.measures?.length !== 0">
          <p class="text-sm">Medidas:</p>
          <ul class="flex flex-row gap-2 flex-wrap">
            <li v-for="item in product?.measures">
              <p
                class="rounded-md border badge p-4 dark:bg-slate-800 bg-[#fff] container-box"
              >
                {{ item?.name }}
              </p>
            </li>
          </ul>
        </div>
        <div v-if="product?.presentacion?.length !== 0">
          <p class="text-sm">Presentacion:</p>
          <ul class="flex flex-row gap-2 flex-wrap">
            <li v-for="item in product?.presentacion">
              <p
                class="rounded-md border dark:bg-slate-800 bg-[#fff] badge p-4 container-box"
              >
                {{ item?.value }}
              </p>
            </li>
          </ul>
        </div>
        <a
          target="_blank"
          :href="`https://wa.me/${
            CONTACT_COFING.whatsapp?.format
          }?text=${encodeURIComponent(message)}`"
          class="btn btn-success"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.05 4.91006C18.1332 3.98399 17.0412 3.24973 15.8376 2.75011C14.6341 2.25049 13.3431 1.99552 12.04 2.00006C6.57999 2.00006 2.12999 6.45006 2.12999 11.9101C2.12999 13.6601 2.58999 15.3601 3.44999 16.8601L2.04999 22.0001L7.29999 20.6201C8.74999 21.4101 10.38 21.8301 12.04 21.8301C17.5 21.8301 21.95 17.3801 21.95 11.9201C21.95 9.27006 20.92 6.78006 19.05 4.91006ZM12.04 20.1501C10.56 20.1501 9.10999 19.7501 7.83999 19.0001L7.53999 18.8201L4.41999 19.6401L5.24999 16.6001L5.04999 16.2901C4.22773 14.977 3.79113 13.4593 3.78999 11.9101C3.78999 7.37006 7.48999 3.67006 12.03 3.67006C14.23 3.67006 16.3 4.53006 17.85 6.09006C18.6175 6.85402 19.2257 7.76272 19.6394 8.76348C20.0531 9.76425 20.264 10.8372 20.26 11.9201C20.28 16.4601 16.58 20.1501 12.04 20.1501ZM16.56 13.9901C16.31 13.8701 15.09 13.2701 14.87 13.1801C14.64 13.1001 14.48 13.0601 14.31 13.3001C14.14 13.5501 13.67 14.1101 13.53 14.2701C13.39 14.4401 13.24 14.4601 12.99 14.3301C12.74 14.2101 11.94 13.9401 11 13.1001C10.26 12.4401 9.76999 11.6301 9.61999 11.3801C9.47999 11.1301 9.59999 11.0001 9.72999 10.8701C9.83999 10.7601 9.97999 10.5801 10.1 10.4401C10.22 10.3001 10.27 10.1901 10.35 10.0301C10.43 9.86006 10.39 9.72006 10.33 9.60006C10.27 9.48006 9.76999 8.26006 9.56999 7.76006C9.36999 7.28006 9.15999 7.34006 9.00999 7.33006H8.52999C8.35999 7.33006 8.09999 7.39006 7.86999 7.64006C7.64999 7.89006 7.00999 8.49006 7.00999 9.71006C7.00999 10.9301 7.89999 12.1101 8.01999 12.2701C8.13999 12.4401 9.76999 14.9401 12.25 16.0101C12.84 16.2701 13.3 16.4201 13.66 16.5301C14.25 16.7201 14.79 16.6901 15.22 16.6301C15.7 16.5601 16.69 16.0301 16.89 15.4501C17.1 14.8701 17.1 14.3801 17.03 14.2701C16.96 14.1601 16.81 14.1101 16.56 13.9901Z"
              fill="black"
            />
          </svg>
          <p class="font-bold text-black">Consulta por WhatsApp</p>
        </a>

        <div
          class="p-4 rounded-lg dark:bg-slate-800 bg-[#fff] container-box w-full shadow-xl card-body"
        >
          <section class="flex flex-row gap-2 w-full">
            <svg
              width="25"
              height="25"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.375 36.8438V33.75H12.9375L14.625 30.6562L40.5 28.125L45 11.25H10.4063L8.4375 2.8125H0V5.625H6.1875L12.0938 29.25L8.4375 36.5625V40.7812C8.4375 43.0313 10.4062 45 12.6562 45C14.9063 45 16.875 43.0313 16.875 40.7812C16.875 38.5312 14.9063 36.5625 12.6562 36.5625H33.75V40.7812C33.75 43.0313 35.7187 45 37.9688 45C40.2188 45 42.1875 43.0313 42.1875 40.7812C42.1875 38.8125 41.0625 37.4063 39.375 36.8438Z"
                fill="white"
                class="fill-slate-800 dark:fill-white"
              />
            </svg>

            <p class="font-bold text-lg">Agregar al cotizador</p>
          </section>
          <article class="w-full flex flex-col">
            <div class="label">
              <span class="label-text text-sm">Presentacion</span>
            </div>
            <select
              class="select select-bordered w-full"
              id="presentation"
              v-model="presentationId"
            >
              <option disabled value="">Selecciona una opción</option>

              <option v-for="p in product?.presentacion" :value="p.id">
                {{ capitalizeText(p.value) }}
              </option>
            </select>
            <span
              v-if="errors.presentationId"
              class="text-red-500 font-bold text-xs py-2"
              >{{ errors.presentationId }}</span
            >
          </article>
          <div class="w-full flex flex-col">
            <div class="label">
              <span class="label-text text-sm">Medidas</span>
            </div>
            <select
              id="measure"
              class="select select-bordered w-full"
              v-model="measureId"
            >
              <option disabled value="">Selecciona una opción</option>
              <option v-for="p in product?.measures" :value="p.id">
                {{ capitalizeText(p?.name) }}
              </option>
            </select>
            <span
              v-if="errors.measureId"
              class="text-red-500 font-bold text-xs py-2"
              >{{ errors.measureId }}</span
            >
          </div>
          <div class="w-full flex flex-col">
            <div class="label">
              <span class="label-text">Colores</span>
            </div>
            <select
              id="colors"
              class="select select-bordered w-full"
              v-model="colorId"
            >
              <option disabled value="">Selecciona una opción</option>

              <option v-for="p in product?.colores" :value="p.id">
                {{ capitalizeText(p?.nombre) }}
              </option>
            </select>
            <span
              v-if="errors.colorId"
              class="text-red-500 font-bold text-xs py-2"
              >{{ errors.colorId }}</span
            >
          </div>
          <button
            @click="handleFormSubmit"
            class="btn btn-primary text-white mt-5"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.2857 27.7143H6V22.2857H22.2857V6H27.7143V22.2857H44V27.7143H27.7143V44H22.2857V27.7143Z"
                fill="white"
              />
            </svg>

            Agregar Producto
          </button>
        </div>
        <div class="mt-10">
          <p class="font-bold text-lg">Sobre este artículo</p>
          <p class="text-base">
            {{ product?.descripcion_larga }}
          </p>
        </div>
      </section>
    </div>
  </main>
  <ExploreProducts />
  <AboutUs />
</template>
