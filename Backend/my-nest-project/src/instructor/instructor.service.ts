import { Injectable } from '@nestjs/common';

@Injectable()
export class InstructorService {
  async createInstructor(userId: string, registerInstructorDto: any): Promise<void> {
    // Add instructor-specific logic here
    console.log(`Instructor created for user ID: ${userId}`, registerInstructorDto);
  }
}
