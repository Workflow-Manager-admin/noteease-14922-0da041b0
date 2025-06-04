import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Note, NoteFilters } from '@/types/note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const filters = ref<NoteFilters>({
    searchQuery: '',
    selectedCategories: []
  })

  // Getters
  const filteredNotes = computed(() => {
    return notes.value.filter(note => {
      const matchesSearch = !filters.value.searchQuery || 
        note.title.toLowerCase().includes(filters.value.searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(filters.value.searchQuery.toLowerCase())
      
      const matchesCategories = !filters.value.selectedCategories.length ||
        note.categories.some(cat => filters.value.selectedCategories.includes(cat))
      
      return matchesSearch && matchesCategories
    })
  })

  const allCategories = computed(() => {
    const categories = new Set<string>()
    notes.value.forEach(note => {
      note.categories.forEach(cat => categories.add(cat))
    })
    return Array.from(categories)
  })

  // Actions
  function addNote(title: string, content: string, categories: string[] = []) {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      categories,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    notes.value.push(newNote)
  }

  function updateNote(id: string, updates: Partial<Note>) {
    const noteIndex = notes.value.findIndex(note => note.id === id)
    if (noteIndex !== -1) {
      notes.value[noteIndex] = {
        ...notes.value[noteIndex],
        ...updates,
        updatedAt: new Date()
      }
    }
  }

  function deleteNote(id: string) {
    const noteIndex = notes.value.findIndex(note => note.id === id)
    if (noteIndex !== -1) {
      notes.value.splice(noteIndex, 1)
    }
  }

  function setSearchQuery(query: string) {
    filters.value.searchQuery = query
  }

  function toggleCategory(category: string) {
    const index = filters.value.selectedCategories.indexOf(category)
    if (index === -1) {
      filters.value.selectedCategories.push(category)
    } else {
      filters.value.selectedCategories.splice(index, 1)
    }
  }

  return {
    notes,
    filters,
    filteredNotes,
    allCategories,
    addNote,
    updateNote,
    deleteNote,
    setSearchQuery,
    toggleCategory
  }
})
