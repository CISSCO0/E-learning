import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../models/users.schema'; // Assuming a User schema exists
import { CreateUserDto } from './dto/CreateUserDto'; // Define DTO for user creation

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async findByEmail(email: string): Promise<Users | null> {
    // Ensure password and role fields are included
    return this.userModel.findOne({ email }).select('+password +role').exec();
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  
}
