import { IsString, IsOptional } from 'class-validator';

export class RegisterInstructorDto {
  @IsString()
  department: string;

  @IsString()
  @IsOptional()
  specialization?: string; // Optional field for additional details
}
