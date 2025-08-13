import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.username || decoded.user || "Unknown",
          email: decoded.email || "No email available",
        });
      } catch (error) {
        console.error("JWT decode failed:", error);
        localStorage.removeItem("access");
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  if (!user) {
    return <div className="text-center mt-20 text-white">Loading profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>
      <div className="space-y-3">
        <p className="text-lg">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
