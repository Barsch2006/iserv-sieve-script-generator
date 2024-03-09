<script lang="ts">
import { IFilter } from '../generate';

export default {
    emits: ['next-page', 'model-value'],
    props: {
        modelValue: {
            type: Object as () => IFilter,
        },
    },
    methods: {
        nextPage() {
            // @ts-ignore
            this.$emit('next-page');
        },
    },
    data(): {
        filter: IFilter;
        rules: {
            [key: string]: (v: any) => any;
        };
    } {
        return {
            filter: this.modelValue || {},
            rules: {
                required: (v: string) => !!v || 'Required',
            },
        };
    },
    watch: {
        prefs: {
            handler() {
                // @ts-ignore
                this.$emit('model-value', this.filter);
            },
            deep: true,
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center"> Sieve Actions </VCardTitle>
        <VCardSubtitle>Set up mail filters, sorting and more </VCardSubtitle>
        <VCardActions>
            <VBtn color="primary" width="100%" variant="flat" @click="nextPage()"> Next </VBtn>
        </VCardActions>
    </VCard>
</template>
