<!-- <script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

const searchTerm = ref('');
let products = reactive([])
let categories = reactive([])
let searchIsLoading = ref(false)

const search = async () => {
  searchIsLoading.value = true
  const { data, pending, error } = await useFetch('/api/search',
      {
        method: 'post',
        body: {search: searchTerm.value},
      }
  )
  products.push(data.value.products)
  categories.push(data.value.categories)
  searchIsLoading.value = false
}

watchDebounced(searchTerm, search, { debounce: 1000 })



</script>

<template>

      <div>
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search" v-if="!searchIsLoading"/>
            <i class="pi pi-spin pi-spinner" v-else/>
            <InputText v-model="searchTerm" placeholder="Busqueda" class="w-full" />
          </span>
      </div>

      <div class="pt-4" v-if="products.length > 0">

      </div>

</template> -->
