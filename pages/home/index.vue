<template>
    <Header @search="(input) => searchInput = input" />
    <!-- <Breadcrumbs/> -->
    <div v-if="recipes && recipes.length"
         class="section mt-32 mb-8">
        <div class="container justify-center items-center flex flex-wrap flex-row gap-8 ">
            <RecipeCard v-for="recipe in recipes"
                        :id="+recipe.idMeal"
                        :name="recipe.strMeal"
                        :image="recipe.strMealThumb" />
        </div>
    </div>
    <div v-else
         class="flex flex-col justify-center min-h-screen section">
        <div class="container">
            <div class="flex flex-col gap-4 max-w-[600px]">
                <h1 class="text-3xl xs:text-5xl sm:text-6xl font-bold">Your Pantry, Endless Possibilities</h1>
                <p class=" text-gray-800 fontme max-w-[500px]">Search for any ingredient. Discover a variety of recipes. Transform every meal into a
                    gastronomic adventure.
                </p>
                <button @click="$router.push(`/ingredients`)"
                    class=" whitespace-nowrap mr-auto bg-accent py-2 px-8 rounded-full text-white">View Ingredients
                </button>
                <div class="flex items-center gap-2">
                    <div class="text-[12px] w-fit py-1 px-2 grid place-content-center rounded-full text-accent bg-white shadow-xl shadow-slate-300">
                        <span>NEW!</span>
                    </div>
                    <p class=" text-gray-800 fontme max-w-[500px]">You can now <NuxtLink to="/upload"><span class="text-accent cursor-pointer hover:underline">upload</span></NuxtLink> your own recipes!
                </p>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const user = useSupabaseUser();

const searchInput = ref(null);

const { data: response, pending, refresh } = await useAsyncData(() => {
    if (!searchInput.value) return;
    console.log(searchInput.value);
    return $fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value}`);
});
const recipes = ref([]);

const debouncedSearchMeals = useDebounce(async () => {
    if (!searchInput.value) return;
    await refresh();
    console.log(response.value);
    recipes.value = response.value.meals;
    console.log(recipes.value);
}, 500);

watch(searchInput, debouncedSearchMeals);

onMounted(() => {
    console.log(user.value);
});
</script>

<style scoped></style>