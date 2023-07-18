import { defineStore } from "pinia";

export const useFavoritesStore = defineStore('favorites', () => {
    const recipes = ref([]);
    return { recipes };
})