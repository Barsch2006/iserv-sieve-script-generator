<script lang="ts">
export default {
    emits: ['next-page', 'go-to-tab', 'accepted_tos'],
    data() {
        return {
            nextEnabled: false,
        };
    },
    methods: {
        nextPage() {
            if (this.nextEnabled) this.$emit('next-page');
        },
        goToTab(tab: string) {
            if (this.nextEnabled) this.$emit('go-to-tab', tab);
        },
    },
    watch: {
        nextEnabled() {
            this.$emit('accepted_tos', this.nextEnabled);
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
                <u @click="goToTab('finish')" style="cursor: pointer; color: rgb(var(--v-theme-primary))">Generate</u>
                to get your code generated. Copy the code to your clipboard and paste into textarea in the
                <i>Sieve Script</i>-Tab in the Mail settings of your
                <a style="cursor: pointer; color: rgb(var(--v-theme-primary))" target="__blank" href="https://iserv.de/"
                    >IServ</a
                >
                Account.
            </p>
        </VCardText>
        <VCardText>
            <VCardTitle class="text-center">Terms Of Use</VCardTitle>
            <VCardText>
                By using this tool, you agree to the following terms:
                <ol style="padding-left: 20px">
                    <li>
                        I will not use this tool for any illegal or harmful purposes. <br />
                        I will not use this tool to harm or damage any person or entity.
                    </li>
                    <li>I am aware that the generated code is based on my preferences and settings. <br /></li>
                    <li>
                        I am aware that the generated code is not guaranteed to work as expected and it may cause errors
                        on my system (for example if the server is not configured as aspected).
                    </li>
                </ol>
            </VCardText>
            <VCheckbox v-model="nextEnabled" label="I have read and accept the terms of use" />
        </VCardText>
        <VCardActions>
            <VBtn
                :disabled="!nextEnabled"
                :color="!nextEnabled ? 'surface' : 'primary'"
                width="100%"
                variant="flat"
                @click="nextPage()"
            >
                NEXT
            </VBtn>
        </VCardActions>
    </VCard>
</template>
