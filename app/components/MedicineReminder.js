"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function MedicineReminder({ profileId }) {
  const { user } = useUser();
  const [reminders, setReminders] = useState([]);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    id: "",
    medicineName: "",
    dosage: "",
    time: "",
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    isActive: true,
  });
  const [notificationPermission, setNotificationPermission] = useState("default");

  // Request notification permission when component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationPermission(Notification.permission);
      
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);

  // Load reminders from local storage
  useEffect(() => {
    loadReminders();
  }, [user, profileId]);

  // Set up notification checking interval
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      checkForDueReminders();
    }, 10000); // Check every 30 seconds
    
    return () => clearInterval(notificationInterval);
  }, [reminders]);

  const loadReminders = () => {
    if (typeof window !== "undefined" && user && profileId) {
      const userId = user.id;
      const storedReminders = localStorage.getItem(`healthMate_${userId}_profile_${profileId}_reminders`);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    }
  };

  const saveReminders = (updatedReminders) => {
    if (typeof window !== "undefined" && user && profileId) {
      const userId = user.id;
      localStorage.setItem(`healthMate_${userId}_profile_${profileId}_reminders`, JSON.stringify(updatedReminders));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setNewReminder((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: !prev.days[day],
      },
    }));
  };

  const handleAddReminder = () => {
    // Validate form
    if (!newReminder.medicineName || !newReminder.dosage || !newReminder.time) {
      alert("Please fill all required fields.");
      return;
    }
    
    // Check if at least one day is selected
    const anyDaySelected = Object.values(newReminder.days).some(day => day);
    if (!anyDaySelected) {
      alert("Please select at least one day for the reminder.");
      return;
    }

    const updatedReminder = {
      ...newReminder,
      id: Date.now().toString(),
    };
    
    const updatedReminders = [...reminders, updatedReminder];
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
    
    // Reset form
    setNewReminder({
      id: "",
      medicineName: "",
      dosage: "",
      time: "",
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      isActive: true,
    });
    
    setIsAddingReminder(false);
  };

  const handleDeleteReminder = (id) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      const updatedReminders = reminders.filter(reminder => reminder.id !== id);
      setReminders(updatedReminders);
      saveReminders(updatedReminders);
    }
  };

  const handleToggleActive = (id) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    );
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  };

  const formatTimeForComparison = (timeStr) => {
    if (!timeStr) return { hours: 0, minutes: 0 };
    
    // Parse time in "8:00 AM" format
    const [timePart, period] = timeStr.split(' ');
    if (!timePart || !period) return { hours: 0, minutes: 0 };
    
    let [hours, minutes] = timePart.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return { hours, minutes };
  };

  const checkForDueReminders = () => {
    if (notificationPermission !== "granted" || !reminders.length) return;
    
    const now = new Date();
    // Get current day of week in lowercase
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[now.getDay()];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    console.log(`Checking reminders: ${currentDay} ${currentHour}:${currentMinute}`);
    
    reminders.forEach(reminder => {
      // Skip if reminder is inactive or not for today
      if (!reminder.isActive || !reminder.days[currentDay]) return;
      
      const { hours, minutes } = formatTimeForComparison(reminder.time);
      
      console.log(`Checking reminder: ${reminder.medicineName} - scheduled for ${hours}:${minutes}`);
      
      // Check if it's time for the reminder (within the same minute)
      if (hours === currentHour && minutes === currentMinute) {
        console.log(`Sending notification for: ${reminder.medicineName}`);
        sendNotification(reminder);
      }
    });
  };

  const sendNotification = (reminder) => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        const notification = new Notification("Medicine Reminder", {
          body: `Time to take ${reminder.medicineName} - ${reminder.dosage}`,
          icon: "/favicon.ico",
          requireInteraction: true // Makes notification stay until user interacts with it
        });
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
        
        // Also show an alert as a fallback
        alert(`Medicine Reminder: Time to take ${reminder.medicineName} - ${reminder.dosage}`);
      } catch (error) {
        console.error("Error sending notification:", error);
        // Fallback to alert
        alert(`Medicine Reminder: Time to take ${reminder.medicineName} - ${reminder.dosage}`);
      }
    }
  };

  const requestNotificationPermission = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
        if (permission === "granted") {
          // Send a test notification
          new Notification("Notifications Enabled", {
            body: "You will now receive medicine reminders",
            icon: "/favicon.ico"
          });
        }
      }).catch(err => {
        console.error("Error requesting notification permission:", err);
        alert("Could not request notification permission. Please check your browser settings.");
      });
    }
  };

  const getDaysList = (days) => {
    const selectedDays = Object.entries(days)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1).substring(0, 2));
    
    return selectedDays.join(', ');
  };

  // Convert 24h time to 12h format for display
  const formatTime = (timeStr) => {
    return timeStr;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Medicine Reminders</h2>
        
        {notificationPermission !== "granted" && (
          <button
            onClick={requestNotificationPermission}
            className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
          >
            Enable Notifications
          </button>
        )}
      </div>
      
      {/* List of reminders */}
      {reminders.length === 0 ? (
        <p className="text-gray-500 italic mb-4">No medicine reminders set.</p>
      ) : (
        <div className="space-y-3 mb-6">
          {reminders.map(reminder => (
            <div 
              key={reminder.id} 
              className={`p-4 rounded-md flex justify-between items-center border-l-4 ${
                reminder.isActive ? 'border-l-green-500 bg-green-50' : 'border-l-gray-300 bg-gray-50'
              }`}
            >
              <div>
                <h3 className="font-semibold text-lg">{reminder.medicineName}</h3>
                <p className="text-gray-600">Dosage: {reminder.dosage}</p>
                <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                  <p>Time: {formatTime(reminder.time)}</p>
                  <p>Days: {getDaysList(reminder.days)}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleActive(reminder.id)}
                  className={`px-3 py-1 rounded ${
                    reminder.isActive 
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {reminder.isActive ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add new reminder button */}
      {!isAddingReminder ? (
        <button
          onClick={() => setIsAddingReminder(true)}
          className="w-full py-3 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 border border-blue-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add New Reminder
        </button>
      ) : (
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Add New Reminder</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Medicine Name</label>
              <input
                type="text"
                name="medicineName"
                value={newReminder.medicineName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Dosage</label>
              <input
                type="text"
                name="dosage"
                value={newReminder.dosage}
                onChange={handleInputChange}
                placeholder="e.g. 1 tablet, 5ml"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Time (12-hour format)</label>
              <input
                type="text"
                name="time"
                value={newReminder.time}
                onChange={handleInputChange}
                placeholder="e.g. 8:00 AM, 2:30 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Days</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.keys(newReminder.days).map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      newReminder.days[day]
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1).substring(0, 2)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleAddReminder}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Reminder
              </button>
              <button
                onClick={() => setIsAddingReminder(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      

    </div>
  );
}