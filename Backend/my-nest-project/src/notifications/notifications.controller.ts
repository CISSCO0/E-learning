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
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
// Comment out the authentication guard for testing
// @UseGuards(AuthGuard) // Disable authentication globally for testing
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Create a notification
  @Post()
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  // Get all notifications
  @Get()
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async findAll() {
    return this.notificationsService.findAll();
  }

  // Get a specific notification
  @Get(':id')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async getNotification(@Param('id') id: string) {
    try {
      const result = await this.notificationsService.findOne(id);
      return result;
    } catch (error) {
      console.error(`Error fetching notification with ID ${id}:`, error.message);
      throw new Error(`Error fetching notification: ${error.message}`);
    }
  }
  @Get('user/:userId')
async getUserNotifications(@Param('userId') userId: string) {
  try {
    const notifications = await this.notificationsService.findByUserId(userId);
    return notifications;
  } catch (error) {
    console.error(`Error fetching notifications for user ${userId}:`, error.message);
    throw new Error(`Error fetching notifications: ${error.message}`);
  }
}

  // Update a notification
  @Patch(':id')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    console.log('Update request:', { id, updateNotificationDto });
    return this.notificationsService.update(id, updateNotificationDto);
  }

  // Delete a notification
  @Delete(':id')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }

  // Mark notification as read
  @Patch(':id/read')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  // Get unread notifications count
  @Get('unread-count')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async getUnreadCount() {
    return this.notificationsService.getUnreadCount();
  }

  // Send bulk notifications
  @Post('bulk-send')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async bulkSendNotifications(
    @Query('type') type: string,       // Get type from query params
    @Query('senderId') senderId: string, // Optional senderId from query params
    @Body() { userIds, message }: { userIds: string[], message: string }  // Get userIds and message from the body
  ) {
    return this.notificationsService.bulkSend(userIds, message, type, senderId);
  }

  // Get notifications by type
  /* @Get('by-type')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async findByType(@Query('type') type: string) {
    return this.notificationsService.findByType(type);
  } */

  // Stream real-time notifications via SSE or WebSocket
  /* @Get('real-time')
  // Comment out the roles and authorization guard for testing
  // @Roles(Role.Admin, Role.Instructor, Role.Student) // Disable roles for testing
  // @UseGuards(AuthorizationGuard) // Disable role-based authorization for testing
  async streamNotifications(@Res() res) {
    return this.notificationsService.streamNotifications(res);
  } */
}
