import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('balance')
@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Post()
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: CreateBalanceDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'Your balance have already had exist',
  })
  create(@Body() createBalanceDto: CreateBalanceDto, @Req() req) {
    return this.balancesService.create(createBalanceDto, +req.user.sub);
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: CreateBalanceDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: "You don't have balance",
  })
  findAll(@Req() req) {
    return this.balancesService.findAll(+req.user.sub);
  }

  @Patch()
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: UpdateBalanceDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: "You don't have balance",
  })
  update(@Req() req, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balancesService.update(updateBalanceDto, +req.user.sub);
  }
}
