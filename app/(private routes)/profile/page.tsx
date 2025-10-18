import { Metadata } from 'next'
import Link from 'next/link'
import css from './ProfilePage.module.css'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Profile—NoteHub',
  description: 'View and edit your profile.',
  openGraph: {
    title: 'Profile—NoteHub',
    description: 'View and edit your profile.',
    url: 'https://08-zustand-axah.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile preview'
      }
    ]
  }
}

export default function ProfilePage() {
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link src="" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="User Avatar"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>
              Username: your_username
            </p>
            <p>
              Email: your_email@example.com
            </p>
          </div>
        </div>
      </main>

    </>)
}