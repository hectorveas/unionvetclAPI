import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Admin } from 'src/admin/interfaces/admin.interface';
import { User } from 'src/user/interfaces/user.interface';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login/admin')
  login(@Req() req: Request) {
    const user = req.user as Admin;
    return this.authService.generateAdminJWT(user);
  }

  @UseGuards(AuthGuard('user'))
  @Post('login/user')
  loginUser(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateUserJWT(user);
  }
}