import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { ChatService } from './chat.services';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
 async  getAllChats() {
    return await  this.chatService.getAllChats();
  }


  @Get(':id')

  async getChatById(@Param('id') id: string) {
    return await this.chatService.getChatById(id);
  }

  @Post()
  async createChat(@Body() data: any) {
    console.log("mannnnn")
    return await this.chatService.createChat(data);
  }

   @Put(':id')
  async updateChat(@Param('id') id: string, @Body() updateData: any) {
    return await this.chatService.updateChat(id, updateData);
  }

  @Delete(':id')
 async deleteChat(@Param('id') id: string) {
    return await this.chatService.deleteChat(id);
  }

  @Get('users/:userId')
  async getChatsForUser(@Param('userId') userId: string) {
    console.log("menna");
    return await this.chatService.getChatsForUser(userId);
  }
}
