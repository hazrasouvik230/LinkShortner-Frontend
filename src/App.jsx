// import React, { useState } from 'react';
// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './pages/LoginPage/Login';
// import Dashboard from './pages/DashboardPage/Dashboard';
// import Links from './pages/LinksPage/Links';
// import Analytics from './pages/AnalyticsPage/Analytics'
// import Settings from './pages/SettingsPage/Settings'

// const App = () => {
//   const [links, setLinks] = useState([]);

//   const addNewLink = (newLink) => {
//     const updatedLinks = [...links];
//     const id = updatedLinks.length ? updatedLinks[updatedLinks.length - 1].id + 1 : 1;
//     const now = new Date();
//     const newDate = now.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//     updatedLinks.push({
//       id,
//       date: newDate,
//       originalLink: newLink.destinationUrl,
//       shortLink: 'https://cl.ly/shortLinkPlaceholder', // Placeholder for the short link
//       remarks: newLink.remarks,
//       clicks: 0,
//       status: 'Active',
//     });

//     setLinks(updatedLinks);
//   };

//   const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0); // Calculate total clicks

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard links={links} totalClicks={totalClicks} />} />
//           <Route path="/links" element={<Links links={links} addNewLink={addNewLink} setLinks={setLinks} />} />
//           <Route path="/analytics" element={<Analytics links={links} />} />
//           <Route path="/settings" element={<Settings links={links} />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Links from "./pages/LinksPage/Links";
import Analytics from "./pages/AnalyticsPage/Analytics";
import Settings from "./pages/SettingsPage/Settings";
import axios from "axios";

const App = () => {
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState(null); // User state

  // Fetch user data
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token"); // Clear token on error
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const addNewLink = (newLink) => {
    const updatedLinks = [...links];
    const id = updatedLinks.length ? updatedLinks[updatedLinks.length - 1].id + 1 : 1;
    const now = new Date();
    const newDate = now.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    updatedLinks.push({
      id,
      date: newDate,
      originalLink: newLink.destinationUrl,
      shortLink: "https://cl.ly/shortLinkPlaceholder", // Placeholder for the short link
      remarks: newLink.remarks,
      clicks: 0,
      status: "Active",
    });

    setLinks(updatedLinks);
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard links={links} totalClicks={totalClicks} user={user} />} />
          <Route path="/links" element={<Links links={links} addNewLink={addNewLink} setLinks={setLinks} user={user} />} />
          <Route path="/analytics" element={<Analytics links={links} user={user} />} />
          <Route path="/settings" element={<Settings links={links} user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;