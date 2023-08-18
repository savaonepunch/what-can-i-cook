<template>
    <Header />
    <Teleport to="body">
        <Modal @close-modal="isModalOpen = !isModalOpen"
               :state="modalState"
               :isOpen="isModalOpen">
            {{ modalMessage }}
        </Modal>
    </Teleport>
    <!-- <Breadcrumbs/> -->
    <template v-if="!pending">
        <section class="banner relative h-80 bg-cover mt-32 mb-8 bg- -z-10"
                 :style="{ background: 'url(' + recipe?.strMealThumb + ') no-repeat center', backgroundSize: 'cover' }">
            <div class="bg-black bg-opacity-30 absolute inset-0 grid place-content-center">
                <div class="container">
                    <h1 class=" text-center text-4xl font-bold text-white">{{ recipe?.strMeal }}</h1>
                </div>
            </div>

        </section>

        <section class="mb-8">
            <div class="container flex flex-col-reverse sm:flex-row gap-6">

                <div>
                    <h4 class=" font-medium mb-6">Instructions:</h4>
                    <p class=" whitespace-pre-wrap">
                        {{ recipe?.strInstructions }}
                    </p>

                    <button v-if="!pending && isFavorite != null"
                            @click="() => isFavorite ? removeFromFavorites() : addToFavorites()"
                            class=" mt-6 mr-auto py-2 px-8 rounded-full text-white"
                            :class="[`${isFavorite ? 'bg-red-600' : 'bg-accent'}`]">
                        {{ isFavorite ? 'Remove from favorites' : 'Add to favorites' }}
                    </button>
                </div>

                <div>
                    <div class="flex flex-row gap-2 items-center mb-5 ">
                        <h4 class=" font-medium">Category:</h4>
                        <NuxtLink :to="`/categories/${recipe?.strCategory.toLowerCase()}`"
                                  class="text-sm cursor-pointer bg-slate-200 rounded-full py-1 px-3 w-fit ">

                            {{ recipe?.strCategory }}

                        </NuxtLink>
                    </div>

                    <NuxtLink :to="`/areas/${recipe?.strArea.toLowerCase()}`"
                              class="flex flex-row gap-2 items-center mb-12 ">
                        <h4 class=" font-medium">Area:</h4>
                        <div class="text-sm cursor-pointer bg-slate-200 rounded-full py-1 px-3 w-fit ">

                            {{ recipe?.strArea }}

                        </div>
                    </NuxtLink>

                    <h4 class=" font-medium">Ingredients:</h4>
                    <ul class="list-disc ml-5 mt-6">
                        <li v-for="(ingredient, index) in ingredients">
                            {{
                                measurements[index] + " " + ingredient
                            }}
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    </template>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites';

const route = useRoute();
const router = useRouter();
const client = useSupabaseClient();
const user = useSupabaseUser();
const favoritesStore = useFavoritesStore();

const { data: response, pending, refresh } = await useAsyncData(() => {
    console.log(route.params.id);
    return $fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`);
});
const recipe = ref();
const ingredients = ref([]);
const measurements = ref([]);
const isFavorite = ref(null);
const isModalOpen = ref(false);
const modalState = ref(null);

const modalMessage = computed(() => {
    return modalState.value == 'success' ? 'Recipe added to favorites!' : modalState.value == 'errorDuplicate' ? 'Recipe already favorited' : 'You need to be logged in to add a favorite recipe!'
})

const getIngredientsAndMeasurements = () => {

    for (let i = 0; i < 20; i++) {
        const measurement = recipe.value[`strMeasure${i + 1}`];
        const ingredient = recipe.value[`strIngredient${i + 1}`];
        if (ingredient) ingredients.value.push(ingredient);
        if (measurement) measurements.value.push(measurement);
    }
}

const addToFavorites = async () => {

    if (!user.value) {
        modalState.value = 'errorNotLoggedIn';
        isModalOpen.value = true;
        return;
    }

    const { error } = await client.from('recipes').insert({
        recipe_id: recipe.value.idMeal,
        user: user.value.id,
        image_url: recipe.value.strMealThumb,
        name: recipe.value.strMeal,
        discord_id: user.value.identities[0].id,
        discord_username: user.value.identities[0].identity_data.name
    });

    console.log(error);

    if (error == null) {
        modalState.value = 'success';
        isFavorite.value = true;
        isModalOpen.value = true;
        console.log(modalState.value);
    }

    else if (error.code == 23505) {
        console.log("You already have this recipe in your favorties!");

        modalState.value = 'errorDuplicate';
        isModalOpen.value = true;
    }
}

const removeFromFavorites = async () => {

    const { error } = await client
        .from('recipes')
        .delete()
        .eq('recipe_id', recipe.value.idMeal)

    if (error) {
        console.log(error);
    }

    else {
        isFavorite.value = false;
    }
}

const checkIfFavorite = () => {
    console.log(favoritesStore.recipes);
    if (favoritesStore.recipes.filter((r) => r.recipe_id == recipe.value.idMeal).length) {
        isFavorite.value = true;
    }
    else isFavorite.value = false;
}

onMounted(() => {
    console.log("Store", favoritesStore.recipes);
    recipe.value = response.value.meals[0];
    // console.log(recipe.value);
    getIngredientsAndMeasurements();

    // 10000 iq
    if (!route.params.name || route.params.name !== recipe.value.strMeal.replaceAll(' ', '-')) {
        router.replace(`/recipes/${recipe.value.idMeal}-${recipe.value.strMeal.replaceAll(' ', '-').toLocaleLowerCase()}`)
    }

    checkIfFavorite();
    console.log(isFavorite.value);
});
</script>

<style lang="scss" scoped></style>