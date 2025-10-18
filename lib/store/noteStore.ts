import { create } from 'zustand'
import { CreateNoteProps } from '../api/clientApi';
import { persist } from 'zustand/middleware';

type DraftNote = {
  draft: CreateNoteProps,
  setDraft: (note: CreateNoteProps) => void,
  clearDraft: () => void,
}

const initialDraft: CreateNoteProps = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useDraftNote = create<DraftNote>()(persist(
  (set) => ({
    draft: initialDraft,
    setDraft: (draft: CreateNoteProps) => set({ draft: draft }),
    clearDraft: () => set(() => ({ draft: initialDraft }))
  }),
  {
    name: 'note-draft',
    partialize: (state) => ({ draft: state.draft })
  },
),
);