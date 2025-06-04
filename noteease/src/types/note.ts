export type Note = {
  id: string;
  title: string;
  content: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFilters {
  searchQuery: string;
  selectedCategories: string[];
}
