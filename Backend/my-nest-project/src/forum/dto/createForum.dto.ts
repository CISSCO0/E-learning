import { IsArray, IsString } from 'class-validator';

export class CreateForumDto {
  @IsString()
  courseId: string;

  @IsArray()
  @IsString({ each: true })
  threads: string[] = [];

  @IsString()
  instructorId: string
  }