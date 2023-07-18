<template>
    <section>
        <div class="container">
            <NuxtLink to="/"><span>Home</span></NuxtLink>
            <span v-if="$route.query['recipe-name']"> > </span>
            <span>{{ $route.query['recipe-name'] }}</span>
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>