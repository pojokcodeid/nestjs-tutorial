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
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';

interface Cookies {
  [key: string]: string;
}

function isCookies(obj: any): obj is Cookies {
  return typeof obj === 'object' && obj !== null;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // contoh view ejs
  @Get('view')
  @Render('index')
  getHello(): object {
    return {
      title: 'Welcome Nest EJS',
      subtitle: 'ini adalah view dengan ejs',
    };
  }

  // penggunaan cookie
  @Get('set-cookie')
  setCookie(@Res() res: Response) {
    // Menyetel cookie bernama 'username' dengan nilai 'Alice'
    res.cookie('username', 'Alice', { httpOnly: true, maxAge: 3600000 }); // Cookie berlaku selama 1 jam
    return res.send({ message: 'Cookie has been set' });
  }

  @Get('get-cookie')
  getCookie(@Req() req: Request) {
    let username: string = '';
    const cookies = req.cookies as Cookies;
    if (isCookies(cookies)) {
      username = cookies['username'];
    }
    if (username) {
      return { message: `Hello, ${username}` };
    }
    return { message: 'No cookie found' };
  }

  @Get('clear-cookie')
  clearCookie(@Res() res: Response) {
    res.clearCookie('username'); // Menghapus cookie bernama 'username'
    return res.send({ message: 'Cookie has been cleared' });
  }

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
