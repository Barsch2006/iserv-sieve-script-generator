<script lang="ts">
export default {
    data() {
        return {
            version: 'v1.0.0',
            generate: {
                success: false,
                error: undefined as string | undefined,
                loading: false,
                disabled: true,
                code: '',
            },
        };
    },
};
</script>

<template>
    <VApp dark height="64px">
        <VMain>
            <VCard>
                <VCardTitle class="text-center"> IServ Sieve Script Generator</VCardTitle>
                <VCardSubtitle> Generate a Sieve script for IServ with ease. </VCardSubtitle>
                <VAlert
                    v-if="generate.error"
                    style="margin-left: 10px; margin-right: 10px"
                    title="Error"
                    type="error"
                    density="compact"
                    width="calc(100% - 20px)"
                    variant="flat"
                    :msg="generate.error"
                />
                <VCardActions>
                    <VBtn
                        :color="
                            generate.disabled ? '' : generate.success ? 'success' : generate.error ? 'error' : 'primary'
                        "
                        :loading="generate.loading"
                        :disabled="generate.disabled"
                        width="100%"
                        variant="flat"
                    >
                        Generate
                    </VBtn>
                </VCardActions>
                <VCardText v-if="generate.success">
                    <VTextField v-model="generate.code" label="Generated Code" readonly />
                </VCardText>
            </VCard>
        </VMain>

        <VFooter height="50px">
            <a class="icon-link row" href="https://github.com/Barsch2006/iserv-sieve-script-generator">
                <VIcon icon="mdi-github" />
                <VBreadcrumbs id="version_info" :items="[version, '&copy; Christian Fuchte']" />
            </a>
        </VFooter>
    </VApp>
</template>

<style scoped>
@import url(./styles/app.css);
</style>
