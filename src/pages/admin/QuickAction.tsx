import React from "react";

interface QuickActionProps {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  label,
  primary = false,
  onClick,
}) => {
  return (
    <button
      className={`quick-action ${primary ? "primary" : "secondary"}`}
      onClick={onClick}
    >
      {label}
   
    </button>
  );
};
