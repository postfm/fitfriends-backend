import { RolesGuard } from './../../auth/guards/roles.guard';
import { AccessTokenGuard } from './../../auth/guards/access-token.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('subscribers')
@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post(':trainer_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: CreateSubscriberDto,
  })
  create(
    @Req() req,
    @Body() createSubscriberDto: CreateSubscriberDto,
    @Param('trainer_id') trainer_id: number,
  ) {
    return this.subscriberService.create(
      +req.user.sub,
      trainer_id,
      createSubscriberDto,
    );
  }

  @Get(':trainer_id')
  findAll(@Param('trainer_id') trainer_id: number) {
    return this.subscriberService.findAll(trainer_id);
  }

  @Delete(':trainer_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  remove(@Req() req, @Param('trainer_id') trainer_id: number) {
    return this.subscriberService.remove(+req.user.sub, trainer_id);
  }
}
