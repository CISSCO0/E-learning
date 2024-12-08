import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionSchema } from '../models/questions.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Questions', schema: QuestionSchema }])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
