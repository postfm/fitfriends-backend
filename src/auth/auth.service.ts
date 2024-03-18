import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { fillDto, verifyPassword } from 'src/helpers/common';
import { UserInterface } from 'src/helpers/types/user.interface';
import { UserRdo } from 'src/users/rdo/user.rdo';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!(await verifyPassword(password, user.password)) && !user) {
      throw new UnauthorizedException();
    }

    return fillDto(UserRdo, user);
  }

  async login(user: UserInterface) {
    const { id, email, role } = user;
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      id,
      email,
      role,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
