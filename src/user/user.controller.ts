import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User Successfully Created',
      user,
    });
  }

  @Get()
  async getUsers(@Res() res) {
    const user = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') id) {
    const user = await this.userService.deleteUser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User Deleted Successfully',
      user,
    });
  }

  @Put('/:id')
  async updateUser(
    @Res() res,
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id') id,
  ) {
    const user = await this.userService.updateUser(id, updateUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User Updated Successfully',
      user,
    });
  }
}
