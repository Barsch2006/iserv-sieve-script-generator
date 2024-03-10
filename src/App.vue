<script lang="ts">
import StartVCard from './components/StartVCard.vue';
import PrefsVCard from './components/PrefsVCard.vue';
import FilterVCard from './components/FilterVCard.vue';
import HelpPage from './components/HelpPage.vue';
import SieveEditor from './components/SieveEditor.vue';
import { default as generate, IGenerateOptions } from './generate';

export default {
    components: { StartVCard, PrefsVCard, FilterVCard, HelpPage, SieveEditor },
    data() {
        return {
            accepted_tos: false,
            version: 'v1.0.0',
            generateOptions: {
                buildOptions: {
                    with_comments: true,
                },
                prefs: {
                    base: 'grb',
                    my_domain: '' as IGenerateOptions['prefs']['my_domain'],
                },
                filter: {} as IGenerateOptions['filter'],
            } as IGenerateOptions,
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
                    value: 'filters',
                    icon: 'mdi-filter-variant-plus',
                    name: 'Configure',
                },
                {
                    value: 'finish',
                    icon: 'mdi-play-circle-outline',
                    name: 'Generate',
                },
                {
                    value: 'editor',
                    icon: 'mdi-file-code',
                    name: 'Editor',
                },
                {
                    value: 'help',
                    icon: 'mdi-help-circle-outline',
                    name: 'Help',
                },
            ],
            mobile: false,
        };
    },
    methods: {
        generate,
        async copyGeneratedCode(): Promise<void> {
            try {
                await window.navigator.clipboard.writeText(this.generated.code);
            } catch {
                this.generated.error = 'Could not copy code to clipboard';
            }
        },
        async generateCode(): Promise<void> {
            this.generated.loading = true;
            this.generated.success = false;
            this.generated.code = '';
            const res = await this.generate(this.generateOptions);
            this.generated.loading = false;
            this.generated.disabled = false;
            this.generated.success = res.success;
            this.generated.error = res.error;
            this.generated.code = res.code ?? '';
        },
    },
    watch: {
        generateOptions: {
            handler() {
                if (
                    this.generateOptions.prefs.my_domain.length < 3 ||
                    !/\..+/.test(this.generateOptions.prefs.my_domain) ||
                    this.generateOptions.prefs.base.length < 1 ||
                    !this.accepted_tos ||
                    Object.keys(this.generateOptions.filter).length < 1
                ) {
                    this.generated.disabled = true;
                } else {
                    this.generated.disabled = false;
                }
            },
            immediate: true,
            deep: true,
        },
    },
    beforeMount() {
        this.mobile = window.innerWidth < 800;
        window.onresize = () => {
            this.mobile = window.innerWidth < 800;
        };
        if (window.location.hash === '#editor') {
            this.tab = 'editor';
        }
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
                :disabled="!accepted_tos && tab.value != 'help' && tab.value != 'editor' && tab.value != 'start'"
            >
                <VIcon v-if="mobile" size="24px" :icon="tab.icon" />
                <span v-else>{{ tab.name }}</span>
            </VTab>
        </VTabs>
        <VMain>
            <VWindow v-model="tab">
                <VWindowItem value="start">
                    <StartVCard
                        @accepted_tos="(e) => (accepted_tos = e)"
                        @go-to-tab="(t) => (tab = t)"
                        @next-page="tab = 'preferences'"
                    />
                </VWindowItem>

                <VWindowItem value="preferences">
                    <PrefsVCard v-model="generateOptions.prefs" @next-page="tab = 'filters'" />
                </VWindowItem>

                <VWindowItem value="filters">
                    <FilterVCard v-model="generateOptions.filter" @next-page="tab = 'finish'" />
                </VWindowItem>

                <VWindowItem value="finish">
                    <VCard>
                        <VCardTitle class="text-center">Generate code</VCardTitle>
                        <VCardSubtitle>Finished with your settings? Let's generate your code!</VCardSubtitle>
                        <VCardItem>
                            <CardTitle>Build Options</CardTitle>
                            <VCheckbox
                                v-model="generateOptions.buildOptions.with_comments"
                                label="comments"
                                hint="Add comments to the generated code to make debugging and understanding easier"
                                persistent-hint
                            />
                        </VCardItem>
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
                                    generated.disabled || !accepted_tos
                                        ? ''
                                        : generated.success
                                          ? 'success'
                                          : generated.error
                                            ? 'error'
                                            : 'primary'
                                "
                                :loading="generated.loading"
                                :disabled="generated.disabled || !accepted_tos"
                                width="100%"
                                variant="flat"
                                @click="generateCode()"
                                prepend-icon="mdi-sync"
                            >
                                {{ generated.success ? 'Re-Generate' : 'Generate' }}
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
                            <VBtn
                                style="margin-top: 10px"
                                @click="tab = 'editor'"
                                color="primary"
                                width="100%"
                                flat
                                prepend-icon="mdi-open-in-new"
                            >
                                Open In Editor
                            </VBtn>
                        </VCardText>
                    </VCard>
                </VWindowItem>

                <VWindowItem value="editor">
                    <SieveEditor @go-to-start="tab = 'start'" :generated_code="generated.code" />
                </VWindowItem>

                <VWindowItem value="help">
                    <HelpPage @go-to-start="tab = 'start'" />
                </VWindowItem>
            </VWindow>
        </VMain>

        <VFooter height="48px" color="transparent">
            <a target="__blank" class="icon-link row" href="https://github.com/Barsch2006/iserv-sieve-script-generator">
                <VIcon icon="mdi-github" />
                <VBreadcrumbs id="version_info" :items="[version, '&copy; Christian Fuchte']" />
            </a>
            <VSpacer />
            <a target="__blank" class="subtitle icon-link" href="https://iserv.de/">
                <VIcon size="24px" icon="mdi-link-variant" />
                IServ
            </a>
            <a
                target="__blank"
                class="subtitle icon-link"
                href="https://datatracker.ietf.org/doc/html/rfc3028#section-1"
            >
                <VIcon size="24px" icon="mdi-book-open-blank-variant" />
                Docs
            </a>
        </VFooter>
    </VApp>
</template>

<style scoped>
@import url(./styles/app.css);
</style>
