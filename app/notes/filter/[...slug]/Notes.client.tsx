'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'
import Pagination from '@/components/Pagination/Pagination'
import css from './NoteList.module.css'
import { fetchNotes } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import { useDebounce } from 'use-debounce'
import Link from 'next/link';

interface Props {
  tag?: string;
}

function NotesClient({ tag }: Props) {
  const [curPage, setCurPage] = useState(1);
  const [searchValue, setSearchValue] = useState("")

  const [debouncedValue] = useDebounce(searchValue, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', curPage, debouncedValue, tag],
    queryFn: () => fetchNotes({
      searchText: debouncedValue,
      page: curPage,
      tag,
    }),
    placeholderData: keepPreviousData
  })

  const handleSearch = (query: string) => {
    setSearchValue(query);
    setCurPage(1);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch}></SearchBox>

          <Link className={css.button} href={"/notes/action/create"}>Create note +</Link>

          {isSuccess && data?.totalPages > 1 &&
            <Pagination
              totalPages={data?.totalPages ?? 0}
              currentPage={curPage}
              onPageChange={setCurPage}
            />}

        </header>
        {data?.notes && data.notes.length > 0 &&
          <NoteList notes={data?.notes ?? []} />
        }
      </div>
    </>
  )
}

export default NotesClient
