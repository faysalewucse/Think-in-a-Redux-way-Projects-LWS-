import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewAll() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/all-transactions")} className="view-all">
      View All Transactions. . .
    </div>
  );
}
