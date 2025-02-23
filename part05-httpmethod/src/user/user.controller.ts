import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Post()
  @HttpCode(201)
  addUser(@Body() newUser: { name: string }) {
    return this.userService.addUser(newUser.name);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@Param('id') id: string, @Body() updatedUser: { name: string }) {
    return this.userService.updateUser(Number(id), updatedUser.name);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
