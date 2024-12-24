import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  course_id: string;  // Make course_id required

  @IsString()
  content: string;  // Make content required

  @IsDate()
  @IsOptional()
  last_updated?: Date;

  @IsString()
  title: string;  // Title of the note
}
