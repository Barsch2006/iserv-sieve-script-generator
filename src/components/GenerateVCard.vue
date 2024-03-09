<script lang="ts">
export default {
    props: {
        generate: {
            type: Object as () => {
                success: boolean;
                error: string | undefined;
                loading: boolean;
                disabled: boolean;
                code: string;
            },
            required: true,
        },
    },
    methods: {
        async copyGeneratedCode(): Promise<void> {
            try {
                await window.navigator.clipboard.writeText(this.generate.code);
            } catch {
                this.generate.error = 'Could not copy code to clipboard';
            }
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center">Generate code</VCardTitle>
        <VCardSubtitle>Finished with your settings? Let's generate your code!</VCardSubtitle>
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
                :color="generate.disabled ? '' : generate.success ? 'success' : generate.error ? 'error' : 'primary'"
                :loading="generate.loading"
                :disabled="generate.disabled"
                width="100%"
                variant="flat"
            >
                Generate
            </VBtn>
        </VCardActions>
        <VCardText v-if="generate.success">
            <VTextarea
                v-model="generate.code"
                label="Generated Code"
                readonly
                bg-color="background"
                no-resize
                persistent-hint
                hint="Click the icon to copy the code to your clipboard"
                style="font-family: monospace; font-size: 10px"
                :auto-grow="true"
            >
                <template v-slot:append-inner>
                    <VIcon @click="copyGeneratedCode" icon="mdi-share" />
                </template>
            </VTextarea>
        </VCardText>
    </VCard>
</template>
