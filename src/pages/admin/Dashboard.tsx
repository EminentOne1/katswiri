import React from "react";
import { StatCard } from "./StatCard";
import { ActivityItem } from "./ActivityItem";
import { QuickAction } from "./QuickAction";

export const DashboardContent: React.FC = () => {
  return (
    <section className="dashboard-content">
      <header className="header">
        <h1 className="title">Dashboard Overview</h1>
      </header>

      <div className="stats-grid">
        <StatCard title="Total Tracks" value="3,500" change="+15%" />
        <StatCard title="Total Albums" value="850" change="+8%" />
        <StatCard title="Total Artists" value="220" change="+5%" />
      </div>

      <h2 className="section-title">Recent Activity</h2>

      <div className="activity-feed">
        <ActivityItem
          isFirst
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.7156 5.28188L12.2156 3.03187C11.9886 2.96372 11.7427 3.00692 11.5524 3.14839C11.3622 3.28986 11.2501 3.51294 11.25 3.75V13.8994C9.66713 12.4836 7.30995 12.3672 5.59523 13.62C3.88052 14.8728 3.27507 17.1539 4.14279 19.0922C5.01051 21.0305 7.11519 22.0983 9.1918 21.6538C11.2684 21.2094 12.7516 19.3736 12.75 17.25V9.25781L19.2844 11.2181C19.5114 11.2863 19.7573 11.2431 19.9476 11.1016C20.1378 10.9601 20.2499 10.7371 20.25 10.5V6C20.2499 5.66892 20.0327 5.37706 19.7156 5.28188Z"
                fill="white"
              />
            </svg>
          }
          title="New track added: 'Cosmic Echoes' by Stellaris"
          time="1 hour ago"
        />

        <ActivityItem
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.7443 6.61758 17.3824 2.25568 12 2.25Z"
                fill="white"
              />
            </svg>
          }
          title="Album updated: 'Urban Rhythms' by BeatCrafters"
          time="2 hours ago"
        />

        <ActivityItem
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 16.5C14.4842 16.4974 16.4974 14.4842 16.5 12V6C16.5 3.51472 14.4853 1.5 12 1.5C9.51472 1.5 7.5 3.51472 7.5 6V12C7.50258 14.4842 9.51579 16.4974 12 16.5Z"
                fill="white"
              />
            </svg>
          }
          title="Artist profile created for Aurora Skies"
          time="4 hours ago"
        />

        <ActivityItem
          isLast
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9922 14.805C13.0561 13.431 13.9769 10.8677 13.2592 8.49441C12.5414 6.12114 10.3544 4.49772 7.875 4.49772C5.39558 4.49772 3.20857 6.12114 2.49084 8.49441C1.7731 10.8677 2.69393 13.431 4.75781 14.805Z"
                fill="white"
              />
            </svg>
          }
          title="User 'Ethan Carter' added a playlist: 'Chill Vibes'"
          time="6 hours ago"
        />
      </div>

      <h2 className="section-title">Quick Actions</h2>

      <div className="quick-actions">
        <div className="actions-grid">
          <QuickAction label="Add New Track" primary />
          <QuickAction label="Manage Users" />
        </div>
      </div>

    </section>
  );
};
