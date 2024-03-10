<script lang="ts">
export default {
    emits: ['go-to-start'],
    props: {
        generated_code: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            code: '' as string,
            highlighted_code: '' as string,
        };
    },
    methods: {
        useGeneratedCode() {
            // @ts-ignore
            if (this.generated_code?.length < 1) {
                // @ts-ignore
                this.$emit('go-to-start');
            }
            // @ts-ignore
            this.code = this.generated_code;
        },
        syntaxHighlight() {
            // @ts-ignore
            this.highlighted_code = this.code
                // escape html
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>')
                .replace(/ /g, '&nbsp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/`/g, '&#96;');
        },
        onInput() {
            // @ts-ignore
            this.syntaxHighlight();
            const textarea = document.querySelector('.editor_wrapper textarea') as HTMLTextAreaElement;
            const scrollArea = document.querySelector('.editor_wrapper') as HTMLDivElement;
            if (textarea && textarea.clientHeight) {
                textarea.style.height = document.querySelector('.editor_wrapper .syntax')?.clientHeight + 'px';
            }
            if (scrollArea) {
                scrollArea.scrollTop = scrollArea.scrollHeight;
            }
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center"> Sieve-Editor </VCardTitle>
        <VCardSubtitle>Create and customize your Sieve-Script with syntax-highlighting</VCardSubtitle>
        <VCardActions>
            <VBtn
                @click="useGeneratedCode"
                color="primary"
                flat
                variant="flat"
                width="100%"
                prepend-icon="mdi-import"
            >
                {{ generated_code?.length < 1 ? 'Generate Your Code' : 'Import Generated Code' }}
            </VBtn>
        </VCardActions>
        <VCardItem>
            <div class="editor_wrapper">
                <textarea spellcheck="false" @keydown="onInput" v-model="code"></textarea>
                <div spellcheck="false" class="syntax" v-html="highlighted_code"></div>
            </div>
        </VCardItem>
    </VCard>
</template>

<style>
.editor_wrapper {
    width: 100%;
    position: relative;
    height: min(calc(100svh - 250px));
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
}

.editor_wrapper > * {
    width: 100%;
    font-family: monospace;
    font-size: 12px;
    height: auto;
    min-height: 100%;
    padding: 10px;
    border-radius: 5px;
    box-sizing: border-box;
}

.editor_wrapper textarea {
    resize: none;
    border: none;
    outline: none;
    background: transparent;
    color: transparent;
    caret-color: #fff;
    overflow: hidden;
}

.editor_wrapper .syntax {
    position: absolute;
    z-index: -1;
    background: #1c1c1c;
    top: 0;
    left: 0;
}
</style>
