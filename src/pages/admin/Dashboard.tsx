import React, { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { ActivityItem } from "./ActivityItem";
import { QuickAction } from "./QuickAction";
import axios from "axios";

interface Activity {
  id: number;
  title: string;
  time: string;
  icon: React.ReactNode;
}

export const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState({
    totalTracks: 0,
    totalAlbums: 0,
    totalArtists: 0,
  });

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/dashboard-stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const { data } = await axios.get("/api/recent-activities");
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch recent activities:", error);
      }
    };

    fetchStats();
    fetchActivities();
  }, []);

  return (
    <div className="dashboard-container">
      <section className="dashboard-content">
        <header className="header">
          <h1 className="title">Dashboard Overview</h1>
        </header>

        <div className="stats-grid">
          <StatCard title="Total Tracks" value={stats.totalTracks.toString()} />
          <StatCard title="Total Albums" value={stats.totalAlbums.toString()} />
          <StatCard title="Total Artists" value={stats.totalArtists.toString()} />
        </div>

        <h2 className="section-title">Recent Activity</h2>

        <div className="activity-feed">
          {activities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              isFirst={index === 0}
              isLast={index === activities.length - 1}
              icon={activity.icon}
              title={activity.title}
              time={activity.time}
            />
          ))}
        </div>

        <h2 className="section-title">Quick Actions</h2>

        <div className="quick-actions">
          <div className="actions-grid">
            <QuickAction label="Add New Track" primary />
            <QuickAction label="Manage Users" />
          </div>
        </div>
      </section>
    </div>
  );
};
