<script lang="ts">
import StartVCard from './components/StartVCard.vue';
import PrefsVCard from './components/PrefsVCard.vue';
import GenerateVCard from './components/GenerateVCard.vue';

export default {
    components: { StartVCard, PrefsVCard, GenerateVCard },
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
                    <StartVCard @next-page="tab = 'preferences'" />
                </VWindowItem>

                <VWindowItem value="preferences">
                    <PrefsVCard @next-page="tab = 'finish'" />
                </VWindowItem>

                <VWindowItem value="finish">
                    <GenerateVCard :generate="generate" />
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
