<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useNotesStore } from '@/stores/notes'
import type { Note } from '@/types/note'

const handleKeydown = (event: KeyboardEvent) => {
  if (props.isOpen) {
    if (event.key === 'Escape') {
      emit('close')
    } else if (event.key === 'Enter' && event.ctrlKey) {
      saveNote()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const notesStore = useNotesStore()

const props = defineProps<{
  isOpen: boolean
  noteId?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    initializeForm()
  }
})

const title = ref('')
const content = ref('')
const categoryInput = ref('')
const selectedCategories = ref<string[]>([])

const initializeForm = () => {
  if (props.noteId) {
    const note = notesStore.notes.find((note: Note) => note.id === props.noteId)
    if (note) {
      title.value = note.title
      content.value = note.content
      selectedCategories.value = [...note.categories]
    }
  } else {
    resetForm()
  }
}

const addCategory = () => {
  if (categoryInput.value.trim()) {
    selectedCategories.value.push(categoryInput.value.trim())
    categoryInput.value = ''
  }
}

const removeCategory = (category: string) => {
  selectedCategories.value = selectedCategories.value.filter(c => c !== category)
}

const saveNote = () => {
  if (props.noteId) {
    notesStore.updateNote(props.noteId, {
      title: title.value,
      content: content.value,
      categories: selectedCategories.value
    })
  } else {
    notesStore.addNote(title.value, content.value, selectedCategories.value)
  }
  resetForm()
  emit('close')
}

const resetForm = () => {
  title.value = ''
  content.value = ''
  categoryInput.value = ''
  selectedCategories.value = []
}
</script>

<template>
  <div v-if="isOpen" class="dialog-overlay" @click="emit('close')">
    <div class="dialog" @click.stop>
      <div class="dialog-header">
        <h2>{{ noteId ? 'Edit Note' : 'New Note' }}</h2>
        <button class="close-button" @click="emit('close')">×</button>
      </div>
      <div class="dialog-content">
        <input
          v-model="title"
          type="text"
          placeholder="Note title"
          class="title-input"
        />
        <textarea
          v-model="content"
          placeholder="Note content"
          class="content-input"
        ></textarea>
        <div class="categories-section">
          <div class="category-input-container">
            <input
              v-model="categoryInput"
              type="text"
              placeholder="Add category"
              class="category-input"
              @keyup.enter="addCategory"
            />
            <button class="add-category-button" @click="addCategory">Add</button>
          </div>
          <div class="selected-categories">
            <span
              v-for="category in selectedCategories"
              :key="category"
              class="category-chip"
            >
              {{ category }}
              <button
                class="remove-category"
                @click="removeCategory(category)"
              >×</button>
            </span>
          </div>
        </div>
      </div>
      <div class="dialog-actions">
        <button class="cancel-button" @click="emit('close')">Cancel</button>
        <button class="save-button" @click="saveNote">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.dialog-content {
  padding: 1rem;
  overflow-y: auto;
}

.title-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1.25rem;
}

.content-input {
  width: 100%;
  height: 200px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
}

.categories-section {
  margin-top: 1rem;
}

.category-input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.category-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.add-category-button {
  padding: 0.5rem 1rem;
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.selected-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: #f0f0f0;
  border-radius: 16px;
  font-size: 0.875rem;
}

.remove-category {
  background: none;
  border: none;
  margin-left: 0.25rem;
  cursor: pointer;
  color: #666;
}

.dialog-actions {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-button,
.save-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.cancel-button {
  background-color: transparent;
  border: 1px solid var(--color-border);
}

.save-button {
  background-color: #1976D2;
  color: white;
  border: none;
}

.save-button:hover {
  background-color: #1565c0;
}
</style>
