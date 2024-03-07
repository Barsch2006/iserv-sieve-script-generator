<script lang="ts">
export default {
    props: {
        mobile: Boolean,
        value: String,
        icon: String,
        name: String,
    },
};
</script>

<template>
    <VTab :value="value">
        <VIcon v-if="mobile" size="24px" :icon="icon" />
        <span v-else>{{ name }}</span>
    </VTab>
</template>
