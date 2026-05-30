<template>
  <div class="blog-rich-editor rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-slate-900">
    <div
      v-if="editor"
      :key="toolbarTick"
      class="blog-rich-editor__toolbar flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-800/80"
    >
      <button
        v-for="btn in textButtons"
        :key="btn.label"
        type="button"
        class="blog-rich-editor__btn"
        :class="{ 'is-active': btn.isActive?.() }"
        :title="btn.label"
        @click="btn.run"
      >
        <i :class="btn.icon"></i>
      </button>

      <span class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" aria-hidden="true" />

      <button
        v-for="level in headingLevels"
        :key="level"
        type="button"
        class="blog-rich-editor__btn text-xs font-bold"
        :class="{ 'is-active': editor.isActive('heading', { level }) }"
        :title="`Heading ${level}`"
        @click="setHeading(level)"
      >
        H{{ level }}
      </button>

      <span class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" aria-hidden="true" />

      <button
        v-for="btn in listButtons"
        :key="btn.label"
        type="button"
        class="blog-rich-editor__btn"
        :class="{ 'is-active': btn.isActive?.() }"
        :title="btn.label"
        @click="btn.run"
      >
        <i :class="btn.icon"></i>
      </button>

      <button
        type="button"
        class="blog-rich-editor__btn"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        title="Quote"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <i class="ri-double-quotes-l"></i>
      </button>

      <button
        type="button"
        class="blog-rich-editor__btn"
        title="Link"
        @click="setLink"
      >
        <i class="ri-link"></i>
      </button>

      <button
        type="button"
        class="blog-rich-editor__btn"
        :disabled="uploadingImage"
        title="Insert image"
        @click="imageInput?.click()"
      >
        <i class="ri-image-add-line"></i>
      </button>

      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onImagePick"
      />
    </div>

    <EditorContent :editor="editor" class="blog-rich-editor__content" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'

const props = defineProps({
  modelValue: { type: String, default: '' },
  uploadImage: { type: Function, required: true },
  placeholder: { type: String, default: 'Write your post… Use headings, bold, lists, and images.' },
})

const emit = defineEmits(['update:modelValue'])

const imageInput = ref(null)
const uploadingImage = ref(false)
const toolbarTick = ref(0)
const headingLevels = [2, 3, 4]

const editor = useEditor({
  content: props.modelValue || '',
  extensions: [
    StarterKit.configure({
      heading: { levels: [2, 3, 4] },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
    }),
    Image.configure({
      HTMLAttributes: { class: 'blog-rich-editor__img' },
    }),
    Placeholder.configure({ placeholder: props.placeholder }),
  ],
  editorProps: {
    attributes: {
      class: 'blog-rich-editor__prose focus:outline-none min-h-[220px] px-4 py-3',
    },
  },
  onUpdate: ({ editor: ed }) => {
    emit('update:modelValue', ed.getHTML())
    toolbarTick.value++
  },
  onSelectionUpdate: () => {
    toolbarTick.value++
  },
})

watch(
  () => props.modelValue,
  (html) => {
    if (!editor.value) return
    const current = editor.value.getHTML()
    if (html !== current) {
      editor.value.commands.setContent(html || '', false)
    }
  }
)

const textButtons = [
  {
    label: 'Bold',
    icon: 'ri-bold',
    isActive: () => editor.value?.isActive('bold'),
    run: () => editor.value?.chain().focus().toggleBold().run(),
  },
  {
    label: 'Italic',
    icon: 'ri-italic',
    isActive: () => editor.value?.isActive('italic'),
    run: () => editor.value?.chain().focus().toggleItalic().run(),
  },
  {
    label: 'Underline',
    icon: 'ri-underline',
    isActive: () => editor.value?.isActive('underline'),
    run: () => editor.value?.chain().focus().toggleUnderline().run(),
  },
  {
    label: 'Strikethrough',
    icon: 'ri-strikethrough',
    isActive: () => editor.value?.isActive('strike'),
    run: () => editor.value?.chain().focus().toggleStrike().run(),
  },
]

const listButtons = [
  {
    label: 'Bullet list',
    icon: 'ri-list-unordered',
    isActive: () => editor.value?.isActive('bulletList'),
    run: () => editor.value?.chain().focus().toggleBulletList().run(),
  },
  {
    label: 'Numbered list',
    icon: 'ri-list-ordered',
    isActive: () => editor.value?.isActive('orderedList'),
    run: () => editor.value?.chain().focus().toggleOrderedList().run(),
  },
]

function setHeading(level) {
  editor.value?.chain().focus().toggleHeading({ level }).run()
}

function setLink() {
  const prev = editor.value?.getAttributes('link').href
  const url = window.prompt('Link URL', prev || 'https://')
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

async function onImagePick(ev) {
  const file = ev.target.files?.[0]
  ev.target.value = ''
  if (!file || !editor.value) return
  uploadingImage.value = true
  try {
    const url = await props.uploadImage(file)
    editor.value.chain().focus().setImage({ src: url, alt: file.name }).run()
  } catch (e) {
    console.error(e)
  } finally {
    uploadingImage.value = false
  }
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
