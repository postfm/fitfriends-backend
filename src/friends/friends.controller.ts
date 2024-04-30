import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post(':friend_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  create(@Req() req, @Param('friend_id') friend_id: string) {
    return this.friendsService.create(+req.user.sub, +friend_id);
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  findAll(@Req() req) {
    return this.friendsService.findAll(+req.user.sub);
  }

  @Delete(':friend_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  remove(@Param('friend_id') friend_id: string, @Req() req) {
    return this.friendsService.remove(+req.user.sub, +friend_id);
  }

  @Get('trainer')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  trainerFindAll(@Req() req) {
    return this.friendsService.trainerFindAll(+req.user.sub);
  }
}
