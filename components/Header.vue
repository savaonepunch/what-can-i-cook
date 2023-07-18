<template>
    <div class="h-8 fixed inset-0 bg-accent z-20"></div>
    <div class=" fixed inset-0 top-8 bg-white h-24 flex justify-center items-center z-20">
        <div class="flex items-center justify-between container">
            <div class="logo">
                <NuxtLink to="/">
                    <Icon name="streamline:food-kitchenware-chef-toque-hat-cook-gear-chef-cooking-nutrition-tools-clothes-hat-clothing-food"
                          color="black"
                          class=" text-2xl -translate-y-0.5 mr-2" />
                    <span class=" font-medium font-Roboto text-lg text-neutral-800">What Can I Cook?</span>
                </NuxtLink>
            </div>

            <div class="nav-links md:flex gap-6 font-medium hidden">
                <NuxtLink to="/"><span>Home</span></NuxtLink>
                <NuxtLink to="/favorites"><span>Favorites</span></NuxtLink>
                <div class="group relative cursor-pointer">
                    <span>Categories</span>
                    <div
                         class="bg-white hidden group-hover:flex rounded-md shadow-lg absolute flex-col left-1/2 -translate-x-1/2">
                        <div class="hover:bg-slate-100  border-b px-4 py-2  last-of-type:border-none first-of-type:border-top-none first-of-type:rounded-t-md"
                             v-for="category in categories"
                             @click="$router.push(`/categories/${category?.strCategory.toLowerCase()}`)">
                            <span>
                                {{ category?.strCategory }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="group relative cursor-pointer">
                    <span>Areas</span>
                    <div
                         class=" max-h-80 overflow-auto bg-white hidden group-hover:flex rounded-md shadow-lg absolute flex-col left-1/2 -translate-x-1/2">
                        <div class="hover:bg-slate-100  border-b px-4 py-2  last-of-type:border-none first-of-type:border-top-none first-of-type:rounded-t-md"
                             v-for="area in areas"
                             @click="$router.push(`/areas/${area?.strArea.toLowerCase()}`)">
                            <span>
                                {{ area?.strArea }}
                            </span>
                        </div>
                    </div>
                </div>

                <NuxtLink v-if="!user"
                          to="/login"><span>Login</span></NuxtLink>
                <button v-else
                        @click="client.auth.signOut()"><span>Logout</span></button>
            </div>

            <div v-if="$route.name == 'home'"
                 class="search bg-slate-100 md:flex items-center justify-center px-4 py-2 rounded-full hidden border border-transparent focus-within:border-slate-300 hover:border-slate-300">
                <Icon class="mr-2"
                      name="ph:magnifying-glass"></Icon>
                <input v-model="searchInput"
                       @input="$emit('search', searchInput)"
                       placeholder="Search for any ingredient"
                       class="outline-none bg-transparent font-light text-zinc-900 text-sm w-44"
                       type="search">
            </div>

            <div @click="isMenuOpen = !isMenuOpen"
                 class="mobile-button md:hidden cursor-pointer">
                <Icon class=" text-3xl "
                      :name="!isMenuOpen ? 'charm:menu-hamburger' : 'fa6-solid:xmark'"></Icon>
            </div>

        </div>
    </div>
    <div v-if="isMenuOpen"
         class="overflow-auto menu-overlay fixed inset-0 top-32 bg-white flex flex-col items-center justify-center md:hidden z-50">

        <div class="nav-links flex flex-col text-center gap-8 mb-8 font-bold text-5xl">
            <NuxtLink to="/"><span>Home</span></NuxtLink>
            <NuxtLink to="/favorites"><span>Favorites</span></NuxtLink>

            <span class="cursor-pointer" @click="categoriesOpen = !categoriesOpen">Categories</span>
            <div v-if="categoriesOpen" class=" max-h-96 overflow-auto  group relative cursor-pointer">
                <div 
                     class=" border-2 bg-white flex rounded-md shadow-lg flex-col">
                    <div class="hover:bg-slate-100  border-b px-4 py-2  last-of-type:border-none first-of-type:border-top-none first-of-type:rounded-t-md"
                         v-for="category in categories"
                         @click="$router.push(`/categories/${category?.strCategory.toLowerCase()}`)">
                        <span>
                            {{ category?.strCategory }}
                        </span>
                    </div>
                </div>
            </div>

            <span class="cursor-pointer" @click="areasOpen = !areasOpen">Areas</span>
            <div v-if="areasOpen" class=" max-h-96 overflow-auto  group relative cursor-pointer">
                <div 
                     class=" border-2 bg-white flex rounded-md flex-col">
                    <div class="hover:bg-slate-100  border-b px-4 py-2  last-of-type:border-none first-of-type:border-top-none first-of-type:rounded-t-md"
                         v-for="area in areas"
                         @click="$router.push(`/areas/${area?.strArea.toLowerCase()}`)">
                        <span>
                            {{ area?.strArea }}
                        </span>
                    </div>
                </div>
            </div>

            <NuxtLink v-if="!user"
                      to="/login"><span>Login</span></NuxtLink>
            <button v-else
                    @click="client.auth.signOut()"><span>Logout</span>
            </button>
        </div>

        <div v-if="$route.name == 'home'"
             class="search bg-slate-200 flex items-center justify-center px-4 py-2 rounded-full focus-within:outline hover:outline outline-slate-300">
            <Icon class="mr-2"
                  name="ph:magnifying-glass"></Icon>
            <input v-model="searchInput"
                   @input="$emit('search', searchInput)"
                   placeholder="Search for any ingredient"
                   class="outline-none bg-transparent font-light text-zinc-900 text-sm w-44"
                   type="search">
        </div>
    </div>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

const categories = ref([]);
const areas = ref([]);

const areasOpen = ref(false);
const categoriesOpen = ref(false);

const { data: categoriesResponse } = await useAsyncData(() => {
    return $fetch('https://themealdb.com/api/json/v1/1/list.php?c=list');
});

const { data: areasResponse } = await useAsyncData(() => {
    return $fetch('https://themealdb.com/api/json/v1/1/list.php?a=list');
});


const isMenuOpen = ref(false);
const searchInput = ref(null);

defineEmits(['search'])

onMounted(() => {
    categories.value = categoriesResponse.value.meals;
    console.log(categories.value);

    areas.value = areasResponse.value.meals;
    console.log(areas.value);
})
</script>

<style scoped></style>