<template>
    <div class=" transition-shadow hover:shadow-md justify-start flex basis-full lg:basis-[calc(50%-16px)] rounded-3xl bg-slate-100 box-border pt-72 sm:py-0 sm:pl-0 relative overflow-hidden z-10">

        <div class="flex justify-center items-center absolute sm:static sm:basis-1/2 top-0 left-0 right-0 h-64 bg-cover bg-center overflow-hidden "
             :style="{ backgroundImage: `url('${image}')` }">
        </div>

        <div class="flex flex-col gap-5 sm:basis-1/2 justify-center sm:box-border px-8 pb-8 sm:pb-0">
            <h3 class=" sm:line-clamp-4 text-3xl font-semibold">{{ props.name }}</h3>
            <button @click="$router.push(`/recipes/${props.id}-${props.name.replaceAll(' ', '-').toLocaleLowerCase()}`)"
                    class=" whitespace-nowrap mr-auto bg-accent py-2 px-8 rounded-full text-white">View Recipe</button>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    id: number,
    name: string,
    image?: string,
}>();
</script>

<style scoped></style>