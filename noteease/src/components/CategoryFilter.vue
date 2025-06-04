<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'

const notesStore = useNotesStore()
</script>

<template>
  <div class="category-filter">
    <div class="chips-container">
      <button
        v-for="category in notesStore.allCategories"
        :key="category"
        class="category-chip"
        :class="{ active: notesStore.filters.selectedCategories.includes(category) }"
        @click="notesStore.toggleCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-filter {
  padding: 0.5rem 1rem;
  background-color: var(--color-background);
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-chip {
  padding: 0.5rem 1rem;
  border-radius: 16px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.category-chip:hover {
  background-color: #d0d0d0;
}

.category-chip.active {
  background-color: #1976D2;
  color: white;
}
</style>
