"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MedicineReminder from "../../components/MedicineReminder";

export default function ProfilePage({ params }) {
  // Properly unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const profileId = unwrappedParams.id;
  
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [medicalReports, setMedicalReports] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedText, setAnalyzedText] = useState("");
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  
  useEffect(() => {
    // Redirect if not signed in
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    
    // Load profile and medical reports from local storage
    const loadProfileData = () => {
      if (typeof window !== "undefined" && user) {
        const userId = user.id;
        const storedProfiles = localStorage.getItem(`healthMate_${userId}_profiles`);
        if (storedProfiles) {
          const profiles = JSON.parse(storedProfiles);
          const foundProfile = profiles.find(p => p.id === profileId);
          if (foundProfile) {
            setProfile(foundProfile);
            setEditData(foundProfile);
            
            // Load medical reports
            const storedReports = localStorage.getItem(`healthMate_${userId}_profile_${profileId}_reports`);
            if (storedReports) {
              setMedicalReports(JSON.parse(storedReports));
            }
          } else {
            router.push("/dashboard");
          }
        } else {
          router.push("/dashboard");
        }
      }
    };
    
    loadProfileData();
  }, [isSignedIn, user, router, profileId]);
  
  const handleSaveEdit = () => {
    if (typeof window !== "undefined" && user) {
      const userId = user.id;
      const storedProfiles = localStorage.getItem(`healthMate_${userId}_profiles`);
      if (storedProfiles) {
        const profiles = JSON.parse(storedProfiles);
        const updatedProfiles = profiles.map(p => 
          p.id === profileId ? { ...editData, id: profileId } : p
        );
        localStorage.setItem(`healthMate_${userId}_profiles`, JSON.stringify(updatedProfiles));
        setProfile(editData);
        setIsEditing(false);
      }
    }
  };
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      if (typeof window !== "undefined" && user) {
        const userId = user.id;
        const storedProfiles = localStorage.getItem(`healthMate_${userId}_profiles`);
        if (storedProfiles) {
          const profiles = JSON.parse(storedProfiles);
          const updatedProfiles = profiles.filter(p => p.id !== profileId);
          localStorage.setItem(`healthMate_${userId}_profiles`, JSON.stringify(updatedProfiles));
          
          // Also delete medical reports for this profile
          localStorage.removeItem(`healthMate_${userId}_profile_${profileId}_reports`);
          
          router.push("/dashboard");
        }
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
      e.target.value = null;
    }
  };
  
  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const newReport = {
        id: Date.now().toString(),
        name: selectedFile.name,
        date: new Date().toISOString(),
        content: fileContent,
        analysis: null,
      };
      
      const updatedReports = [...medicalReports, newReport];
      setMedicalReports(updatedReports);
      
      // Save to local storage
      if (typeof window !== "undefined" && user) {
        const userId = user.id;
        localStorage.setItem(`healthMate_${userId}_profile_${profileId}_reports`, JSON.stringify(updatedReports));
      }
      
      setSelectedFile(null);
      // Clear the file input
      document.getElementById("pdfFileInput").value = "";
    };
    
    reader.readAsDataURL(selectedFile);
  };
  
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportViewer(true);
  };
  
  const handleDeleteReport = (reportId) => {
    if (window.confirm("Are you sure you want to delete this medical report?")) {
      const updatedReports = medicalReports.filter(report => report.id !== reportId);
      setMedicalReports(updatedReports);
      
      // Save to local storage
      if (typeof window !== "undefined" && user) {
        const userId = user.id;
        localStorage.setItem(`healthMate_${userId}_profile_${profileId}_reports`, JSON.stringify(updatedReports));
      }
      
      // Close the viewer if the current report is being deleted
      if (selectedReport && selectedReport.id === reportId) {
        setShowReportViewer(false);
        setSelectedReport(null);
      }
      
      // Close the analysis modal if the current report is being deleted
      if (selectedReport && selectedReport.id === reportId) {
        setShowAnalysisModal(false);
      }
    }
  };

  const handleAnalyzeReport = async (report) => {
    setSelectedReport(report);
    setIsAnalyzing(true);
    setShowAnalysisModal(true);

    try {
      // First, we need to extract text from the PDF
      // Using PDF.js API to extract text (for demo purposes)
      const extractedText = await extractTextFromPDF(report.content);
      
      // Then, we'll use the free text analysis API to summarize the content
      const summary = await summarizeText(extractedText);
      
      // Update the report with the analysis
      const updatedReports = medicalReports.map(r => {
        if (r.id === report.id) {
          return {
            ...r,
            analysis: {
              extractedText,
              summary,
              date: new Date().toISOString()
            }
          };
        }
        return r;
      });
      
      setMedicalReports(updatedReports);
      setAnalyzedText(summary);
      
      // Save to local storage
      if (typeof window !== "undefined" && user) {
        const userId = user.id;
        localStorage.setItem(`healthMate_${userId}_profile_${profileId}_reports`, JSON.stringify(updatedReports));
      }
    } catch (error) {
      console.error("Error analyzing PDF:", error);
      setAnalyzedText("Error analyzing the PDF. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to extract text from PDF using PDF.js
  const extractTextFromPDF = async (pdfDataUrl) => {
    // In a real application, you would likely use a server or API for this
    // For demonstration, we'll return a mock text extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`This is the extracted text from the PDF document. 
        In a real application, this would be the actual text extracted from the PDF using PDF.js or a similar library.
        The report appears to be about ${profile.name}'s medical condition.
        Lab results show normal levels for most parameters.
        Doctor's notes indicate follow-up required in 3 months.`);
      }, 1500);
    });
  };

  // Function to summarize text using a free API
  const summarizeText = async (text) => {
    // In a real application, you would use an actual API like:
    // - HuggingFace Inference API (has free tier)
    // - OpenAI API (not free but common choice)
    // - Azure AI Language Service (has free tier)
    
    // For demonstration, we'll simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Medical Report Summary:
        
        Patient: ${profile.name}
        Date: ${new Date().toLocaleDateString()}
        
        Key Findings:
        - All vital signs within normal range
        - Blood tests show normal liver and kidney function
        - Cholesterol levels slightly elevated (recommend dietary changes)
        - No signs of acute illness or infection
        
        Recommendations:
        - Maintain current medication regimen
        - Schedule follow-up appointment in 3 months
        - Consider nutritional counseling for cholesterol management
        - Continue regular exercise program`);
      }, 3000);
    });
  };

  if (!profile) {
    return <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-10 text-black">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-5 shadow-md text-white fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-wide">Health Mate</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button className="px-4 py-1 bg-white text-blue-600 rounded-full shadow-sm hover:bg-blue-100 transition">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-800">
              {isEditing ? "Edit Profile" : profile.name}
            </h2>
            <div className="space-x-2">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              {/* Edit form fields - same as before */}
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={editData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={editData.gender}
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Relation</label>
                  <select
                    name="relation"
                    value={editData.relation}
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
                    value={editData.bloodType}
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
              
              <div>
                <label className="block text-gray-700 mb-1">Allergies</label>
                <textarea
                  name="allergies"
                  value={editData.allergies}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Medical Conditions</label>
                <textarea
                  name="medicalConditions"
                  value={editData.medicalConditions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Current Medications</label>
                <textarea
                  name="medications"
                  value={editData.medications}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 flex items-center space-x-2 mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>Personal Information</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-blue-100 pb-2">
                      <span className="text-sm font-medium text-blue-700">Age</span>
                      <span className="text-sm text-blue-900">{profile.age}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-100 pb-2">
                      <span className="text-sm font-medium text-blue-700">Gender</span>
                      <span className="text-sm text-blue-900">{profile.gender}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-100 pb-2">
                      <span className="text-sm font-medium text-blue-700">Relation</span>
                      <span className="text-sm text-blue-900">{profile.relation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-blue-700">Blood Type</span>
                      <span className="text-sm text-blue-900">{profile.bloodType || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                  <h3 className="text-lg font-semibold text-indigo-800 flex items-center space-x-2 mb-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Medical Information</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-1">Allergies</h4>
                      <p className="text-sm text-indigo-900 bg-white/50 p-3 rounded-lg">
                        {profile.allergies || "None specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-1">Medical Conditions</h4>
                      <p className="text-sm text-indigo-900 bg-white/50 p-3 rounded-lg">
                        {profile.medicalConditions || "None specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-indigo-700 mb-1">Current Medications</h4>
                      <p className="text-sm text-indigo-900 bg-white/50 p-3 rounded-lg">
                        {profile.medications || "None specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <MedicineReminder profileId={profileId} />

        {/* Medical Reports Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Medical Reports</h2>
          
          {/* File Upload Area */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Upload New Report</h3>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="file"
                id="pdfFileInput"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <button
                onClick={handleFileUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Upload Report
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">Only PDF files are supported</p>
          </div>
          
          {/* Reports List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Saved Reports</h3>
            {medicalReports.length === 0 ? (
              <p className="text-gray-500 italic">No medical reports uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {medicalReports.map(report => (
                  <div key={report.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{report.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(report.date).toLocaleDateString()}
                        </p>
                        {report.analysis && (
                          <span className="inline-block px-2 py-0.5 text-xs text-green-800 bg-green-100 rounded">
                            Analyzed
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleAnalyzeReport(report)}
                        className={`px-3 py-1 rounded ${
                          report.analysis 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        {report.analysis ? 'Show Analysis' : 'Analyze'}
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* PDF Viewer Modal */}
      {showReportViewer && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedReport.name}
              </h3>
              <button
                onClick={() => setShowReportViewer(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-auto p-4">
              <iframe
                src={selectedReport.content}
                className="w-full h-full border-0"
                title={selectedReport.name}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Modal */}
      {showAnalysisModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Analysis: {selectedReport.name}
              </h3>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-auto p-4 space-y-4">
              {isAnalyzing ? (
                <div className="h-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-blue-600">Analyzing document...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Summary
                    </h4>
                    <div className="bg-blue-50 text-black rounded-lg p-4 whitespace-pre-line">
                      {selectedReport.analysis ? selectedReport.analysis.summary : analyzedText}
                    </div>
                  </div>
                  
              
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Analysis performed on {selectedReport.analysis 
                        ? new Date(selectedReport.analysis.date).toLocaleString() 
                        : new Date().toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Note: This analysis is for informational purposes only and should not replace professional medical advice.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}