'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, type CreateNoteProps } from '@/lib/api';
import { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useDraftNote } from "@/lib/store/noteStore";

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const CreateNoteScheme = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .max(50)
    .required(),
  content: Yup.string()
    .max(500),
  tag: Yup.mixed<NoteTag>()
    .oneOf(tags)
    .required(),
})

export function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();



  const createMutation = useMutation({
    mutationFn: (data: CreateNoteProps) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      clearDraft();
      router.back();
    }
  })

  const { draft, setDraft, clearDraft } = useDraftNote();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as unknown as CreateNoteProps;

    try {
      await CreateNoteScheme.validate(data, { abortEarly: false });

      createMutation.mutate(data);
    }
    catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert(error.errors.join('\n'));

        return;
      }
    }
  }

  const handleCancel = () => {
    router.back();
  }

  return (
    <>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input className={css.input} id="title" type="text" name="title" value={draft.title} onChange={handleChange}
          />

        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            className={css.textarea}
            id="content"
            name="content"
            rows={8}
            value={draft.content}
            onChange={handleChange}
          />

        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select className={css.select} id="tag" name="tag" value={draft.tag} onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>

        </div>

        <div className={css.actions} >
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
          >
            Create note
          </button>
        </div>
      </form>
    </>
  )
}