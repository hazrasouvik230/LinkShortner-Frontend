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

  const [analytics, setAnalytics] = useState([]);
  const addAnalyticsEntry = (entry) => {
    setAnalytics((prevAnalytics) => [...prevAnalytics, entry]);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug: Check if token exists
    if (!token) return;
  
    try {
      const response = await axios.get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched user:", response.data.user); // Debug: Log fetched user data
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
    }
  };
  
  useEffect(() => {
    console.log("useEffect ran");
    fetchUser();
  }, []);  

  const fetchLinks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const response = await axios.get("http://localhost:5000/api/links", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(response.data.links);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };
  
  useEffect(() => {
    if (user) fetchLinks();
  }, [user]);  

  const addNewLink = async (newLink) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/links",
        { originalLink: newLink.destinationUrl, shortLink: "shortLinkPlaceholder", remarks: newLink.remarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLinks((prevLinks) => [...prevLinks, response.data.link]);
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };
  
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard links={links} totalClicks={totalClicks} user={user} addNewLink={addNewLink} />} />
          <Route path="/links" element={<Links links={links} addNewLink={addNewLink} setLinks={setLinks} user={user} addAnalyticsEntry={addAnalyticsEntry} />} />
          <Route path="/analytics" element={<Analytics links={links} user={user} addNewLink={addNewLink} analytics={analytics} />} />
          <Route path="/settings" element={<Settings links={links} user={user} addNewLink={addNewLink} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;