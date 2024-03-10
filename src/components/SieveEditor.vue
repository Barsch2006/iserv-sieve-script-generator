<script lang="ts">
import syntax from '../syntax';

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
            if (this.generated_code?.length < 1) {
                this.$emit('go-to-start');
            }
            this.code = this.generated_code;
        },
        syntaxHighlight() {
            this.highlighted_code = syntax(this.code);
        },
        onInput() {
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
    watch: {
        code() {
            this.syntaxHighlight();
        },
    },
};
</script>

<template>
    <VCard>
        <VCardTitle class="text-center"> Sieve-Editor </VCardTitle>
        <VCardSubtitle>Create and customize your Sieve-Script with syntax-highlighting</VCardSubtitle>
        <VCardItem>
            <VBtn
                @click="useGeneratedCode"
                color="primary"
                flat
                variant="flat"
                width="100%"
                :prepend-icon="generated_code?.length < 1 ? 'mdi-pencil' : 'mdi-import'"
            >
                {{ generated_code?.length < 1 ? 'Generate Your Code' : 'Import Generated Code' }}
            </VBtn>
            <div class="editor_wrapper">
                <textarea spellcheck="false" @keydown="onInput" v-model="code"></textarea>
                <div spellcheck="false" class="syntax" v-html="highlighted_code"></div>
            </div>
        </VCardItem>
    </VCard>
</template>

<style>
@import url(../styles/syntax.css);

.editor_wrapper {
    margin-top: 10px;
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
