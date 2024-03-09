<script lang="ts">
import StartVCard from './components/StartVCard.vue';
import PrefsVCard from './components/PrefsVCard.vue';
import { default as generate, IGenerateOptions } from './generate';

export default {
    components: { StartVCard, PrefsVCard },
    data() {
        return {
            version: 'v1.0.0',
            generateOptions: {} as IGenerateOptions,
            generated: {
                success: false,
                error: undefined as string | undefined,
                loading: false,
                disabled: false,
                code: '',
            },
            tab: 'start',
            tabs: [
                {
                    value: 'start',
                    icon: 'mdi-information-slab-circle-outline',
                    name: 'Start',
                },
                {
                    value: 'preferences',
                    icon: 'mdi-cogs',
                    name: 'Prefs',
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
        generate,
        async copyGeneratedCode(): Promise<void> {
            try {
                // @ts-ignore
                await window.navigator.clipboard.writeText(this.generated.code);
            } catch {
                // @ts-ignore
                this.generated.error = 'Could not copy code to clipboard';
            }
        },
        async generateCode(): Promise<void> {
            // @ts-ignore
            this.generated.loading = true;
            // @ts-ignore
            this.generated.success = false;
            // @ts-ignore
            this.generated.code = '';
            // @ts-ignore
            const res = await this.generate(this.generateOptions);
            // @ts-ignore
            this.generated.loading = false;
            // @ts-ignore
            this.generated.disabled = false;
            // @ts-ignore
            this.generated.success = res.success;
            // @ts-ignore
            this.generated.error = res.error;
            // @ts-ignore
            this.generated.code = res.code ?? '';
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
                <VWindowItem value="start">
                    <StartVCard @go-to-tab="(t) => (tab = t)" @next-page="tab = 'preferences'" />
                </VWindowItem>

                <VWindowItem value="preferences">
                    <PrefsVCard @next-page="tab = 'finish'" />
                </VWindowItem>

                <VWindowItem value="finish">
                    <VCard>
                        <VCardTitle class="text-center">Generate code</VCardTitle>
                        <VCardSubtitle>Finished with your settings? Let's generate your code!</VCardSubtitle>
                        <VAlert
                            v-if="generated.error"
                            style="margin-left: 10px; margin-right: 10px"
                            title="Error"
                            type="error"
                            density="compact"
                            width="calc(100% - 20px)"
                            variant="flat"
                            :msg="generated.error"
                        />
                        <VCardActions>
                            <VBtn
                                :color="
                                    generated.disabled
                                        ? ''
                                        : generated.success
                                          ? 'success'
                                          : generated.error
                                            ? 'error'
                                            : 'primary'
                                "
                                :loading="generated.loading"
                                :disabled="generated.disabled"
                                width="100%"
                                variant="flat"
                                @click="generateCode()"
                            >
                                {{ generated.success ? 'Regenerate' : 'Generate' }}
                            </VBtn>
                        </VCardActions>
                        <VCardText v-if="generated.success">
                            <VTextarea
                                v-model="generated.code"
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
                                    <VIcon @click="copyGeneratedCode" icon="mdi-content-copy" />
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
