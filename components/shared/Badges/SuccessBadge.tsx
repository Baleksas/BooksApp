import React from "react";

const SuccessBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="badge badge-success badge-outline gap-2 p-4">
      {children}
    </div>
  );
};

export default SuccessBadge;
