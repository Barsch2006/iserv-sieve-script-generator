<script lang="ts">
export default {
    emits: ['go-to-start'],
    methods: {
        gotostart() {
            // @ts-ignore
            this.$emit('go-to-start');
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center"> Help </VCardTitle>
        <VCardSubtitle>
            Feeling stuck? Need some assistance? You've come to the right place!
        </VCardSubtitle>
        <VCardText>
            <strong>
                Help Page is under construction. Please check back later.
            </strong>
        </VCardText>
        <VCardActions>
            <VBtn width="100%" variant="flat" color="primary" @click="gotostart()"> Back to Start </VBtn>
        </VCardActions>
    </VCard>
</template>
