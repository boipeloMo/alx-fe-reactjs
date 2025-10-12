import React from "react";
import { Link, Outlet } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

const Profile = () => {
  return (
    <div className="p-4">
      <h2>Profile Page</h2>

     
      <nav className="flex gap-4 mt-2">
        <Link to="details">Profile Details</Link>
        <Link to="settings">Profile Settings</Link>
      </nav>

     
      <div style={{ display: "none" }}>
        <ProfileDetails />
        <ProfileSettings />
      </div>

      
      <Outlet />
    </div>
  );
};

export default Profile;
