<script lang="ts">
import { IPreferences } from '../generate';

export default {
    emits: ['next-page', 'model-value'],
    props: {
        modelValue: {
            type: Object as () => IPreferences,
        },
    },
    methods: {
        nextPage() {
            // @ts-ignore
            this.$emit('next-page');
        },
    },
    data(): {
        prefs: IPreferences;
        rules: {
            [key: string]: (v: any) => any;
        };
    } {
        return {
            prefs: this.modelValue || {
                base: 'grb',
                my_domain: '' as IPreferences['my_domain'],
            },
            rules: {
                required: (v: string) => !!v || 'Required',
                mydomain: (v: string) => {
                    return /\..+/.test(v) ? true : 'Invalid domain';
                },
            },
        };
    },
    watch: {
        prefs: {
            handler() {
                // @ts-ignore
                this.$emit('model-value', this.prefs);
            },
            deep: true,
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center"> Preferences </VCardTitle>
        <VCardSubtitle>Set your preferences and default settings</VCardSubtitle>
        <VCardItem>
            <VSelect
                style="margin-bottom: 5px"
                v-model="prefs.base"
                label="Base"
                readonly
                persistent-hint
                hint="The default base to only allow implemented features on the specified server."
            />
            <VTextField
                v-model="prefs.my_domain"
                :rules="[rules.required, rules.mydomain]"
                prefix="@"
                placeholder="mydomain.com"
                label="Domain"
                hint="e.g. firstname.lastname@mydomain.com -> @mydomain.com"
            />
        </VCardItem>
        <VCardActions>
            <VBtn
                :disabled="!/\..+/.test(prefs.my_domain)"
                width="100%"
                variant="flat"
                :color="/\..+/.test(prefs.my_domain) ? 'primary' : ''"
                @click="nextPage()"
            >
                Next
            </VBtn>
        </VCardActions>
    </VCard>
</template>
