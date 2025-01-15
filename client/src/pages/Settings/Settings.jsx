import React from "react";
import { useAuth } from "../../context/AuthContext";
import AccountSettings from "../../components/AccountSettings";
import { useUser } from "../../context/UserContext";

const SettingsPage = () => {
  const { user } = useAuth();
  const { updateUser, deleteUser } = useUser();

  // eslint-disable-next-line no-unused-vars
  const handleSave = async (userData) => {
    await updateUser(userData);
  };

  const handleDelete = async () => {
    await deleteUser();
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
