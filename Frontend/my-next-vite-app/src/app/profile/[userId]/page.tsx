"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import './profile.css';

interface UserProfile {
  name: string;
  email: string;
  pfp?: string;
  createtime: string;
  role: string;
}

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [roleSpecificData, setRoleSpecificData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", pfp: "" });
  const [rating, setRating] = useState<number | null>(null); // Add rating state

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const data: UserProfile = await response.json();
        setUser(data);
        setFormData({ name: data.name, email: data.email, pfp: data.pfp || "" });
        fetchRoleSpecificData(data.role, userId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    async function fetchRoleSpecificData(role: string, id: string) {
      const roleEndpoints: Record<string, string> = {
        "1": "admins",
        "2": "instructors",
        "3": "students",
      };

      if (!roleEndpoints[role]) {
        setRoleSpecificData({ error: "Role-specific data not available." });
        return;
      }

      try {
        const roleResponse = await fetch(
          `http://localhost:5000/${roleEndpoints[role]}/${id}`
        );
        if (!roleResponse.ok) {
          throw new Error(`Error fetching role-specific information.`);
        }

        const roleData = await roleResponse.json();
        setRoleSpecificData(roleData);
      } catch (err) {
        setRoleSpecificData({ error: "Failed to fetch role-specific information." });
      }
    }

    fetchUserData();
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }
      alert("User deleted successfully");
      setUser(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting user");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error updating user");
    }
  };

  const handleRatingSubmit = async () => {
    if (rating === null || rating < 1 || rating > 5) {
      alert("Please select a rating between 1 and 5.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/instructors/${roleSpecificData._id}/rate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) {
        throw new Error(`Error submitting rating: ${response.statusText}`);
      }
      const updatedInstructor = await response.json();
      alert("Rating submitted successfully!");
      setRoleSpecificData(updatedInstructor); // Update role-specific data with the new rating
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error submitting rating");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const roleMap: Record<string, string> = {
    "1": "Admin",
    "2": "Instructor",
    "3": "Student",
  };
  const roleLabel = roleMap[user.role] || "Unknown Role";

  return (
    <div className="profile-container">
      <div className="profile-card">
        {isEditing ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Profile Picture URL</label>
                <input
                  type="text"
                  value={formData.pfp}
                  onChange={(e) =>
                    setFormData({ ...formData, pfp: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="profile-header">
              <Image
                src={user.pfp || "/placeholder.svg"}
                alt={user.name}
                width={100}
                height={100}
                className="profile-avatar"
              />
              <div>
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-email">{user.email}</p>
                <p className="profile-email">Role: {roleLabel}</p>
              </div>
            </div>

            <div>
              <h2 className="profile-section-title">Join Date</h2>
              <p className="profile-bio">
                {new Date(user.createtime).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h2 className="profile-section-title">Role-Specific Information</h2>
              <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(roleSpecificData, null, 2)}
              </pre>
            </div>

            {user.role === "3" && roleSpecificData && roleSpecificData.field && (
              <div className="rating-section">
                <h2 className="profile-section-title">Rate Instructor</h2>
                <div>
                  <label>Rating (1-5): </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating || ""}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <button
                    onClick={handleRatingSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
