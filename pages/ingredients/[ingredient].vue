<template>
    <Header/>
    <section class="mt-32 mb-8">
        <div class="container justify-center items-center flex flex-wrap flex-row gap-8">
            <RecipeCard v-for="recipe in recipes"
                        :id="+recipe.idMeal"
                        :name="recipe.strMeal"
                        :image="recipe.strMealThumb" />
        </div>
    </section>
</template>

<script setup>
const route = useRoute();

const { data: recipes } = await useAsyncData(async () => {
    const result = await $fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${route.params.ingredient}`);
    return result.meals;
})

</script>
