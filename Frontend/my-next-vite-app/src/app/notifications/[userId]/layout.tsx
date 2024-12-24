import { Bell } from 'lucide-react'
import styles from './notifications.module.css'

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Bell className={styles.headerIcon} />
          <h1 className={styles.headerTitle}>Notifications</h1>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

