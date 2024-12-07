/*import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from '../auth/guards/authentication.guard'; // Adjust path if necessary
import { AuthorizationGuard } from '../auth/guards/authorization.guard'; // Adjust path if necessary
import { Roles } from '../auth/decorators/roles.decorator'; // Adjust path if necessary
import { Role } from '../auth/decorators/roles.decorator'; // Adjust path if necessary

@Controller('notifications')
@UseGuards(AuthGuard) // Apply AuthGuard globally to this controller
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Create a notification
  @Post()
  @Roles(Role.Admin, Role.Instructor) // Only admins and instructors can create notifications
  @UseGuards(AuthorizationGuard) // Ensure the user has the required role
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  // Get all notifications
  @Get()
  @Roles(Role.Admin, Role.Instructor, Role.Student) // Any user with a role can view notifications
  @UseGuards(AuthorizationGuard)
  async findAll() {
    return this.notificationsService.findAll();
  }

  // Get a specific notification
  @Get(':id')
  @Roles(Role.Admin, Role.Instructor) // Only admins and instructors can view a single notification
  @UseGuards(AuthorizationGuard)
  async findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  // Update a notification
  @Patch(':id')
  @Roles(Role.Admin, Role.Instructor) // Only admins and instructors can update notifications
  @UseGuards(AuthorizationGuard)
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  // Delete a notification
  @Delete(':id')
  @Roles(Role.Admin) // Only admins can delete notifications
  @UseGuards(AuthorizationGuard)
  async remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }

  // Mark notification as read
  @Patch(':id/read')
  @Roles(Role.Admin, Role.Instructor, Role.Student) // Any role can mark notifications as read
  @UseGuards(AuthorizationGuard)
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  // Get unread notifications count
  @Get('unread-count')
  @Roles(Role.Admin, Role.Instructor, Role.Student)
  @UseGuards(AuthorizationGuard)
  async getUnreadCount() {
    return this.notificationsService.getUnreadCount();
  }

  // Send bulk notifications
  @Post('bulk-send')
  @Roles(Role.Admin) // Only admins can send bulk notifications
  @UseGuards(AuthorizationGuard)
  async bulkSend(@Body() bulkNotificationDto: { userIds: string[], message: string }) {
    return this.notificationsService.bulkSend(bulkNotificationDto.userIds, bulkNotificationDto.message);
  }

  // Get notifications by type
  @Get('by-type')
  @Roles(Role.Admin, Role.Instructor, Role.Student)
  @UseGuards(AuthorizationGuard)
  async findByType(@Query('type') type: string) {
    return this.notificationsService.findByType(type);
  }

  // Stream real-time notifications via SSE or WebSocket
  @Get('real-time')
  @Roles(Role.Admin, Role.Instructor, Role.Student)
  @UseGuards(AuthorizationGuard)
  async streamNotifications(@Res() res) {
    return this.notificationsService.streamNotifications(res);
  }
}*/
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
// import { AuthGuard } from '../auth/guards/authentication.guard'; // Remove authentication guard for testing
// import { AuthorizationGuard } from '../auth/guards/authorization.guard'; // Remove authorization guard for testing
// import { Roles } from '../auth/decorators/roles.decorator'; // Remove roles decorator for testing
// import { Role } from '../auth/decorators/roles.decorator'; // Remove roles enum for testing

@Controller('notifications')
// @UseGuards(AuthGuard) // Disable authentication globally for testing
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Create a notification
  @Post()
  // @Roles(Role.Admin, Role.Instructor) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }
//workeddddddddddd
  // Get all notifications
  @Get()
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async findAll() {
    return this.notificationsService.findAll();
  }
//workeddddddddddd
  // Get a specific notification
  @Get(':id')
  // @Roles(Role.Admin, Role.Instructor) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  @Get(':id')
  async getNotification(@Param('id') id: string) {
    try {
      const result = await this.notificationsService.findOne(id);
      return result; // This could either be a notification or the unread count
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
//workeddddddddddd
  // Update a notification
  @Patch(':id')
  // @Roles(Role.Admin, Role.Instructor) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  // Delete a notification
  @Delete(':id')
  // @Roles(Role.Admin) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
//workeddddddddddd
  // Mark notification as read
  @Patch(':id/read')
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
//workeddddddddddd
  // Get unread notifications count
  @Get('unread-count')
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async getUnreadCount() {
    return this.notificationsService.getUnreadCount();
  }
//workeddddddddddd
  // Send bulk notifications
  @Post('bulk-send')
  // @Roles(Role.Admin) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async bulkSendNotifications(
    @Query('type') type: string,       // Get type from query params
    @Query('senderId') senderId: string, // Optional senderId from query params
    @Body() { userIds, message }: { userIds: string[], message: string }  // Get userIds and message from the body
  ) {
    return this.notificationsService.bulkSend(userIds, message, type, senderId);
  }

//workeddddddddddd
  // Get notifications by type
  /* @Get('by-type')
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
 async findByType(@Query('type') type: string) {
    return this.notificationsService.findByType(type);
  }
*/
  // Stream real-time notifications via SSE or WebSocket
 /* @Get('real-time')
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async streamNotifications(@Res() res) {
    return this.notificationsService.streamNotifications(res);
  }*/
}

