"use client";

import { useEffect, useState } from 'react';
import './styles/global.css';
import './styles/styles.css';
import './welcome.module.css';

interface Instructor {
  id: number;
  name: string;
  expertise: string;
  rating: number;
}

export default function BestInstructors() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('http://localhost:5000/instructors');
        const data: Instructor[] = await response.json();

        // Sort and limit to top 3
        const bestInstructors = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        setInstructors(bestInstructors);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Best Instructors</h2>
        <div className="card-grid">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="card">
              <h3 className="card-title">{instructor.name}</h3>
              <p>{instructor.expertise}</p>
              <p>Rating: {instructor.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
