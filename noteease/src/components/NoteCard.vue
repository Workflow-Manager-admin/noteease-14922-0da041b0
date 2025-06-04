<script setup lang="ts">
import type { Note } from '@/types/note'
import { useNotesStore } from '@/stores/notes'

const props = defineProps<{
  note: Note
}>()

defineEmits<{
  (e: 'edit'): void
}>()

const notesStore = useNotesStore()

const deleteNote = () => {
  if (confirm('Are you sure you want to delete this note?')) {
    notesStore.deleteNote(props.note.id)
  }
}
</script>

<template>
  <div class="note-card" @click="$emit('edit')">
    <div class="note-header">
      <h3>{{ note.title }}</h3>
      <button class="delete-button" @click.stop="deleteNote">×</button>
    </div>
    <p class="note-content">{{ note.content }}</p>
    <div class="note-categories">
      <span
        v-for="category in note.categories"
        :key="category"
        class="category-tag"
      >
        {{ category }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.note-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.delete-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0 0.5rem;
}

.delete-button:hover {
  color: #dc3545;
}

.note-content {
  color: #666;
  margin-bottom: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.note-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: #f0f0f0;
  border-radius: 12px;
  color: #666;
}
</style>
