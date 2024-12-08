import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  readonly quizId: string;

  @IsString()
  @IsEnum(['easy', 'medium', 'hard'])
  readonly level: string;
}
