'use client';

import css from './NotePreview.module.css'
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Props {
  noteId: string;
}

export function NotePreviewClient({ noteId }: Props) {

  const router = useRouter();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  })

  console.log(note);

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  return (
    <>
      <Modal onClose={onClose}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <p className={css.tag}>{note.tag}</p>
          </div>
          <button className={css.backBtn} onClick={onClose}>Back</button>
        </div>
      </Modal >
    </>
  )
}