import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
    

      {/* Main Content */}
      <main className="dashboard-main">
        <h1>Dashboard Overview</h1>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-card">
            <h2>Total Tracks</h2>
            <p className="stats-value">3,500</p>
            <p className="stats-change positive">+15%</p>
          </div>
          <div className="stats-card">
            <h2>Total Albums</h2>
            <p className="stats-value">850</p>
            <p className="stats-change positive">+8%</p>
          </div>
          <div className="stats-card">
            <h2>Total Artists</h2>
            <p className="stats-value">220</p>
            <p className="stats-change positive">+5%</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>
              <p>New track added: 'Cosmic Echoes' by Stellaris</p>
              <p className="activity-time">1 hour ago</p>
            </li>
            <li>
              <p>Album updated: 'Urban Rhythms' by BeatCrafters</p>
              <p className="activity-time">2 hours ago</p>
            </li>
            <li>
              <p>Artist profile created for Aurora Skies</p>
              <p className="activity-time">4 hours ago</p>
            </li>
            <li>
              <p>User 'Ethan Carter' added a playlist: 'Chill Vibes'</p>
              <p className="activity-time">6 hours ago</p>
            </li>
          </ul>
        </section>

        {/* Quick Actions Section */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-buttons">
            <button className="action-button primary">Add New Track</button>
            <button className="action-button secondary">Manage Users</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
