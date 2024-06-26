import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AlertResponse } from './dto/alert.api';

@ApiTags('alerts')
@ApiBearerAuth()
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({
    type: AlertResponse,
  })
  findAll(@Req() req) {
    return this.alertsService.findAll(+req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBadRequestResponse({
    description: "The alert didn't found",
  })
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
}
