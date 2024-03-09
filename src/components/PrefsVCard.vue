<script lang="ts">
export default {
    emits: ['next-page'],
    methods: {
        nextPage() {
            this.$emit('next-page');
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center"> Preferences </VCardTitle>
        <VCardSubtitle>Set your preferences and default settings</VCardSubtitle>
        <VCardItem> </VCardItem>
        <VCardActions>
            <VBtn width="100%" variant="flat" color="primary" @click="nextPage()"> Next </VBtn>
        </VCardActions>
    </VCard>
</template>
