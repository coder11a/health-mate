"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [familyProfiles, setFamilyProfiles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  useEffect(() => {
    // Redirect if not signed in
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    
    // Load family profiles from local storage
    const loadProfiles = () => {
      if (typeof window !== "undefined" && user) {
        const userId = user.id;
        const storedProfiles = localStorage.getItem(`healthMate_${userId}_profiles`);
        if (storedProfiles) {
          setFamilyProfiles(JSON.parse(storedProfiles));
        }
      }
    };
    
    loadProfiles();
  }, [isSignedIn, user, router]);
  
  const saveProfiles = (profiles) => {
    if (typeof window !== "undefined" && user) {
      localStorage.setItem(`healthMate_${user.id}_profiles`, JSON.stringify(profiles));
      setFamilyProfiles(profiles);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-10">
      {/* Navbar - simplified for this example */}
      <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-5 shadow-md text-white fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-wide">Health Mate</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-lg">Welcome, {user?.firstName || "User"}</span>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-800">Family Profiles</h2>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Create New Profile
          </button>
        </div>
        
        {familyProfiles.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg mb-4">No family profiles created yet.</p>
            <p className="text-gray-600">Create your first family profile to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyProfiles.map((profile) => (
              <div key={profile.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{profile.name}</h3>
                <p className="text-gray-600 mb-1">Age: {profile.age}</p>
                <p className="text-gray-600 mb-1">Relation: {profile.relation}</p>
                <button 
                  onClick={() => router.push(`/profile/${profile.id}`)}
                  className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition w-full"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Create Profile Modal */}
      {showCreateModal && (
        <CreateProfileModal 
          onClose={() => setShowCreateModal(false)}
          onSave={(newProfile) => {
            const updatedProfiles = [...familyProfiles, {
              ...newProfile,
              id: Date.now().toString()
            }];
            saveProfiles(updatedProfiles);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function CreateProfileModal({ onClose, onSave }) {
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    gender: "",
    relation: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    medications: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profileData);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">Create Family Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Relation</label>
              <select
                name="relation"
                value={profileData.relation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="Self">Self</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Blood Type</label>
              <select
                name="bloodType"
                value={profileData.bloodType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Allergies</label>
            <textarea
              name="allergies"
              value={profileData.allergies}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List any allergies (if none, type 'None')"
              rows="2"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Medical Conditions</label>
            <textarea
              name="medicalConditions"
              value={profileData.medicalConditions}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List any medical conditions (if none, type 'None')"
              rows="2"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Current Medications</label>
            <textarea
              name="medications"
              value={profileData.medications}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List any medications (if none, type 'None')"
              rows="2"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >     
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}