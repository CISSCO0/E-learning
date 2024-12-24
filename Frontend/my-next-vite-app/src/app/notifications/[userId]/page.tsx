'use client';

import { useEffect, useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import styles from './notifications.module.css';

interface Notification {
  id: string;
  title: string; // Notification type as the title
  description: string;
  time: string;
}

function NotificationIcon({ type }: { type: string }) {
  const iconClasses = `${styles.icon}`;
  switch (type) {
    case 'info':
      return <Info className={`${iconClasses} ${styles.infoIcon}`} />;
    case 'success':
      return <CheckCircle className={`${iconClasses} ${styles.successIcon}`} />;
    case 'warning':
      return <AlertCircle className={`${iconClasses} ${styles.warningIcon}`} />;
    default:
      return <Bell className={`${iconClasses} ${styles.defaultIcon}`} />;
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const hardcodedUserId = 'user4'; // Replace with actual user ID
        const response = await fetch(
          `http://localhost:5000/notifications/user/${hardcodedUserId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.statusText}`);
        }

        const data = await response.json();

        const formattedNotifications = data.map((n: any) => ({
          id: n._id,
          title: n.type || 'default',
          description: n.content,
          time: new Date(n.createdAt).toLocaleString(),
        }));

        setNotifications(formattedNotifications);
      } catch (error: any) {
        console.error('Error fetching notifications:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Notifications</h1>
        </div>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Notifications</h2>
        {notifications.length === 0 ? (
          <div>No notifications available.</div>
        ) : (
          <div className={styles.notificationList}>
            {notifications.map((notification) => (
              <div key={notification.id} className={styles.notificationCard}>
                <div className={styles.notificationContent}>
                  <div className={styles.iconWrapper}>
                    <NotificationIcon type={notification.title} />
                  </div>
                  <div className={styles.textContent}>
                    <h3 className={styles.notificationTitle}>{notification.title}</h3>
                    <p className={styles.notificationDescription}>{notification.description}</p>
                  </div>
                  <div className={styles.timeWrapper}>
                    <span className={styles.notificationTime}>{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
