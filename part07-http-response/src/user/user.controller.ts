import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

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

  @Get('custom-response')
  customResponse(@Res() res: Response) {
    const data = { message: 'This is a custom response' };
    res.setHeader('Custom-Header', 'MyHeaderValue');
    res.status(200).json(data); // Menetapkan status dan mengembalikan data
  }

  @Get(':id')
  @HttpCode(200) // // Menetapkan status kode 201 Created
  getUserById(@Param('id') id: string) {
    // ini contoh penggunaan response default
    const user = this.userService.getUserById(Number(id));
    if (!user) {
      throw new NotFoundException('User not found'); // Mengembalikan status 404
    }
    return user;
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
