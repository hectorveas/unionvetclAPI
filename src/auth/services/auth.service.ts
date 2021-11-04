import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/interfaces/admin.interface';
import { PayloadToken } from '../models/token.model';
import { User } from 'src/user/interfaces/user.interface';
import { SendGridService } from "@anchan828/nest-sendgrid";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly sendGrid: SendGridService
  ) {}

  async validateAdmin(email: string, password: string) {
    const user = await this.adminService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }

  generateAdminJWT(user: Admin) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }

  generateUserJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async recoverPasswordAdmin(email: string) {
    let userRecover = await this.adminService.findByEmail(email);
    if (userRecover) {
      userRecover = await this.adminService.generatePasswordReset(userRecover);
      if (userRecover) {
        // send email
        let link =
          'http://localhost:32456/password/recuperar-clave/' +
          userRecover.resetPasswordToken;
        
          await this.sendGrid.send({
            to: userRecover.email,
            from: process.env.FROM_EMAIL,
            subject: `CAMBIO DE CONTRASEÑA UNIONVET`,
            text: `Hi,\n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          });

        return userRecover;
      }
    }
    return null;
  }

  async resetAdmin(token: string) {
    let userRecover = await this.adminService.findByToken(token);
    if (userRecover) {
      return userRecover;
    }
    return null;
  }

  async resetPasswordAdmin(token: string, newPassword: string) {
    let userRecover = await this.adminService.findByToken(token);
    if (userRecover) {
      userRecover = await this.adminService.updatePassword(userRecover, newPassword);
      if (userRecover) {
          await this.sendGrid.send({
            to: userRecover.email,
            from: process.env.FROM_EMAIL,
            subject: `Your password has been changed`,
            text:`Hi,\n 
            This is a confirmation that the password for your account ${userRecover.email} has just been changed.\n`
          });
      }
      return userRecover;
    }
    return null;
  }
}
