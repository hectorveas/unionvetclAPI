import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Admin } from 'src/admin/interfaces/admin.interface';
import { User } from 'src/user/interfaces/user.interface';
import { Public } from '../guards/decorators/public.decorator';
import { Console } from 'console';
import { UpdateAdminDTO } from 'src/admin/dto/admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('recover')
  async recover(@Req() req: Request, @Res() res) {
    const email = req.body.email;
    //const host = req.headers.host;
    const user: Admin = await this.authService.recoverPasswordAdmin(email);
    if (!user)
    {
      return res
        .status(401)
        .json({
          message:
            'The email address ' +
            req.body.email +
            ' is not associated with any account. Double-check your email address and try again.',
        });
    } return res.status(200).json({ message: 'Password recovery email sent' });
  }

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

  @Public()
  @Get('reset/:token')
  async reset (@Req() req: Request, @Res() res) {
    let user = req.user as Admin;
    const token = req.params.token;
    user = await this.authService.resetAdmin(token);
    if (user)
    {
      if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

      //Redirect user to form with the email address
      res.render('reset', {user});
    }
  }

  @Public()
  @Post('reset')
  async resetPassword(@Req() req: Request, @Res() res) {
    let user = req.user as Admin;
    const token = req.body.token;
    const password = req.body.password;
    user = await this.authService.resetPasswordAdmin(token, password);
    if (user)
    {
      return res.status(200).json({message: 'Your password has been updated.', status: 200});
    } else {
      return res.status(401).json({message: 'Password reset token is invalid or has expired.', status: 401});
    }
  }
}
