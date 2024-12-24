"use client";
import axios from "axios";
import React, { useState } from "react";
import ProfilePicture from "./components/pp";
import Button from "./components/button";
import "../dashboard/style/dashboard.css";
import { Student } from "./student.interface"; // Import the Student interface
import { Progress } from "./style/progress.interface";
const Dashboard = () => {
  const [data, setData] = useState<Student | null>(null); // State to store the fetched student object
  const [title, setTitle] = useState(""); // State to manage the title for the fetched data display
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage errors
  const [allProgress, setAllProgress] = React.useState<Progress[]>([]);
  const [finalGrade, setFinalGrade] = useState<string | null>(null);  // State for final grade



  const triggerBackup = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.post('http://localhost:5000/backup/manual', {}, {
      withCredentials: true, // Include if authentication is required
    });
    console.log(response.data); // Log the success message
    setFinalGrade('Backup created successfully!'); // Optionally show success message in the UI
  } catch (error) {
    console.error('Error triggering backup:', error);
    setError('Error triggering backup. Please try again later.');
  } finally {
    setLoading(false);
  }}

  const fetchFinalGrade = async (userId: string, courseId: string) => {
    setLoading(true);
    setError(null);
    setFinalGrade(null); // Reset final grade before fetching
  
    try {
      const response = await axios.get(`http://localhost:5000/progress/${userId}/${courseId}/final-grade`, {
        withCredentials: true, // Include if authentication is required
      });
      console.log("Final Grade:", response.data.finalGrade); // Debug log
      setFinalGrade(response.data.finalGrade); // Update the final grade state
    } catch (error) {
      console.error('Error fetching final grade:', error);
      setError('Error loading final grade. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  async function fetchAllProgress() {
    try {
      const response = await axios.get(`http://localhost:5000/progress`, {
        withCredentials: true, // Include if authentication is required
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all progress:', error);
      throw error;
    }
  }
React.useEffect(() => {
  async function loadAllProgress() {
    try {
      const progressData = await fetchAllProgress();
      setAllProgress(progressData);
    } catch (err) {
      console.error(err);
      setError('Error loading all progress. Please try again later.');
    }
  }
  loadAllProgress();
}, []);


  // Fetch data from the API
  const fetchData = async (url: string, title: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const result = await response.json();
      console.log("Fetched Data:", result); // Debug log
      setData(result);
      setTitle(title);
    } catch (error: any) {
      setError(error.message || "An error occurred");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const renderEnrolledCourses = () => {
    if (!data || !data.enrolled_courses || data.enrolled_courses.length === 0) {
      return <p>No enrolled courses found.</p>;
    }

    return (
      <ul>
        {data.enrolled_courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    );
  };

  // Rendering Certificates
  const renderCertificates = () => {
    if (!data || !data.certificates || data.certificates.length === 0) {
      return <p>No certificates found.</p>;
    }

    return (
      <ul>
        {data.certificates.map((certificate, index) => (
          <li key={index}>{certificate}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <ProfilePicture />
      </header>
      <main className="dashboard-buttons">
        <Button
          label="Instructors"
          onClick={() =>
            fetchData("http://localhost:5000/instructors", "Instructors")
          }
        />
        <Button
          label="Students"
          onClick={() =>
            fetchData("http://localhost:5000/students", "Students")
          }
        />
        <Button
          label="View All Courses"
          onClick={() =>
            fetchData("http://localhost:5000/courses/public", "All Courses")
          }
        />
        {/* Button for Enrolled Courses */}
        <Button
          label="Enrolled Courses"
          onClick={() =>
            fetchData(
              "http://localhost:5000/students/6754ad91d175f85994347dd2",
              "Enrolled Courses"
            )
          }
        />
        <Button
          label="Create Course"
          onClick={() =>
            fetchData("http://localhost:5000/courses", "Create Course")
          }
        />
        {/* Button for Certificates */}
        <Button
          label="Certificates"
          onClick={() =>
            fetchData(
              "http://localhost:5000/students/6754ad91d175f85994347dd2",
              "Certificates"
            )
          }
        />
        <Button
  label="Final Grade"
  onClick={() =>
    fetchData(
      "http://localhost:5000/progress/6754ab313113910689f09c54/67551c0a118170d90bf40ab6/final-grade", // Replace "course-id" with the actual course ID
      "Final Grade"
    )
  }
/>
<Button
  label="Create Backup"
  onClick={triggerBackup}
/>


        <Button label="Logs" />
        <Button label="Manage Accounts" />
    {/* <Button label="Create Backups" /> */}
        <Button label="Feedback" />
        <Button label="Announce" />
        <Button label="Reviews" />
        <Button label="Performance" />
        <h2>All User Progress</h2>
  {allProgress.length > 0 ? (
    <ul>
      {allProgress.map((progress, index) => (
        <li key={index}>
          <p>User ID: {progress.user_id}</p>
          <p>Course ID: {progress.course_id}</p>
          <p>Progress: {progress.completion_percentage}%</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>Loading all progress...</p>
  )}
        {/* Display Title */}
        {title && <h2>{title}</h2>}

        {/* Display Loading State */}
        {loading && <p>Loading...</p>}

        {/* Display Error Message */}
        {error && <p className="error-message">{error}</p>}
        {finalGrade && (
  <div>
    <h3>Final Grade:</h3>
    <p>{finalGrade}</p>
  </div>
)}



{finalGrade && (
  <div>
    <h3>Backup Status:</h3>
    <p>{finalGrade}</p>
  </div>
)}
        {/* Display Data */}
        {!loading && !error && title === "Enrolled Courses"
          ? renderEnrolledCourses()
          : title === "Certificates"
          ? renderCertificates()  // Render certificates if the title is "Certificates"
          : data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </main>
    </div>
  );
};

export default Dashboard;
