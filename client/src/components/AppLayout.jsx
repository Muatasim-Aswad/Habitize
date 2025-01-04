import React from "react";

import LeftNavigation from "./LeftNavigation";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <LeftNavigation />
      <main style={{ flexGrow: 1, padding: "16px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
