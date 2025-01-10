import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import LogoutDialog from "../../components/LogoutDialog/LogoutDialog";

const Logout = () => {
  const { logout } = useAuth();
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    // Clean up function to prevent memory leaks
    return () => setShowDialog(false);
  }, []);

  const handleCancel = () => {
    // Navigate back to the previous page
    window.history.back();
  };

  const handleConfirm = () => {
    logout();
  };

  return (
    <LogoutDialog
      open={showDialog}
      onClose={handleCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default Logout;
