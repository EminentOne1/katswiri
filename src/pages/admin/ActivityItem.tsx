import React from "react";

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  time,
  isFirst,
  isLast,
}) => {
  return (
    <article className="activity-item">
      <div className="timeline">
        {!isFirst && <div className="line-top" />}
        {icon}
        {!isLast && <div className="line-bottom" />}
      </div>
      <div className="content">
        <h4 className="title">{title}</h4>
        <p className="time">{time}</p>
      </div>

      <style>{`
        .activity-item {
          display: flex;
          gap: 8px;
        }

        .timeline {
          width: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding-top: ${isFirst ? "12px" : "0"};
          padding-bottom: ${isLast ? "12px" : "0"};
        }

        .line-top,
        .line-bottom {
          width: 2px;
          height: ${isFirst || isLast ? "8px" : "32px"};
          background-color: #3b4a54;
        }

        .content {
          flex: 1;
          padding: 12px 0px;
        }

        .title {
          color: #fff;
          font-size: 16px;
     
          line-height: 24px;
        }

        .time {
          color: #9cabba;
          font-size: 16px;
     
          line-height: 24px;
        }
      `}</style>
    </article>
  );
};
