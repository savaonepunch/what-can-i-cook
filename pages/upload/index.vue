<template>
    <Header/>
    <section class="mt-32">
        <div class="container">
            <form @submit.prevent="" class="max-w-sm m-auto">
            <div class="flex flex-col gap-3">

                <label for="recipe">Recipe:</label>
                <input v-model="recipeName" id="recipe" class="px-2 h-10 shadow-inner border rounded-md w-full" type="text" >

                <p>Ingredients:</p>
                <div class="flex flex-col gap-3 ">
                    <div class="flex gap-3" v-for="(input, index) in ingredientInputs">
                        <input class="px-2 h-10 shadow-inner border rounded-md w-[calc(100%-40px-12px)]" type="text" v-model="input.value">
                        <button @click="removeIngredint(index)" class="w-10 rounded-md bg-red-600 text-white grid place-content-center"><Icon class="text-xl" name="fa6-regular:circle-xmark"/></button>
                    </div>
                </div>
                <button @click="addIngredint" class=" inline-block flex-grow-0 cursor-pointer rounded-md bg-accent py-2 px-4 text-white">Add Ingredient</button> 
                <label for="category">Category</label>    
                <select class="px-2 h-10 shadow-inner border rounded-md w-full" id="category">
                    <option value="">Select a category</option>
                </select>       
            </div> 
        </form>
        </div> 
    </section>
</template>

<script setup>
const ingredientInputs = ref([
    {
        value: ''
    },
]);

const recipeName = ref('');

const ingredients = computed(() => ingredientInputs.value.map((ingredient) => ingredient.value));

const addIngredint = () => {
    ingredientInputs.value.push({
        value: '',
    })
};

const removeIngredint = (index) => {
    if (ingredientInputs.value.length === 1) return;
    ingredientInputs.value.splice(index, 1);
};

</script>

