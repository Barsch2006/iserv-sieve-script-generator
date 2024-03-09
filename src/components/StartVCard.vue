<script lang="ts">
export default {
    emits: ['next-page', 'go-to-tab'],
    methods: {
        nextPage() {
            this.$emit('next-page');
        },
        goToTab(tab: string) {
            this.$emit('go-to-tab', tab);
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center">IServ Sieve Script Generator</VCardTitle>
        <VCardSubtitle class="text-center">Welcome to the IServ Sieve Script Generator</VCardSubtitle>
        <VCardText>
            <p>
                This tool generates Sieve code based on your preferences and settings. It is designed to be used for the
                IServ mail system. The generated code can be used to filter and sort your incoming mails.
            </p>
            <br />
            <p>
                Simply add your preferences and settings to the forms on the following pages. If you're done, go to
                <u @click="goToTab('finish')" style="cursor: pointer; color: rgb(var(--v-theme-primary));">Generate</u> to get your code generated. Copy the
                code to your clipboard and paste into textarea in the <i>Sieve Script</i>-Tab in the Mail settings of
                your IServ Account.
            </p>
        </VCardText>
        <VCardActions>
            <VBtn width="100%" variant="flat" color="primary" @click="nextPage()"> Start </VBtn>
        </VCardActions>
    </VCard>
</template>
