export interface Student {
    _id?: string; // Optional ID field
    enrolled_courses: string[]; // Array of enrolled course IDs or names
    course_pref: string[]; // Array of course preferences
    instructors: string[]; // Array of instructor IDs or names (assumed as strings)
    certificates: string[]; // Array of certificate IDs or names (assumed as strings)
    user_id: string; // User ID of the student
    __v: number; // Versioning field
  }
  