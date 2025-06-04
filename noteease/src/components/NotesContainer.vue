<script setup lang="ts">
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import NoteSearch from './NoteSearch.vue'
import CategoryFilter from './CategoryFilter.vue'
import NoteCard from './NoteCard.vue'
import NoteDialog from './NoteDialog.vue'

const notesStore = useNotesStore()
const isDialogOpen = ref(false)
const selectedNoteId = ref<string | undefined>(undefined)

const openNewNoteDialog = () => {
  selectedNoteId.value = undefined
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
  selectedNoteId.value = undefined
}
</script>

<template>
  <div class="notes-container">
    <NoteSearch />
    <CategoryFilter />
    
    <div class="notes-grid">
      <NoteCard
        v-for="note in notesStore.filteredNotes"
        :key="note.id"
        :note="note"
        @edit="selectedNoteId = note.id; isDialogOpen = true"
      />
    </div>

    <button class="fab" @click="openNewNoteDialog">
      <span class="plus-icon">+</span>
    </button>

    <NoteDialog
      :is-open="isDialogOpen"
      :note-id="selectedNoteId"
      @close="closeDialog"
    />
  </div>
</template>

<style scoped>
.notes-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.notes-grid {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1976D2;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background-color 0.2s;
}

.fab:hover {
  transform: scale(1.1);
  background-color: #1565c0;
}

.plus-icon {
  font-size: 2rem;
  line-height: 1;
}

@media (max-width: 768px) {
  .notes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
