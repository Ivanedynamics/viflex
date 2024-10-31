<script lang="ts" setup>
const reviews = [
  {
    name: "Mariana L.",
    product: "Tela Mosquitera de Fibra de Vidrio",
    rating: 3,
    review:
      "¡Excelente! Instalada en todas las ventanas, apenas se nota y deja pasar el aire sin problemas. Muy fácil de limpiar y de buena calidad.",
  },
  {
    name: "Carlos G.",
    product: "Guardapolvo para Puertas",
    rating: 5,
    review:
      "Justo lo que necesitaba para evitar polvo y frío. Fácil de instalar, discreto y eficaz, especialmente en invierno. ¡Muy recomendable!",
  },
  {
    name: "Ana M.",
    product: "Riel Doblet Gasket para Cubetas",
    rating: 4,
    review:
      "Práctico y resistente, ideal para organizar cubetas en la oficina. Sella bien y evita derrames, aunque me gustaría más opciones de color.",
  },
  {
    name: "Javier S.",
    product: "Empaques de Vinil para Ventanas",
    rating: 5,
    review:
      "Hacen gran diferencia en temperatura y ruido. Sellan perfectamente y son de calidad. Llegaron bien protegidos. ¡Muy satisfecho!",
  },
];
</script>
<template>
  <section
    class="min-h-[320px] flex-col pt-10 flex items-center justify-center px-3 mt-20"
  >
    <div class="w-full max-w-[1240px] flex flex-col gap-4 items-center">
      <p class="font-bold text-2xl">Vea lo que dicen nuestros clientes</p>
      <ul
        class="flex flex-row gap-4 mobile_s:flex mobile_s:flex-col tablet:grid tablet:grid-cols-2 laptop:grid laptop:grid-cols-2 desktop:grid-cols-4"
      >
        <li v-for="item in reviews" :key="item.review">
          <div
            class="dark:bg-slate-800 bg-[#fff] rounded-lg shadow-xl p-4 gap-3 flex flex-col"
          >
            <div>
              <p class="text-base">
                <template v-for="kxd in item?.rating">⭐</template>
              </p>
              <p class="font-bold text-base">
                {{ item?.product }}
              </p>
            </div>
            <p class="italic text-sm">
              {{ item?.review }}
            </p>
            <p class="text-sm">
              {{ item?.name }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
