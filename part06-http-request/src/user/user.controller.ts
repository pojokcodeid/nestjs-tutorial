import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  // http://localhost:3000/user?name=Alice
  getAllUsers(@Query('name') name?: string) {
    if (name) {
      return this.userService
        .getAllUsers()
        .filter((user) => user.name === name);
    }
    return this.userService.getAllUsers();
  }

  @Get('request/info')
  // http://localhost:3000/user/request/info
  getRequestInfo(
    @Req() req: Request,
    @Headers() headers: Record<string, string>,
  ) {
    return {
      method: req.method,
      url: req.url,
      headers,
    };
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
