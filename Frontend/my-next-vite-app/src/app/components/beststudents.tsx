"use client";

import { useEffect, useState } from 'react';
import './styles/global.css';
import './styles/styles.css';
import './welcome.module.css';

interface Student {
  id: number;
  name: string;
  achievement: string;
  rating: number; // Assuming a "rating" or similar criterion exists
}

export default function BestStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/students'); // Adjust URL as needed
        const data: Student[] = await response.json();

        // Sort and limit to top 3 based on rating or achievement criteria
        const bestStudents = data
          .sort((a, b) => b.rating - a.rating) // Sort by rating (descending)
          .slice(0, 3); // Take the top 3 students

        setStudents(bestStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Best Students</h2>
        <div className="card-grid">
          {students.map((student) => (
            <div key={student.id} className="card">
              <h3 className="card-title">{student.name}</h3>
              <p>{student.achievement}</p>
              <p>Rating: {student.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
