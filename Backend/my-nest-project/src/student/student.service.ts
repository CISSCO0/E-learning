import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  async createStudent(userId: string, registerStudentDto: any): Promise<void> {
    // Add student-specific logic here
    console.log(`Student created for user ID: ${userId}`, registerStudentDto);
  }
}
