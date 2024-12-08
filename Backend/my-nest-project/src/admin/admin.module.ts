import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from '../models/admin.schema'; // Corrected import path
//import { JwtAuthGuard } from '../auth/guards/authentication.guard';
//import { RolesGuard } from '../auth/gaurds/roles.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]), 
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
