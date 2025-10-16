import Link from 'next/link';
import css from './SidebarNotes.module.css'
import { NoteTag } from '@/types/note';

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];



export default async function SidebarNotes() {

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem} key="All">
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {/* список тегів */}
      {tags.map(tag =>
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>)
      }
    </ul>

  )
}