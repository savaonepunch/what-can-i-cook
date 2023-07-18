<template>
    <div>
        {{ pending }}
        <Header />
        <section class="mt-32 mb-4">
            <div class="container flex flex-wrap justify-center gap-4">
                <div v-if="!pending"
                     v-for="ingredient in ingredients"
                     class="cursor-pointer bg-slate-200 rounded-full py-1 px-3 w-fit ">
                    <NuxtLink :to="`/ingredients/${ingredient.strIngredient.replace(' ', '_').toLowerCase()}`">
                        <button class="text-sm">{{ ingredient.strIngredient }}</button>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const { data: ingredients, pending } = await useAsyncData(async () => {
    const result = await $fetch("https://themealdb.com/api/json/v1/1/list.php?i=list")
    return result.meals;
});

</script>