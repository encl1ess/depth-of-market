<template>
    <div class="loader"></div>
</template>

<style lang="scss" scoped>
@keyframes rotation {
    0% {
        transform: rotate(0deg) scale(1);
    }

    50% {
        transform: rotate(180deg) scale(1.5);
    }

    100% {
        transform: rotate(360deg) scale(1);
    }
}

.loader {
    width: 10em;
    height: 10em;
    border: 1rem dashed #2196F3;
    border-radius: 50%;
    animation-name: rotation;
    animation-duration: 1s;
    animation-timing-function: linear;
}
</style>