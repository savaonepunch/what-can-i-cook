<template>
    <Header />
    <section class="mt-32 mb-4">
        <div v-if="!user" class="container">
            <h1
                class="text-2xl">You need to be logged in to see your favorite meals.
            </h1>
        </div>
        <div v-else-if="pending" class="container">
            <h1
                class="text-2xl">Loading
            </h1>
        </div>
        <div v-else-if="recipes.length" class="container justify-center items-center flex flex-wrap flex-row gap-8 ">
            <RecipeCard v-for="recipe in recipes"
                        :id="+recipe.recipe_id"
                        :name="recipe.name"
                        :image="recipe.image_url"
                         />
        </div>
        <div v-else class="container">
            <h1
                class="text-2xl">You don't have any favorite recipes!
            </h1>
        </div>  
    </section>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites';

const user = useSupabaseUser();
const client = useSupabaseClient();
const favoritesStore = useFavoritesStore();

const { data: recipes, error, pending } = useAsyncData('recipes', async () => {
    return await client
        .from('recipes')
        .select('recipe_id, name, image_url')
        .eq('user', user.value.id)
        .order('created_at')
}, {
    transform: result => result.data
});

console.log(recipes.value);

const storeFavorites = () => {
    console.log(pending.value);
    console.log(user.value);

    if (user.value && !pending.value) {
        favoritesStore.recipes = recipes.value;
        console.log(favoritesStore.recipes);
        return;
    }

    else if (!user.value) {
        return;
    }

    setTimeout(() => {
        storeFavorites();   
    }, 100);
}

onMounted(async () => {
    storeFavorites();
    console.log(pending.value);
    console.log(favoritesStore.recipes);
});

</script>

<style lang="scss" scoped></style>