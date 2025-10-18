import { fetchNotes } from "@/lib/api/clientApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [tag] = slug;

  return {
    title: `Tag: ${tag}`,
    description: `Notes filtered by tag: ${tag}`,
    openGraph: {
      title: `Filtered by tag: ${tag}`,
      description: `Notes filtered by tag: ${tag}`,
      url: `https://08-zustand-axah.vercel.app/notes/filter/${tag}`,
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

export default async function FilteresPage({ params }: Props) {
  const { slug } = await params;
  console.log('filters', slug);

  const [tag] = slug;

  const requestParams = {
    tag: tag === 'All' ? undefined : tag, page: 1,
    searchText: ''
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, requestParams.tag],
    queryFn: () => fetchNotes(requestParams),
  })

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={requestParams.tag} />
    </HydrationBoundary>
  )
}