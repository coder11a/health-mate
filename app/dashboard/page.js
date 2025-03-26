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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    
    const loadProfiles = () => {
      if (typeof window !== "undefined" && user) {
        setIsLoading(true);
        const userId = user.id;
        const storedProfiles = localStorage.getItem(`healthMate_${userId}_profiles`);
        if (storedProfiles) {
          setFamilyProfiles(JSON.parse(storedProfiles));
        }
        setIsLoading(false);
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen pt-24 pb-10">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 shadow-lg text-white fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold tracking-tight">Health Mate</h1>
          </Link>
          <div className="flex items-center space-x-6">
            <span className="text-lg font-medium">
              {user?.firstName || "User"}
            </span>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Family Profiles</h2>
            <p className="text-gray-600 mt-1">Manage your family's health information</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create New Profile
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : familyProfiles.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">No family profiles created yet.</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyProfiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                    <p className="text-sm text-gray-500">{profile.relation}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => deleteProfile(profile.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                      title="Delete profile"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Age</p>
                    <p className="text-gray-700 font-medium">{profile.age} years</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</p>
                    <p className="text-gray-700 font-medium">{profile.gender || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</p>
                    <p className="text-gray-700 font-medium">{profile.bloodType || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Allergies</p>
                    <p className="text-gray-700 font-medium truncate" title={profile.allergies}>
                      {profile.allergies ? profile.allergies.split(',')[0] : 'None'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => router.push(`/profile/${profile.id}`)}
                    className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View
                  </button>
            
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      {/* Fixed Modal Implementation */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
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
          </div>
        </div>
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Create Family Profile</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
              <select
                name="relation"
                value={profileData.relation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <select
                name="bloodType"
                value={profileData.bloodType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
            <textarea
              name="allergies"
              value={profileData.allergies}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="2"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
            <textarea
              name="medicalConditions"
              value={profileData.medicalConditions}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="2"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medications</label>
            <textarea
              name="medications"
              value={profileData.medications}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="2"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >     
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
}