<template>
    <Transition name="overlay">
        <div @click="$emit('close-modal')"
             v-show="isOpen"
             class="overlay fixed z-100 inset-0 bg-opacity-30 bg-black">
            <div class="container grid place-content-center min-h-screen">
                <Transition name="modal">
                    <div v-if="isOpen" @click.stop=""
                         class="modal max-h-96 overflow-auto max-w-md modal bg-white p-6 rounded-lg shadow-xl">
                        <Icon class=" text-red-700 text-2xl mr-2 -translate-y-[1px]"
                              v-if="props.state != 'success'"
                              name="ri:error-warning-fill" />
                        <Icon class="text-green-700 text-2xl mr-2 -translate-y-[1px]"
                              v-else
                              name="ep:success-filled" />
                        <slot></slot>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<script setup>

const props = defineProps({
    isOpen: {
        required: true,
        type: Boolean,
    },
    state: {
        required: true,
        type: String,
    },
});

</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
    transition: background-color .2s ease-in-out;
}

.overlay-enter-from,
.overlay-leave-to {
    background-color: transparent;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity .2s ease-in-out, translate .2s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    translate: 0 -10px;
}
</style>