import React from "react";
import PublicRoute from "./PublicRoute";
import LandingLayout from "./LandingLayout/LandingLayout";

const LandingFrame = () => {
  return (
    <>
      <PublicRoute>
        <LandingLayout />
      </PublicRoute>
    </>
  );
};

export default LandingFrame;
