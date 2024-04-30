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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Friend } from './dto/friend.api';
import { UserRdo } from 'src/users/rdo/user.rdo';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiCreatedResponse({
    description: 'The user has been successfully added as a friend',
    type: Friend,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'This user already is your friend!',
  })
  @Post(':friend_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  create(@Req() req, @Param('friend_id') friend_id: string) {
    return this.friendsService.create(+req.user.sub, +friend_id);
  }

  @ApiOkResponse({
    type: UserRdo,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'You are not have friends!',
  })
  @Get()
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  findAll(@Req() req) {
    return this.friendsService.findAll(+req.user.sub);
  }

  @ApiBadRequestResponse({
    description: 'You are not have friends!',
  })
  @Delete(':friend_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  remove(@Param('friend_id') friend_id: string, @Req() req) {
    return this.friendsService.remove(+req.user.sub, +friend_id);
  }

  @ApiOkResponse({
    type: UserRdo,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'You are not have friends!',
  })
  @Get('trainer')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  trainerFindAll(@Req() req) {
    return this.friendsService.trainerFindAll(+req.user.sub);
  }
}
