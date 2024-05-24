import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':training_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: CreateOrderDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req,
    @Param('training_id') training_id: string,
  ) {
    return this.ordersService.create(
      createOrderDto,
      +req.user.sub,
      +training_id,
    );
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: CreateOrderDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  find(@Req() req) {
    return this.ordersService.findAll(+req.user.sub);
  }

  @Patch(':id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'Order with this ${training_id} does not exist',
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(+id, updateOrderDto);
  }
}
