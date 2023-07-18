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
const recipes = ref([]);

const { data: response, pending, error } = await useAsyncData(() => {
    return $fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${route.params.area}`)
});

onMounted(() => {
    recipes.value = response.value.meals;
    console.log(recipes.value);
});
</script>

<style lang="scss" scoped>

</style>