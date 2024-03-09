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
        <VCardTitle class="text-center">IServ Sieve Script Generator</VCardTitle>
        <VCardSubtitle>
            This tool generates Sieve code based on your preferences and settings. It is designed to be used for the
            IServ mail system. The generated code can be used to filter and sort your incoming mails.
        </VCardSubtitle>
        <VCardText>
            Simply add your preferences and settings to the forms on the following pages. If you're done, go to
            <u @click="tab = 'finish'" style="cursor: pointer">Generate</u> to get your code generated. Copy the code to
            your clipboard and paste into textarea in the <i>Sieve Script</i>-Tab in the Mail settings of your IServ
            Account.
        </VCardText>
        <VCardActions>
            <VBtn width="100%" variant="flat" color="primary" @click="nextPage()"> Start </VBtn>
        </VCardActions>
    </VCard>
</template>
