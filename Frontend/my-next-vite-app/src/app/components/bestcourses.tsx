"use client"; // Ensures the component is treated as a client component

import { useEffect, useState } from 'react';
import './styles/global.css';
import './styles/styles.css';
import './welcome.module.css';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
}

export default function BestCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/courses'); // Adjust the URL if necessary
        const data: Course[] = await response.json();

        // Sort by rating and take the top 3 courses
        // const sortedCourses = data
        //   .sort((a, b) => b.rating - a.rating) // Sort in descending order of rating
        //   .slice(0, 3); // Take the top 3 courses

        // setCourses(sortedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Best Courses</h2>
        <div className="card-grid">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <h3 className="card-title">{course.title}</h3>
              <p>Instructor: {course.instructor}</p>
              <p>Rating: {course.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
