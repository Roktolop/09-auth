import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { NotePreviewClient } from './NotePreview.client';
import { QueryClient } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const queryClient = new QueryClient();

  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient noteId={id}></NotePreviewClient>
    </HydrationBoundary>

  );
};

