import { IsArray, IsOptional, IsString, } from 'class-validator';
import { RegisterRequestDto } from './RegisterRequestDto';
export class RegisterStudentDto extends RegisterRequestDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    enrolled_courses: string[] = [];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    course_pref?: string[]; // Course preferences (e.g., "Math", "Science")
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    instructors?: string[] = []; // List of instructor IDs
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    certificates?: string[] = []; // List of certificate IDs
  }
  