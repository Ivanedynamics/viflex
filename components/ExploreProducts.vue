<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import type { IFrontProduct } from "~/types/front";

const { data: products } = await useFetch<{ products: IFrontProduct[] }>(
  "/api/products"
);
const { setProduct, existThisProductInCart } = useCartStore();

const router = useRouter();
</script>

<template>
  <section
    class="min-h-[320px] flex-col pt-10 flex items-center justify-center px-3"
  >
    <div class="w-full max-w-[1240px] flex flex-col gap-4">
      <header>
        <h2 class="font-bold text-3xl">Nuestros productos más cotizados</h2>
        <p class="opacity-70 text-lg">
          Encuentre los productos perfectos para sus necesidades.
        </p>
      </header>

      <div
        class="w-full grid grid-cols-4 gap-8 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-[700px]:grid-cols-1"
      >
        <template v-for="p in products?.products">
          <Card
            :id="`${p?.id}`"
            :exist-this-product-in-cart="existThisProductInCart(p?.id)"
            :name="p?.name"
            :description="p?.descripcion"
            :images="p?.images ?? []"
            :colors="p?.color"
            @add_cart="() => {}"
            @buynow="() => router.push(`/productos/${p?.id}`)"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-products {
  display: grid;
  grid-template-columns: repeat(1fr, 4);
}
</style>
