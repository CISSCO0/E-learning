import { Controller, Get, Post, Put, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Get()
  getQuestions() {
    return this.questionsService.getQuestions();
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionsService.getQuestionById(id);
  }

  @Put(':id')
  updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  deleteQuestion(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(id);
  }

  @Get('/quiz/:quizId')
getQuestionsByQuiz(@Param('quizId') quizId: string) {
  return this.questionsService.getQuestionsByQuiz(quizId);
}

@Get('/quiz/:quizId/level/:level')
getQuestionsByLevel(
  @Param('quizId') quizId: string,
  @Param('level') level: string,
) {
  return this.questionsService.getQuestionsByLevel(quizId, level);
}


}
