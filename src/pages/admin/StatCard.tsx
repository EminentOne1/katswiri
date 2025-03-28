import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  return (
    <article className="stat-card">
      <h3 className="title">{title}</h3>
      <p className="value">{value}</p>
      <p className="change">{change}</p>

      <style >{`
        .stat-card {
          flex: 1;
          min-width: 158px;
          padding: 24px;
          border-radius: 12px;
          background-color: #293038;
        }

        .title {
          color: #fff;
          font-size: 16px;
         
          line-height: 24px;
        }

        .value {
          color: #fff;
          font-size: 24px;
         
          font-weight: 700;
          line-height: 30px;
        }

        .change {
          color: #0ad95c;
          font-size: 16px;
         
          line-height: 24px;
        }
      `}</style>
    </article>
  );
};
