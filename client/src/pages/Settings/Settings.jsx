import React from "react";
import { useAuth } from "../../context/AuthContext";
import AccountSettings from "../../components/AccountSettings";

const SettingsPage = () => {
  const { user, deleteUserAccount } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const handleSave = (userData) => {};

  const handleDelete = () => {
    deleteUserAccount();
  };

  const initialUserData = {
    email: user?.email || "",
    name: user?.name || "",
  };

  return (
    <AccountSettings
      initialUserData={initialUserData}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
};

export default SettingsPage;
