<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'

const notesStore = useNotesStore()

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  notesStore.setSearchQuery(target.value)
}
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search notes..."
      :value="notesStore.filters.searchQuery"
      @input="handleSearch"
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search-container {
  padding: 1rem;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #1976D2;
}
</style>
