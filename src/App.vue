<script lang="ts">
export default {
    data(): {
        version: string;
        generate: {
            success: boolean;
            error: string | undefined;
            loading: boolean;
            disabled: boolean;
            code: string;
        };
        tab: string;
        tabs: { value: string; icon: string; name: string }[];
        mobile: boolean;
    } {
        return {
            version: 'v1.0.0',
            generate: {
                success: true,
                error: undefined as string | undefined,
                loading: false,
                disabled: true,
                code: 'require ["fileinto"]; \ntada',
            },
            tab: 'start',
            tabs: [
                {
                    value: 'start',
                    icon: 'mdi-information-slab-circle-outline',
                    name: 'Start',
                },
                {
                    value: 'finish',
                    icon: 'mdi-play-circle-outline',
                    name: 'Generate',
                },
            ],
            mobile: false,
        };
    },
    methods: {
        async copyGeneratedCode() {
            try {
                await window.navigator.clipboard.writeText(this.generate.code);
            } catch {
                this.generate.error = 'Could not copy code to clipboard';
            }
        },
    },
    beforeMount() {
        this.mobile = window.innerWidth < 800;
        window.onresize = () => {
            this.mobile = window.innerWidth < 800;
        };
    },
};
</script>

<template>
    <VApp dark height="64px">
        <VTabs v-model="tab" width="100%" :fixed-tabs="!mobile">
            <VTab
                :title="tab.name"
                :prepend-icon="!mobile ? tab.icon : undefined"
                v-for="tab in tabs"
                :key="tab.value"
                :value="tab.value"
            >
                <VIcon v-if="mobile" size="24px" :icon="tab.icon" />
                <span v-else>{{ tab.name }}</span>
            </VTab>
        </VTabs>
        <VMain>
            <VWindow v-model="tab">
                <VWindowItem value="finish">
                    <VCard>
                        <VCardTitle class="text-center">Finish?</VCardTitle>
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
                                :color="
                                    generate.disabled
                                        ? ''
                                        : generate.success
                                          ? 'success'
                                          : generate.error
                                            ? 'error'
                                            : 'primary'
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
                            <VTextarea
                                v-model="generate.code"
                                label="Generated Code"
                                readonly
                                bg-color="background"
                                no-resize
                                persistent-hint
                                hint="Click the icon to copy the code to your clipboard"
                                style="font-family: monospace; font-size: 10px;"
                                :auto-grow="true"
                            >
                                <template v-slot:append-inner>
                                    <VIcon @click="copyGeneratedCode" icon="mdi-share" />
                                </template>
                            </VTextarea>
                        </VCardText>
                    </VCard>
                </VWindowItem>
            </VWindow>
        </VMain>

        <VFooter height="48px">
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
