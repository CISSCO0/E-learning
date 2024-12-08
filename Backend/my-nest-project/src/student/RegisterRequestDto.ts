import { IsString, IsOptional } from 'class-validator';

export class RegisterStudentDto {
  @IsString()
  course: string;

  @IsString()
  @IsOptional()
  year?: string; // Optional: E.g., "First Year", "Second Year"
}
