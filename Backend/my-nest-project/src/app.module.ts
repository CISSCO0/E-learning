import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';  // Import LogsModule
import { AdminModule } from './admin/admin.module';
import { QuestionsModule } from './questions/questions.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { NotesModule } from './notes/notes.module';
import { StudentModule } from './student/student.module';
import { InstructorModule } from './instructor/instructor.module';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module'; // Import NotificationsModule

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),  // Ensure your MongoDB connection string is correct
    LogsModule, AdminModule, QuestionsModule, ConfigurationsModule, NotesModule, StudentModule, InstructorModule, UserModule, NotificationsModule, // Add NotificationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
