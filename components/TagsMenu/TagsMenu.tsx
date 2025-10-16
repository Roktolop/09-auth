'use client';

import { NoteTag } from '@/types/note';
import css from './TagsMenu.module.css'
import Link from 'next/link';
import { useState } from 'react';

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>
      {/* список тегів */}
      {isOpen &&
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={() => setIsOpen(false)}>
              All notes
            </Link>
          </li>
          {tags.map((tag) => {
            return (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                  onClick={() => setIsOpen(false)}>
                  {tag}
                </Link>
              </li>
            )
          })}
        </ul>}
    </div >

  )
}