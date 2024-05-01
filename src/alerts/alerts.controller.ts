import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Req() req) {
    return this.alertsService.findAll(+req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
}
