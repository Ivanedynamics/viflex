<script lang="ts" setup>
import { Entities, statesOfMexico } from "~/assets/mocks/statesMexico";
import { useCartStore } from "~/store/cart";
import { object, string } from "yup";

import { useForm } from "vee-validate";

const store = useCartStore();
const { products } = toRefs(store);

const { errors, handleSubmit, defineField, handleReset } = useForm({
  initialValues: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    entity: "",
    comment: "",
  },
  validationSchema: object({
    fullName: string().required("El campo 'Nombre Completo' es obligatorio."),
    email: string()
      .email("El Correo electrónico no es valido")
      .required("El campo 'Correo electrónico' es obligatorio."),
    phone: string().required("El campo 'Teléfono' es obligatorio."),
    address: string().required("El campo 'Dirección' es obligatorio."),
    state: string().required("El campo 'Estado' es obligatorio."),
    entity: string().required("El campo 'Entidad' es obligatorio."),
    comment: string(),
  }),
  initialTouched: {
    fullName: false,
    email: false,
    phone: false,
    address: false,
    state: false,
    entity: false,
    comment: false,
  },
});
const [fullName] = defineField("fullName");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [address] = defineField("address");
const [state] = defineField("state");
const [entity] = defineField("entity");
const [comment] = defineField("comment");

type Values = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  entity: string;
  comment: string;
};

const onSubmit = (values: Values) => {
  if (products.value?.length === 0) {
    alert(
      "Por favor, agrega al menos un producto antes de realizar la cotización."
    );
    return;
  }

  store.handleReset();
};
const handleFormSubmit = () => {
  handleSubmit(onSubmit)();
};
</script>

<template>
  <main class="w-full h-full flex items-center justify-center">
    <section
      class="max-w-[800px] w-full bg-white mt-10 mb-10 border rounded-lg h-fit p-6"
    >
      <header class="flex justify-center items-center mt-10 flex-col">
        <div class="w-full flex justify-center items-center mb-10">
          <svg
            baseProfile="tiny"
            class="brand mt-2"
            version="1.1"
            viewBox="0 0 149.4 52.4"
            width="90"
            x="0px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:serif="http://www.serif.com/"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            y="0px"
          >
            <path
              d="M35.8,1.7c-0.5,0.1-1.3,0.7-1.9,1.3c-0.9,1-1,1.2-1,2.7c0,2.8,1.7,4.4,4.8,4.4c3.1,0,4.9-1.6,4.9-4.3 C42.7,2.6,39.4,0.7,35.8,1.7L35.8,1.7z"
              fill="black"
            ></path>
            <path
              d="M70.4,17.5v15.6h9.8V1.9h-4.9h-4.9C70.4,1.9,70.4,17.5,70.4,17.5z"
              fill="black"
            ></path>
            <path
              d="M0.9,3.3C0.9,3.5,3.7,10.1,7.1,18c3.4,7.9,6.1,14.5,6.2,14.7c0.1,0.3,1.1,0.4,3.6,0.4h3.4l0.4-1 c1.9-4.7,11.1-28.5,11.1-28.7c0-0.2-0.9-0.3-3.3-0.3h-3.3l-1.4,3.6c-0.8,2-2.2,6-3.2,8.9l-1.9,5.3l-0.6-1.9c-0.3-1-1.8-5-3.3-8.9 l-2.7-7H6.4C2,3,0.7,3.1,0.9,3.3L0.9,3.3z"
              fill="black"
            ></path>
            <path
              d="M46.6,18v15h10.9V20.3h8.7v-5.7h-4.3h-4.3V8.4l4.9-0.1l5-0.1L67.6,7c0.1-0.7,0.3-1.9,0.4-2.7L68.1,3H57.4 H46.6V18L46.6,18z"
              fill="black"
            ></path>
            <path
              d="M90.7,11.9c-4.5,1.4-7.2,4.4-7.8,8.8c-0.3,2.1,0.1,5.1,0.8,6.8c1.3,2.7,4.5,5,8.1,5.8 c2.1,0.4,6.6,0.4,8.7-0.1c1.7-0.4,4.9-1.8,5.2-2.3c0.1-0.1-0.1-1.2-0.4-2.4l-0.6-2.1l-2,0.9c-2.4,1.2-5.6,1.5-7.1,0.8 c-1.3-0.7-2.1-1.7-2.3-2.9l-0.2-1.1l6.7-0.1l6.7-0.1v-2.8c0-2.7-0.1-3-0.9-4.7c-1.1-2.1-2.6-3.5-4.8-4.3 C98.6,11.3,93,11.2,90.7,11.9L90.7,11.9z M96.9,16c0.5,0.4,0.7,0.8,0.8,2.3l0.1,1.8h-2.3h-2.3l0.1-1.8c0.1-2,0.8-2.8,2.2-2.8 C95.9,15.4,96.6,15.7,96.9,16z"
              fill="black"
            ></path>
            <path
              d="M32.6,22.4v10.7h10.1V11.7h-5h-5L32.6,22.4L32.6,22.4z"
              fill="black"
            ></path>
            <path
              d="M107,11.8c0,0.1,1.8,2.6,3.9,5.7l3.9,5.6l-0.6,0.8c-0.4,0.5-2.1,2.7-3.8,4.9l-3.1,4.1l3,0.1 c1.6,0,3.2,0,3.3-0.1c0.2-0.1,1.2-1.3,2.2-2.7c1.1-1.4,2-2.6,2.1-2.6c0.1,0,1,1.2,2.1,2.7l1.9,2.7h5.6c4.4,0,5.6-0.1,5.4-0.4 c-0.1-0.2-1.8-2.6-3.7-5.3c-1.9-2.8-3.6-5.2-3.7-5.4c-0.1-0.2,1-2,3.4-5.1c2-2.6,3.7-4.9,3.7-5c0-0.2-1.2-0.3-3.1-0.3l-3.2,0 l-1.9,2.7c-1.1,1.5-2,2.7-2.2,2.7c-0.1,0-1.1-1.2-2.1-2.7l-1.9-2.7h-5.6C109.4,11.7,107,11.7,107,11.8L107,11.8z"
              fill="black"
            ></path>
            <path
              d="M1.7,36.5h1.6L8,48.7l4.6-12.2h1.7L8.7,50.3H7.3C7.3,50.3,1.7,36.5,1.7,36.5z"
              fill="black"
            ></path>
            <path
              d="M15.4,40.9h1.3v9.5h-1.3V40.9z M16.1,36.9c0.3,0,0.5,0.1,0.6,0.2c0.2,0.2,0.3,0.4,0.3,0.7 c0,0.3-0.1,0.5-0.2,0.7c-0.2,0.2-0.4,0.2-0.7,0.2c-0.3,0-0.5-0.1-0.6-0.3c-0.2-0.2-0.2-0.4-0.2-0.7c0-0.4,0.1-0.6,0.3-0.8 C15.6,36.9,15.8,36.9,16.1,36.9L16.1,36.9z"
              fill="black"
            ></path>
            <path
              d="M27.2,44v6.3h-1.3v-6.2c0-0.7-0.2-1.2-0.7-1.6c-0.5-0.4-1.1-0.7-1.8-0.7c-0.9,0-1.7,0.4-2.4,1.1 c-0.7,0.8-1,1.6-1,2.5v4.9h-1.2v-9.5h1.1l0.1,1.8c0.3-0.5,0.7-0.9,1.1-1.2c0.7-0.5,1.5-0.8,2.4-0.8c1,0,1.9,0.3,2.6,0.9 C26.9,42.2,27.2,43,27.2,44L27.2,44z"
              fill="black"
            ></path>
            <path
              d="M29.2,40.9h1.3v9.5h-1.3V40.9z M29.9,36.9c0.3,0,0.5,0.1,0.6,0.2c0.2,0.2,0.3,0.4,0.3,0.7 c0,0.3-0.1,0.5-0.2,0.7c-0.2,0.2-0.4,0.2-0.7,0.2c-0.3,0-0.5-0.1-0.6-0.3c-0.2-0.2-0.2-0.4-0.2-0.7c0-0.4,0.1-0.6,0.3-0.8 C29.5,36.9,29.7,36.9,29.9,36.9L29.9,36.9z"
              fill="black"
            ></path>
            <rect
              fill="black"
              height="13.9"
              width="1.3"
              x="32.6"
              y="36.5"
            ></rect>
            <path
              d="M40.5,50.6c-1.3,0-2.3-0.4-3.3-1.3c-1-0.9-1.5-2.1-1.5-3.6c0-1.4,0.4-2.6,1.3-3.5c0.9-1,2-1.4,3.4-1.4 c1.3,0,2.4,0.5,3.4,1.4c0.9,0.9,1.3,2.1,1.3,3.5c0,1.5-0.5,2.7-1.5,3.6C42.8,50.1,41.7,50.6,40.5,50.6L40.5,50.6z M40.4,49.4 c0.9,0,1.7-0.4,2.3-1.1c0.7-0.7,1-1.6,1-2.7c0-1.1-0.4-2.1-1.1-2.8c-0.6-0.7-1.4-1-2.2-1c-0.9,0-1.6,0.3-2.2,1 c-0.7,0.8-1,1.7-1,2.8c0,1.1,0.3,2,1,2.8C38.8,49.1,39.5,49.4,40.4,49.4z"
              fill="black"
            ></path>
            <path
              d="M46.8,49.5V48c0.8,0.6,1.5,1,2.3,1.2c0.2,0.1,0.5,0.1,0.7,0.1c0.2,0,0.4,0,0.7,0c0.7,0,1.4-0.2,1.8-0.5 c0.5-0.4,0.7-0.7,0.7-1.2c0-0.2-0.1-0.5-0.3-0.7c-0.3-0.3-0.9-0.6-2-0.8c-1.3-0.3-2.2-0.6-2.6-0.8c-0.9-0.5-1.3-1.1-1.3-2 c0-0.8,0.4-1.4,1.1-1.9c0.7-0.5,1.6-0.8,2.7-0.8c0.5,0,0.9,0,1.3,0.1c0.4,0.1,0.8,0.2,1.1,0.3c0.3,0.1,0.7,0.3,0.9,0.5v1.5 c-0.5-0.4-1-0.7-1.6-1c-0.6-0.2-1.1-0.4-1.8-0.4c-0.6,0-1.2,0.1-1.6,0.4c-0.5,0.3-0.7,0.6-0.7,1.1c0,0.6,0.5,1,1.6,1.4 c0.5,0.1,1,0.3,1.5,0.4s1,0.3,1.5,0.4c1.1,0.5,1.7,1.2,1.7,2.1c0,0.8-0.4,1.5-1.1,2.1c-0.8,0.6-1.7,0.9-2.9,0.9 c-0.5,0-1-0.1-1.5-0.2C48.2,50.2,47.5,49.9,46.8,49.5L46.8,49.5z"
              fill="black"
            ></path>
            <path
              d="M62.7,36.5h8.9v1.2h-7.5v5.1h7.1V44h-7.1v6.4h-1.4V36.5z"
              fill="black"
            ></path>
            <rect
              fill="black"
              height="13.9"
              width="1.3"
              x="73.5"
              y="36.5"
            ></rect>
            <path
              d="M85.5,45.2h-7.4c0,1.4,0.3,2.4,1,3.1c0.6,0.7,1.5,1.1,2.6,1.1c0.8,0,1.6-0.2,2.3-0.7 c0.2-0.1,0.4-0.3,0.7-0.5c0.2-0.2,0.5-0.4,0.7-0.7V49c-0.3,0.2-0.6,0.4-0.8,0.6c-0.2,0.2-0.5,0.3-0.7,0.4 c-0.8,0.4-1.5,0.6-2.3,0.6c-1.3,0-2.4-0.4-3.4-1.3c-1-0.9-1.5-2.1-1.5-3.6c0-1.4,0.4-2.6,1.3-3.5c0.9-1,2-1.4,3.4-1.4 c1.3,0,2.3,0.5,3.1,1.4C85.2,42.9,85.5,43.9,85.5,45.2L85.5,45.2z M78.3,44.1H84c-0.1-0.8-0.5-1.4-0.9-1.8 c-0.5-0.4-1.1-0.6-1.7-0.6c-0.8,0-1.4,0.2-1.9,0.7C78.9,42.9,78.5,43.4,78.3,44.1L78.3,44.1z"
              fill="black"
            ></path>
            <path
              d="M87.5,40.9h1.6l2.3,3.5l2.4-3.5h1.5l-3.2,4.4l3.6,5.1h-1.7l-2.7-4.2l-2.8,4.2h-1.5l3.6-5.1L87.5,40.9z"
              fill="black"
            ></path>
            <path
              d="M97.5,40.9h1.3v9.5h-1.3V40.9z M98.1,36.9c0.3,0,0.5,0.1,0.6,0.2c0.2,0.2,0.3,0.4,0.3,0.7 c0,0.3-0.1,0.5-0.2,0.7c-0.2,0.2-0.4,0.2-0.7,0.2c-0.3,0-0.5-0.1-0.6-0.3c-0.2-0.2-0.2-0.4-0.2-0.7c0-0.4,0.1-0.6,0.3-0.8 C97.7,36.9,97.9,36.9,98.1,36.9L98.1,36.9z"
              fill="black"
            ></path>
            <path
              d="M100.8,36.5h1.3v6c0.2-0.2,0.3-0.5,0.5-0.6c0.2-0.2,0.3-0.3,0.5-0.5c0.6-0.5,1.4-0.7,2.2-0.7 c1.3,0,2.3,0.5,3.1,1.4c0.8,0.9,1.3,2.1,1.3,3.4c0,1.4-0.4,2.6-1.3,3.5c-0.9,1-2,1.6-3.4,1.6c-0.7,0-1.4-0.2-1.9-0.5 c-0.4-0.2-0.7-0.5-1-0.8l-0.3,1.1h-1L100.8,36.5L100.8,36.5z M102.2,45.2v2.7c0.2,0.2,0.3,0.4,0.5,0.5c0.2,0.2,0.3,0.3,0.5,0.4 c0.5,0.4,1.1,0.5,1.8,0.5c0.9,0,1.7-0.4,2.3-1.1c0.6-0.8,0.9-1.7,0.9-2.8c0-1.1-0.3-2.1-1-2.8c-0.6-0.6-1.3-0.9-2-0.9 c-0.8,0-1.5,0.3-2.1,1C102.5,43.5,102.2,44.3,102.2,45.2L102.2,45.2z"
              fill="black"
            ></path>
            <rect
              fill="black"
              height="13.9"
              width="1.3"
              x="111.4"
              y="36.5"
            ></rect>
            <path
              d="M123.4,45.2H116c0,1.4,0.3,2.4,1,3.1c0.6,0.7,1.5,1.1,2.6,1.1c0.8,0,1.6-0.2,2.3-0.7 c0.2-0.1,0.4-0.3,0.7-0.5c0.2-0.2,0.5-0.4,0.7-0.7V49c-0.3,0.2-0.6,0.4-0.8,0.6c-0.2,0.2-0.5,0.3-0.7,0.4 c-0.8,0.4-1.5,0.6-2.3,0.6c-1.3,0-2.4-0.4-3.4-1.3c-1-0.9-1.5-2.1-1.5-3.6c0-1.4,0.4-2.6,1.3-3.5c0.9-1,2-1.4,3.4-1.4 c1.3,0,2.3,0.5,3.1,1.4C123.1,42.9,123.4,43.9,123.4,45.2L123.4,45.2z M116.2,44.1h5.7c-0.1-0.8-0.5-1.4-0.9-1.8 c-0.5-0.4-1.1-0.6-1.7-0.6c-0.8,0-1.4,0.2-1.9,0.7C116.8,42.9,116.4,43.4,116.2,44.1L116.2,44.1z"
              fill="black"
            ></path>
            <path
              d="M125,49.5V48c0.8,0.6,1.5,1,2.3,1.2c0.2,0.1,0.5,0.1,0.7,0.1c0.2,0,0.4,0,0.7,0c0.7,0,1.4-0.2,1.8-0.5 c0.5-0.4,0.7-0.7,0.7-1.2c0-0.2-0.1-0.5-0.3-0.7c-0.3-0.3-0.9-0.6-2-0.8c-1.3-0.3-2.2-0.6-2.6-0.8c-0.9-0.5-1.3-1.1-1.3-2 c0-0.8,0.4-1.4,1.1-1.9c0.7-0.5,1.6-0.8,2.7-0.8c0.5,0,0.9,0,1.3,0.1c0.4,0.1,0.8,0.2,1.1,0.3s0.7,0.3,0.9,0.5v1.5 c-0.5-0.4-1-0.7-1.6-1c-0.6-0.2-1.1-0.4-1.8-0.4c-0.6,0-1.2,0.1-1.6,0.4c-0.5,0.3-0.7,0.6-0.7,1.1c0,0.6,0.5,1,1.6,1.4 c0.5,0.1,1,0.3,1.5,0.4c0.5,0.1,1,0.3,1.5,0.4c1.1,0.5,1.7,1.2,1.7,2.1c0,0.8-0.4,1.5-1.1,2.1c-0.8,0.6-1.7,0.9-2.9,0.9 c-0.5,0-1-0.1-1.5-0.2C126.5,50.2,125.7,49.9,125,49.5L125,49.5z"
              fill="black"
            ></path>
            <rect
              fill="black"
              height="1.4"
              width="131.2"
              x="1.6"
              y="34.3"
            ></rect>
            <rect
              fill="black"
              height="49.3"
              width="12.2"
              x="135.5"
              y="1.4"
            ></rect>
            <rect
              fill="black"
              height="25.8"
              width="12.2"
              x="135.5"
              y="24.9"
            ></rect>
            <rect
              fill="black"
              height="23"
              width="12.2"
              x="135.5"
              y="27.7"
            ></rect>
            <rect
              fill="black"
              height="20.3"
              width="12.2"
              x="135.5"
              y="30.4"
            ></rect>
            <rect
              fill="black"
              height="17.7"
              width="12.2"
              x="135.5"
              y="33"
            ></rect>
            <rect
              fill="black"
              height="15"
              width="12.2"
              x="135.5"
              y="35.7"
            ></rect>
          </svg>
        </div>
        <h1 class="font-bold text-2xl">Información de la cotización</h1>
      </header>
      <div class="flex flex-col gap-2 mt-4">
        <section class="grid grid-cols-2 gap-2">
          <article>
            <label for="fullname" class="text-sm font-bold"
              >Nombre Completo</label
            >
            <div class="p-2 bg-white border rounded-lg">
              <input
                type="text"
                v-model="fullName"
                class="w-full"
                placeholder="Escribe tu nombre completo"
              />
            </div>
            <p
              v-if="errors?.fullName"
              class="text-red-600 font-bold text-xs mt-2"
            >
              {{ errors?.fullName }}
            </p>
          </article>
          <articel>
            <label for="email" class="text-sm font-bold"
              >Correo electrónico</label
            >
            <div class="p-2 bg-white border rounded-lg">
              <input
                v-model="email"
                type="email"
                class="w-full"
                placeholder="Escribe tu correo electrónico"
              />
            </div>
            <p v-if="errors?.email" class="text-red-600 font-bold text-xs mt-2">
              {{ errors?.email }}
            </p>
          </articel>
          <article>
            <label for="phone" class="text-sm font-bold">Teléfono</label>
            <div class="p-2 bg-white border rounded-lg">
              <input
                id="phone"
                type="text"
                class="w-full"
                v-model="phone"
                placeholder="Escribe tu número de telefono"
              />
            </div>
            <p v-if="errors?.phone" class="text-red-600 font-bold text-xs mt-2">
              {{ errors?.phone }}
            </p>
          </article>
          <article>
            <label for="address" class="text-sm font-bold">Dirección </label>
            <div class="p-2 bg-white border rounded-lg">
              <input
                id="address"
                v-model="address"
                type="text"
                class="w-full"
                placeholder="Escribe tu dirección"
              />
            </div>
            <p
              v-if="errors?.address"
              class="text-red-600 font-bold text-xs mt-2"
            >
              {{ errors?.address }}
            </p>
          </article>
          <article>
            <label for="state" class="text-sm font-bold">Estado</label>
            <div class="p-2 bg-white border rounded-lg">
              <select id="state" class="w-full" v-model="state">
                <option value="" disabled selected>
                  Selecciona una opcion
                </option>
                <option v-for="state in statesOfMexico" :value="state?.slug">
                  <p>{{ state?.name }}</p>
                </option>
              </select>
            </div>
            <p v-if="errors?.state" class="text-red-600 font-bold text-xs mt-2">
              {{ errors?.state }}
            </p>
          </article>
          <article>
            <label for="entityType" class="text-sm font-bold">Entidad</label>
            <div class="p-2 bg-white border rounded-lg">
              <select class="w-full" v-model="entity">
                <option value="" disabled selected>
                  Selecciona una opcion
                </option>
                <option v-for="state in Entities" :value="state">
                  <p>{{ state }}</p>
                </option>
              </select>
            </div>
            <p
              v-if="errors?.entity"
              class="text-red-600 font-bold text-xs mt-2"
            >
              {{ errors?.entity }}
            </p>
          </article>
        </section>
        <section>
          <label for="comment" class="text-sm font-bold">Comentario </label>
          <div class="p-2 bg-white border rounded-lg">
            <textarea
              v-model="comment"
              id="comment"
              class="w-full resize-none min-h-[10rem]"
            ></textarea>
          </div>
        </section>
        <section class="mt-4">
          <p class="text-sm font-bold">Lista de Productos</p>
          <div
            v-if="products?.length === 0"
            class="bg-gray-100 p-2 min-h-[20rem] flex justify-center items-center flex-col gap-2 rounded-md"
          >
            <p>No tienes productos agregados.</p>
            <NuxtLink
              to="/productos"
              class="bg-primary hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
            >
              <p>Agregar Productos</p>
            </NuxtLink>
          </div>
          <ul
            class="flex flex-col gap-2 max-h-[30rem] overflow-y-scroll overflow-x-hidden"
          >
            <li
              v-for="product in products"
              :key="product?.id"
              class="flex flex-row gap-4 mt-5"
            >
              <figure class="w-[120px] bg-gray-200 rounded-md h-[100px]">
                <img
                  :src="product?.product?.images?.[0]?.image_url"
                  class="w-full h-full object-contain mix-blend-darken select-none"
                />
              </figure>
              <section class="w-full h-full flex flex-col">
                <NuxtLink :to="`/productos/${product?.product?.id}`">
                  <p
                    class="text font-bold text-md capitalize-text hover:underline"
                  >
                    {{ capitalizeText(product?.product?.name) }}
                  </p>
                </NuxtLink>
                <ul class="flex flex-col gap-1">
                  <li
                    v-for="item in [
                      {
                        id: 1,
                        label: 'Presentación',
                        value: product?.selection?.presentacion?.value,
                      },
                      {
                        id: 2,
                        label: 'Medida',
                        value: product?.selection?.medida?.name,
                      },
                      {
                        id: 3,
                        label: 'Color',
                        value: product?.selection?.color?.nombre,
                      },
                      {
                        id: 4,
                        label: 'Cantidad',
                        value: `${product?.quantity}`,
                      },
                    ]"
                  >
                    <p class="text text-sm">
                      <strong>{{ item?.label }}:</strong>
                      {{ capitalizeText(item?.value) }}
                    </p>
                  </li>
                </ul>
                <div class="flex flex-row w-full justify-between">
                  <div class="flex flex-row">
                    <button
                      type="button"
                      @click="store.decreaseProduct(product?.id)"
                      :class="'text-sm flex flex-row justify-center items-center gap-2   hover:bg-gray-200 text-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded'"
                    >
                      -
                    </button>
                    <div
                      :class="'text-sm flex flex-row justify-center items-center gap-2   font-semibold  py-2 px-4'"
                    >
                      <p class="p-0 line-height-1 m-0">
                        {{ product?.quantity }}
                      </p>
                    </div>
                    <button
                      type="button"
                      @click="store.incrementProduct(product?.id)"
                      :class="'text-sm flex flex-row justify-center items-center gap-2   hover:bg-gray-200 text-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded'"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="store.deleteProduct(product?.id)"
                    :class="'text-sm flex flex-row justify-center items-center gap-2   hover:bg-gray-200 text-black font-semibold  p-2  border border-white hover:border-transparent rounded'"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                        fill="red"
                      />
                    </svg>
                  </button>
                </div>
              </section>
            </li>
          </ul>
          <p
            v-if="products?.length === 0"
            class="text-red-600 font-bold text-xs mt-2"
          >
            Por favor, agrega al menos un producto antes de realizar la
            cotización.
          </p>
        </section>
        <footer class="flex justify-end mt-4">
          <button
            :disabled="products?.length === 0"
            @click="handleFormSubmit"
            :class="`w-fit text-sm flex flex-row justify-center items-center gap-2 bg-primary hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded`"
            :style="{
              backgroundColor: products?.length === 0 ? 'gray' : '',
            }"
          >
            Enviar Cotizacion
          </button>
        </footer>
      </div>
    </section>
  </main>
  <AboutUs />
  <Contact />
</template>
