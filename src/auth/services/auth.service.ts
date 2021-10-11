import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/interfaces/admin.interface';
import { PayloadToken } from '../models/token.model';


@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService, private jwtService: JwtService ) {}

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

  generateJWT(user: Admin) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
        access_token: this.jwtService.sign(payload),
        user
    };
  }
}
