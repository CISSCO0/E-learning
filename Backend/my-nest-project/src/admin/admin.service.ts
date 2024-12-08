import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../models/admin.schema'; // Import Admin schema

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>, // Removed AdminDocument
  ) {}

  // Create a new admin
  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = new this.adminModel(createAdminDto);
    return admin.save(); 
  }

  // Get all admins
  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  // Get a single admin by ID
  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return admin;
  }

  // Update an existing admin
  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const updatedAdmin = await this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true }) 
      .exec();
    
    if (!updatedAdmin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return updatedAdmin;
  }

  // Delete an admin by ID
  async remove(id: string): Promise<Admin> {
    const deletedAdmin = await this.adminModel.findByIdAndDelete(id).exec();
    if (!deletedAdmin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return deletedAdmin;
  }
}
