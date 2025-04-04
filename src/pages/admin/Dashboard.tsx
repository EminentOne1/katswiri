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
    totalSongs: 0, // Added totalSongs
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/dashboard-stats");
        setStats((prevStats) => ({ ...prevStats, ...data }));
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    const fetchTotalSongs = async () => {
      try {
        const { data } = await axios.get("/api/total-songs");
        setStats((prevStats) => ({ ...prevStats, totalSongs: data.totalSongs }));
      } catch (error) {
        console.error("Failed to fetch total songs:", error);
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
    fetchTotalSongs();
    fetchActivities();
  }, []);

  const handlemobileResize = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", () => handlemobileResize());

    if (isMobile) {
      window.removeEventListener("resize", () => handlemobileResize());
      console.log("Cleanup: Remove resize event listener");
    }
  }, [isMobile]);

  if (isMobile) {
    return <div className="mobile-warning">Dashboard is not available on mobile devices.</div>;
  }

  return (
    <div className="dashboard-container">
      <section className="dashboard-content">
        <div className="stats-grid">
          <StatCard title="Total singles" value={"0"} />
          <StatCard title="Total Albums" value={"0"} />
          {/* Added StatCard for totalSongs */}
        </div>

        <h2 className="section-title">Recent Activity</h2>

        <div className="activity-feed"></div>

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
