import { fetchNoteById } from "@/lib/api/clientApi";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `Tag: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Filtered by tag: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `/notes/${id}`,
      images: [{
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      }],
      type: 'article',
    }
  }
};

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  const { id } = await params;
  console.log('note id:', id)

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient></NoteDetailsClient>
    </HydrationBoundary>
  )
}