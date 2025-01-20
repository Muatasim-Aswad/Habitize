import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./AppLayout/AppLayout";

const AppFrame = () => {
  return (
    <>
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    </>
  );
};

export default AppFrame;
