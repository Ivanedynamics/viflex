<script lang="ts" setup>
import { Entities, statesOfMexico } from "~/assets/mocks/statesMexico";
import { useCartStore } from "~/store/cart";
import { object, string } from "yup";
import axios from "axios";
import { useForm } from "vee-validate";
import LogoLink from "~/components/LogoLink.vue";
import { v4 as uuidv4 } from "uuid";

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

const createQuotation = async (values: Values) => {
  try {
    const response = await axios.post("/api/quotation/new", {
      ...values,
      products: products.value,
    });
  } catch (error) {}
};

const onSubmit = (values: Values) => {
  if (products.value?.length === 0) {
    alert(
      "Por favor, agrega al menos un producto antes de realizar la cotización."
    );
    return;
  }
  createQuotation(values);
  // store.handleReset();
};
const handleFormSubmit = () => {
  handleSubmit(onSubmit)();
};
</script>

<template>
  <main class="w-full h-full flex items-center justify-center px-4">
    <section
      class="max-w-[800px] w-full container-box shadow-lg mt-10 mb-10 rounded-lg h-fit"
    >
      <div class="justify-start items-start flex-col mt-12">
        <div class="w-full h-full flex flex-col items-center justify-center">
          <svg
            width="150"
            height="80"
            viewBox="0 0 571 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M135.807 1.16836C133.862 1.55781 130.751 3.89452 128.417 6.23124C124.917 10.1258 124.528 10.9047 124.528 16.7464C124.528 27.6511 131.14 33.8824 143.196 33.8824C155.252 33.8824 162.253 27.6511 162.253 17.1359C162.642 4.67343 149.807 -2.72617 135.807 1.16836Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M270.37 123.456H308.484V1.94726H270.37V123.456Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M0.0760307 7.39959C0.0760307 8.1785 10.9656 33.8824 24.1886 64.6491C37.4117 95.4158 47.9123 121.12 48.3012 121.899C48.6901 123.067 52.5793 123.456 62.3021 123.456H75.5251L77.0808 119.562C84.4701 101.258 120.25 8.56795 120.25 7.78905C120.25 7.01014 116.75 6.62069 107.416 6.62069H94.5818L89.137 20.641C86.0257 28.43 80.581 44.0081 76.6918 55.3022L69.3025 75.9432L66.969 68.5436C65.8023 64.6491 59.9686 49.071 54.1349 33.8824L43.6343 6.62069H21.4662C4.35407 6.23124 -0.701795 6.62069 0.0760307 7.39959Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M177.809 123.067H220.201V73.6065H254.036V51.4077H220.59V27.2617L259.092 26.4828L259.481 21.8093C259.87 19.0832 260.648 14.4097 261.037 11.2941L261.425 6.23124H177.809V123.067Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M349.32 40.8925C331.819 46.3448 321.318 58.0284 318.985 75.1643C317.818 83.3428 319.373 95.0264 322.096 101.647C327.152 112.162 339.597 121.12 353.598 124.235C361.765 125.793 379.266 125.793 387.433 123.846C394.045 122.288 406.49 116.836 407.657 114.888C408.046 114.499 407.268 110.215 406.101 105.542L403.768 97.3631L395.989 100.868C386.655 105.542 374.21 106.71 368.376 103.984C363.321 101.258 360.209 97.3631 359.431 92.6897L358.654 88.4057L410.768 87.6268V76.7221C410.768 66.2069 410.379 65.0385 407.268 58.4179C402.99 50.2394 397.156 44.787 388.6 41.6714C380.044 38.5558 358.265 38.1663 349.32 40.8925ZM373.432 56.86C375.377 58.4178 376.155 59.9757 376.544 65.8174L376.933 72.8276H359.043L359.431 65.8174C359.82 58.0284 362.543 54.9128 367.988 54.9128C369.543 54.5233 372.266 55.6917 373.432 56.86Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M123.361 81.785V123.456H162.642V40.1136H123.75L123.361 81.785Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M412.712 40.503C412.712 40.8925 419.713 50.6288 427.88 62.7018L443.048 84.5112L440.714 87.6268C439.159 89.574 432.547 98.142 425.936 106.71L413.879 122.677L425.547 123.067C431.769 123.067 437.992 123.067 438.381 122.677C439.159 122.288 443.048 117.615 446.937 112.162C451.215 106.71 454.715 102.037 455.104 102.037C455.493 102.037 458.993 106.71 463.271 112.552L470.66 123.067H492.44C509.552 123.067 514.219 122.677 513.441 121.509C513.052 120.73 506.44 111.383 499.051 100.868C491.662 89.9635 485.05 80.6166 484.661 79.8377C484.272 79.0588 488.55 72.0487 497.884 59.9757C505.663 49.8499 512.274 40.8925 512.274 40.503C512.274 39.7241 507.607 39.3347 500.218 39.3347H487.773L480.383 49.8499C476.105 55.6917 472.605 60.3651 471.827 60.3651C471.438 60.3651 467.549 55.6917 463.66 49.8499L456.271 39.3347H434.492C422.046 40.1136 412.712 40.1136 412.712 40.503Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M3.18733 136.698H9.40994L27.6888 184.211L45.5788 136.698H52.1903L30.4112 190.442H24.9664L3.18733 136.698Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M56.4684 153.834H61.5243V190.832H56.4684V153.834ZM59.1908 138.256C60.3575 138.256 61.1353 138.645 61.5243 139.034C62.3021 139.813 62.691 140.592 62.691 141.761C62.691 142.929 62.3021 143.708 61.9132 144.487C61.1353 145.266 60.3575 145.266 59.1908 145.266C58.024 145.266 57.2462 144.876 56.8573 144.097C56.0795 143.318 56.0795 142.54 56.0795 141.371C56.0795 139.813 56.4684 139.034 57.2462 138.256C57.2462 138.256 58.024 138.256 59.1908 138.256Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M102.36 165.907V190.442H97.3042V166.296C97.3042 163.57 96.5264 161.623 94.5818 160.065C92.6373 158.507 90.3038 157.339 87.5814 157.339C84.0812 157.339 80.9699 158.897 78.2475 161.623C75.5251 164.738 74.3584 167.854 74.3584 171.359V190.442H69.6914V153.444H73.9695L74.3584 160.454C75.5251 158.507 77.0808 156.949 78.6364 155.781C81.3588 153.834 84.4701 152.665 87.9703 152.665C91.8594 152.665 95.3597 153.834 98.0821 156.17C101.193 158.897 102.36 162.012 102.36 165.907Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M110.138 153.834H115.194V190.832H110.138V153.834ZM112.861 138.256C114.027 138.256 114.805 138.645 115.194 139.034C115.972 139.813 116.361 140.592 116.361 141.761C116.361 142.929 115.972 143.708 115.583 144.487C114.805 145.266 114.027 145.266 112.861 145.266C111.694 145.266 110.916 144.876 110.527 144.097C109.749 143.318 109.749 142.54 109.749 141.371C109.749 139.813 110.138 139.034 110.916 138.256C111.305 138.256 112.083 138.256 112.861 138.256Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M128.417 136.698H123.361V190.832H128.417V136.698Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M154.085 191.611C149.03 191.611 145.141 190.053 141.251 186.548C137.362 183.043 135.418 178.369 135.418 172.527C135.418 167.075 136.973 162.402 140.474 158.897C143.974 155.002 148.252 153.444 153.697 153.444C158.752 153.444 163.03 155.391 166.92 158.897C170.42 162.402 171.975 167.075 171.975 172.527C171.975 178.369 170.031 183.043 166.142 186.548C163.03 189.663 158.752 191.611 154.085 191.611ZM153.697 186.937C157.197 186.937 160.308 185.379 162.642 182.653C165.364 179.927 166.531 176.422 166.531 172.138C166.531 167.854 164.975 163.959 162.253 161.233C159.919 158.507 156.808 157.339 153.697 157.339C150.196 157.339 147.474 158.507 145.14 161.233C142.418 164.349 141.251 167.854 141.251 172.138C141.251 176.422 142.418 179.927 145.14 183.043C147.474 185.769 150.196 186.937 153.697 186.937Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M178.587 187.327V181.485C181.698 183.822 184.421 185.379 187.532 186.158C188.31 186.548 189.477 186.548 190.254 186.548C191.032 186.548 191.81 186.548 192.977 186.548C195.699 186.548 198.422 185.769 199.977 184.6C201.922 183.043 202.7 181.874 202.7 179.927C202.7 179.148 202.311 177.98 201.533 177.201C200.366 176.032 198.033 174.864 193.755 174.085C188.699 172.917 185.199 171.748 183.643 170.97C180.143 169.022 178.587 166.686 178.587 163.181C178.587 160.065 180.143 157.728 182.865 155.781C185.587 153.834 189.088 152.665 193.366 152.665C195.31 152.665 196.866 152.665 198.422 153.055C199.977 153.444 201.533 153.834 202.7 154.223C203.866 154.613 205.422 155.391 206.2 156.17V162.012C204.255 160.454 202.311 159.286 199.977 158.118C197.644 157.339 195.699 156.56 192.977 156.56C190.643 156.56 188.31 156.949 186.754 158.118C184.81 159.286 184.032 160.454 184.032 162.402C184.032 164.738 185.976 166.296 190.254 167.854C192.199 168.243 194.144 169.022 196.088 169.412C198.033 169.801 199.977 170.58 201.922 170.97C206.2 172.917 208.533 175.643 208.533 179.148C208.533 182.264 206.978 184.99 204.255 187.327C201.144 189.663 197.644 190.832 192.977 190.832C191.032 190.832 189.088 190.442 187.143 190.053C184.032 190.053 181.309 188.884 178.587 187.327Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M240.424 136.698H275.037V141.371H245.869V161.233H273.482V165.907H245.869V190.832H240.424V136.698Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M287.483 136.698H282.427V190.832H287.483V136.698Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M329.096 170.58H300.317C300.317 176.032 301.483 179.927 304.206 182.653C306.539 185.379 310.039 186.937 314.318 186.937C317.429 186.937 320.54 186.158 323.263 184.211C324.04 183.822 324.818 183.043 325.985 182.264C326.763 181.485 327.93 180.706 328.707 179.538V185.379C327.541 186.158 326.374 186.937 325.596 187.716C324.818 188.495 323.651 188.884 322.874 189.274C319.762 190.832 317.04 191.611 313.929 191.611C308.873 191.611 304.595 190.053 300.706 186.548C296.816 183.043 294.872 178.369 294.872 172.527C294.872 167.075 296.428 162.402 299.928 158.897C303.428 155.002 307.706 153.444 313.151 153.444C318.207 153.444 322.096 155.391 325.207 158.897C327.929 161.623 329.096 165.517 329.096 170.58ZM301.095 166.296H323.263C322.874 163.181 321.318 160.844 319.762 159.286C317.818 157.728 315.484 156.949 313.151 156.949C310.04 156.949 307.706 157.728 305.761 159.675C303.428 161.623 301.872 163.57 301.095 166.296Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M336.874 153.834H343.097L352.042 167.465L361.376 153.834H367.21L354.764 170.97L368.765 190.832H362.154L351.653 174.475L340.764 190.832H334.93L348.931 170.97L336.874 153.834Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M375.766 153.834H380.822V190.832H375.766V153.834ZM378.099 138.256C379.266 138.256 380.044 138.645 380.433 139.034C381.211 139.813 381.599 140.592 381.599 141.761C381.599 142.929 381.211 143.708 380.822 144.487C380.044 145.266 379.266 145.266 378.099 145.266C376.933 145.266 376.155 144.876 375.766 144.097C374.988 143.318 374.988 142.54 374.988 141.371C374.988 139.813 375.377 139.034 376.155 138.256C376.544 138.256 377.321 138.256 378.099 138.256Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M388.6 136.698H393.656V160.065C394.434 159.286 394.822 158.118 395.6 157.728C396.378 156.949 396.767 156.56 397.545 155.781C399.878 153.834 402.99 153.055 406.101 153.055C411.157 153.055 415.046 155.002 418.157 158.507C421.269 162.012 423.213 166.686 423.213 171.748C423.213 177.201 421.657 181.874 418.157 185.379C414.657 189.274 410.379 191.611 404.934 191.611C402.212 191.611 399.489 190.832 397.545 189.663C395.989 188.884 394.822 187.716 393.656 186.548L392.489 190.832H388.6V136.698ZM394.045 170.58V181.095C394.822 181.874 395.211 182.653 395.989 183.043C396.767 183.822 397.156 184.211 397.934 184.6C399.878 186.158 402.212 186.548 404.934 186.548C408.434 186.548 411.546 184.99 413.879 182.264C416.213 179.148 417.379 175.643 417.379 171.359C417.379 167.075 416.213 163.181 413.49 160.454C411.157 158.118 408.434 156.949 405.712 156.949C402.601 156.949 399.878 158.118 397.545 160.844C395.211 163.959 394.045 167.075 394.045 170.58Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M434.881 136.698H429.825V190.832H434.881V136.698Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M476.494 170.58H447.715C447.715 176.032 448.881 179.927 451.604 182.653C453.937 185.379 457.437 186.937 461.716 186.937C464.827 186.937 467.938 186.158 470.661 184.211C471.438 183.822 472.216 183.043 473.383 182.264C474.161 181.485 475.327 180.706 476.105 179.538V185.379C474.939 186.158 473.772 186.937 472.994 187.716C472.216 188.495 471.049 188.884 470.272 189.274C467.16 190.832 464.438 191.611 461.327 191.611C456.271 191.611 451.993 190.053 448.104 186.548C444.214 183.043 442.27 178.369 442.27 172.527C442.27 167.075 443.826 162.402 447.326 158.897C450.826 155.002 455.104 153.444 460.549 153.444C465.605 153.444 469.494 155.391 472.605 158.897C475.327 161.623 476.494 165.517 476.494 170.58ZM448.492 166.296H470.661C470.272 163.181 468.716 160.844 467.16 159.286C465.216 157.728 462.882 156.949 460.549 156.949C457.437 156.949 455.104 157.728 453.159 159.675C450.826 161.623 449.27 163.57 448.492 166.296Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M482.717 187.327V181.485C485.828 183.822 488.55 185.379 491.662 186.158C492.44 186.548 493.606 186.548 494.384 186.548C495.162 186.548 495.94 186.548 497.107 186.548C499.829 186.548 502.551 185.769 504.107 184.6C506.052 183.043 506.829 181.874 506.829 179.927C506.829 179.148 506.44 177.98 505.663 177.201C504.496 176.032 502.162 174.864 497.884 174.085C492.829 172.917 489.328 171.748 487.773 170.97C484.272 169.022 482.717 166.686 482.717 163.181C482.717 160.065 484.272 157.728 486.995 155.781C489.717 153.834 493.217 152.665 497.496 152.665C499.44 152.665 500.996 152.665 502.551 153.055C504.107 153.444 505.663 153.834 506.829 154.223C507.996 154.613 509.552 155.391 510.33 156.17V162.012C508.385 160.454 506.44 159.286 504.107 158.118C501.774 157.339 499.829 156.56 497.107 156.56C494.773 156.56 492.44 156.949 490.884 158.118C488.939 159.286 488.162 160.454 488.162 162.402C488.162 164.738 490.106 166.296 494.384 167.854C496.329 168.243 498.273 169.022 500.218 169.412C502.162 169.801 504.107 170.58 506.052 170.97C510.33 172.917 512.663 175.643 512.663 179.148C512.663 182.264 511.107 184.99 508.385 187.327C505.274 189.663 501.774 190.832 497.107 190.832C495.162 190.832 493.217 190.442 491.273 190.053C488.55 190.053 485.439 188.884 482.717 187.327Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M513.052 128.13H2.79842V133.582H513.052V128.13Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M571 0H523.553V192H571V0Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M571 91.5213H523.553V192H571V91.5213Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M571 102.426H523.553V192H571V102.426Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M571 112.941H523.553V192H571V112.941Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M571 123.067H523.553V192H571V123.067Z"
              fill="black"
              class="icon-fill"
            />
            <path
              d="M571 133.582H523.553V192H571V133.582Z"
              fill="black"
              class="icon-fill"
            />
          </svg>
          <P class="font-bold text-xl uppercase"> información DE cotización </P>
        </div>
      </div>

      <div
        class="flex flex-col gap-12 p-8 mobile_s:gap-6 mobile_s:p-4 tablet:p-6 laptop:p-8"
      >
        <section
          class="grid grid-cols-2 gap-8 mobile_s:flex mobile_s:flex-col mobile_s:gap-3 tablet:grid-cols-2 tablet:grid"
        >
          <article>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Nombre Completo</span>
              </div>
              <input
                type="text"
                v-model="fullName"
                placeholder="Escribe tu nombre completo"
                class="input input-bordered w-full"
              />
            </label>
            <p
              v-if="errors?.fullName"
              class="text-red-600 font-bold text-xs mt-2"
            >
              {{ errors?.fullName }}
            </p>
          </article>
          <articel>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Correo electrónico</span>
              </div>
              <input
                type="email"
                v-model="email"
                placeholder="Escribe tu correo electrónico"
                class="input input-bordered w-full"
              />
            </label>
            <p v-if="errors?.email" class="text-red-600 font-bold text-xs mt-2">
              {{ errors?.email }}
            </p>
          </articel>
          <article>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Teléfono</span>
              </div>
              <input
                type="text"
                v-model="phone"
                placeholder="Escribe tu número de telefono"
                class="input input-bordered w-full"
              />
            </label>
            <p v-if="errors?.phone" class="text-red-600 font-bold text-xs mt-2">
              {{ errors?.phone }}
            </p>
          </article>
          <article>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Dirección</span>
              </div>
              <input
                type="text"
                v-model="address"
                placeholder="Escribe tu dirección"
                class="input input-bordered w-full"
              />
            </label>
            <p
              v-if="errors?.address"
              class="text-red-600 font-bold text-xs mt-2"
            >
              {{ errors?.address }}
            </p>
          </article>
          <article>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Estado</span>
              </div>
              <select class="select select-bordered" v-model="state">
                <option disabled selected value="">
                  Selecciona una opcion
                </option>
                <option v-for="state in statesOfMexico" :value="state?.slug">
                  <p>{{ state?.name }}</p>
                </option>
              </select>
            </label>

            <p v-if="errors?.state" class="text-red-600 font-bold text-xs mt-2">
              {{ errors?.state }}
            </p>
          </article>
          <article>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Entidad</span>
              </div>
              <select class="select select-bordered" v-model="entity">
                <option disabled selected value="">
                  Selecciona una opcion
                </option>
                <option v-for="state in Entities" :value="state">
                  <p>{{ state }}</p>
                </option>
              </select>
            </label>
            <p
              v-if="errors?.entity"
              class="text-red-600 font-bold text-xs mt-2"
            >
              {{ errors?.entity }}
            </p>
          </article>
        </section>
        <section>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Comentario</span>
            </div>
            <textarea
              v-model="comment"
              id="comment"
              class="textarea textarea-bordered textarea-lg w-full"
            ></textarea>
          </label>
        </section>
        <section class="mt-4">
          <ul class="flex flex-col overflow-y-scroll h-full gap-4">
            <li v-for="p in products">
              <CardCartModal
                :key="p?.id"
                :product="p?.product"
                :quantity="p?.quantity"
                :selection="p?.selection"
                @decrease="() => store.decreaseProduct(p?.id)"
                @increment="() => store.incrementProduct(p?.id)"
                @delete="(e) => store.deleteProduct(p?.id)"
              />
            </li>
          </ul>
          <!-- <table v-if="products?.length !== 0">
            <tr>
              <th>Productos</th>
              <th>Presentación</th>
              <th>Medida</th>
              <th>Color</th>
              <th>Cantidad</th>
              <th>--</th>
            </tr>
            <tr v-for="product in products" :key="product?.id">
              <td>
                <NuxtLink :to="`/productos/${product?.product?.id}`">
                  <p class="text-sm">
                    {{ capitalizeText(product?.product?.name) }}
                  </p>
                </NuxtLink>
              </td>
              <td
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
                ]"
              >
                <p class="text text-sm">
                  {{ capitalizeText(item?.value) }}
                </p>
              </td>
              <td>
                <div class="grid grid-cols-3">
                  <button
                    type="button"
                    @click="store.decreaseProduct(product?.id)"
                    :class="'btn btn-ghost'"
                  >
                    -
                  </button>
                  <div class="flex items-center justify-center">
                    <p class="text text-sm">
                      {{ capitalizeText(`${product?.quantity}`) }}
                    </p>
                  </div>
                  <button
                    type="button"
                    @click="store.incrementProduct(product?.id)"
                    :class="'btn btn-ghost'"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
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
              </td>
            </tr>
          </table> -->
        </section>
        <span
          v-if="products?.length === 0"
          class="text-red-600 font-bold text-xs mt-2"
        >
          Por favor, agrega al menos un producto antes de realizar la
          cotización.</span
        >
        <footer class="flex justify-end mt-4">
          <button
            v-if="products?.length !== 0"
            :disabled="products?.length === 0"
            @click="handleFormSubmit"
            :class="`btn btn-neutral`"
          >
            Enviar Cotizacion
          </button>
          <NuxtLink v-else to="/productos" class="btn btn-neutral"
            >Agregar Productos
          </NuxtLink>
        </footer>
      </div>
    </section>
  </main>
  <AboutUs />
  <!-- <Contact /> -->
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
