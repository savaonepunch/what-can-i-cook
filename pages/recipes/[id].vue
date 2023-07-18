<template>      
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const { data: response } = await useAsyncData(() => {
    
    return $fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`);
});
const recipe = ref();

onMounted(() => {
    recipe.value = response.value.meals[0];
    

    router.replace(`/recipes/${recipe.value.idMeal}-${recipe.value.strMeal.replaceAll(' ', '-').toLocaleLowerCase()}`)
});
</script>

<style lang="scss" scoped></style>