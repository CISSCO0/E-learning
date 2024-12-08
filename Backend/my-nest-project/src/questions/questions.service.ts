import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questions } from '../models/questions.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Questions') private readonly questionsModel: Model<Questions>,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Questions> {
    const question = new this.questionsModel(createQuestionDto);
    return question.save();
  }

  async getQuestions(): Promise<Questions[]> {
    return this.questionsModel.find().exec();
  }

  async getQuestionById(id: string): Promise<Questions> {
    return this.questionsModel.findById(id).exec();
  }

  async updateQuestion(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Questions> {
    return this.questionsModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
  }

  async deleteQuestion(id: string): Promise<any> {
    return this.questionsModel.findByIdAndDelete(id).exec();
  }

  async getQuestionsByQuiz(quizId: string) {
    return this.questionsModel.find({ quizId }).exec();
  }
  
  async getQuestionsByLevel(quizId: string, level: string) {
    return this.questionsModel.find({ quizId, level }).exec();
  }
 
  
}
