import { TokenResponse } from './dto/auth.api.';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserRdo } from 'src/users/rdo/user.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    type: UserRdo,
  })
  @ApiBadRequestResponse()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    type: TokenResponse,
  })
  @ApiBadRequestResponse()
  async login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  logout(@Req() req) {
    this.authService.logout(req.user['sub']);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOkResponse({
    type: TokenResponse,
  })
  @ApiBadRequestResponse()
  refreshTokens(@Req() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
