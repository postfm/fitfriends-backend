import { AuthError } from './../helpers/constants/auth.constant';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { fillDto, getHash, verifyHash } from 'src/helpers/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRdo } from 'src/users/rdo/user.rdo';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!(await verifyHash(password, user.password)) && !user) {
      throw new UnauthorizedException();
    }

    return fillDto(UserRdo, user);
  }

  async register(createUserDto: CreateUserDto) {
    const existsUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existsUser) throw new BadRequestException(AuthError.EmailAlreadyExists);

    const hashedPassword = await getHash(createUserDto.password);

    const newUser = await this.userRepository.save({
      ...createUserDto,
      password: String(hashedPassword),
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.roles,
    );
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    const currentUser = fillDto(UserRdo, newUser);

    return { tokens, currentUser };
  }

  async login(data: AuthDto) {
    const user = await this.usersService.findOneByEmail(data.email);
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    const currentUser = fillDto(UserRdo, user);
    return { tokens, currentUser };
  }

  async logout(userId: number) {
    return this.usersService.update(userId, { refreshToken: '' });
  }

  async getTokens(userId: number, email: string, roles: string[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles,
        },
        {
          secret: this.configService.get<string>('JWT_AT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_AT_EXPIRES_IN'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles,
        },
        {
          secret: this.configService.get<string>('JWT_RT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_RT_EXPIRES_IN'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await getHash(refreshToken);
    this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException(AuthError.AccessDenied);
    const refreshTokenMatches = await verifyHash(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches)
      throw new ForbiddenException(AuthError.AccessDenied);
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
