<script lang="ts">
export default {
    emits: ['go-to-start'],
    methods: {
        gotostart() {
            this.$emit('go-to-start');
        },
    },
    data() {
        return {
            panel: '',
        };
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center"> Help </VCardTitle>
        <VCardSubtitle> Feeling stuck? Need some assistance? You've come to the right place! </VCardSubtitle>
        <VCardText>
            <VExpansionPanels multiple0 :max="3" v-model="panel">
                <VExpansionPanel value="build-options" elevation="0">
                    <VExpansionPanelTitle>What are Build Options?</VExpansionPanelTitle>
                    <VExpansionPanelText>
                        With the Build Options, you can customize your build to your liking. <br />
                        In the <b>Generate</b> tab, you can choose wheather you want your code to include comments to
                        help you understand the code better. This can be useful, if you are interested how Sieve code is
                        built up. On the other hand, the comments make the code far less compact and may confuse
                        experienced users. <br />
                    </VExpansionPanelText>
                </VExpansionPanel>
            </VExpansionPanels>
        </VCardText>
        <VCardActions>
            <VBtn width="100%" variant="flat" color="primary" @click="gotostart()"> Back to Start </VBtn>
        </VCardActions>
    </VCard>
</template>
