<template>
    <div>
        {{ pending }}
        <Header />
        <section class="mt-32 mb-4">

            <div class="container flex flex-col gap-2 items-center mb-4">
                <p>Filters: </p>

                <div class="flex gap-4">
                    <div class="flex gap-1">
                        <label for="hot">Hot</label>
                        <input type="checkbox"
                               name="hot"
                               id="hot"
                               v-model="filters.hot">
                    </div>

                    <div class="flex gap-1">
                        <label for="sweet">Sweet</label>
                        <input type="checkbox"
                               name="sweet"
                               id="sweet"
                               v-model="filters.sweet">
                    </div>
                </div>

            </div>



            <div class="container flex flex-wrap justify-center gap-4">
                <div v-if="!pending"
                     v-for="ingredient in filteredIngredients"
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
const filters = ref({
    hot: false,
    sweet: false
})

const filteredIngredients = computed(() => {
    let result = ingredients.value;
    let resultHot = [];
    let resultSweet = [];

    if (filters.value.hot) {
        resultHot = result.filter(ingredient => ingredient.strIngredient.toLowerCase().includes('hot'));
    }

    if (filters.value.sweet) {
        resultSweet = result.filter(ingredient => ingredient.strIngredient.toLowerCase().includes('sweet'));
    }

    console.log(resultHot, resultSweet)

    // We check if the filters object has any values that are true, if there are, we destructure the filtered arrays and combine them
    // in order to get an array with those filters applied to the original array.
    if (Object.values(filters.value).includes(true)) {
        result = [...resultHot, ...resultSweet];
    }
    return result;
})

const { data: ingredients, pending } = await useAsyncData(async () => {
    const result = await $fetch("https://themealdb.com/api/json/v1/1/list.php?i=list")
    return result.meals;
});

</script>