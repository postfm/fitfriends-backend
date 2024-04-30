import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Training } from './entities/training.entity';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}
  @Get('ordered')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  getMyOrders(@Req() req) {
    return this.trainingsService.getMyOrders(+req.user.sub);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Training>> {
    return this.trainingsService.findAll(query);
  }

  @Get('catalog')
  @UseGuards(AccessTokenGuard)
  catalog(@Paginate() query: PaginateQuery): Promise<Paginated<Training>> {
    return this.trainingsService.catalog(query);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  create(@Body() createTrainingDto: CreateTrainingDto, @Req() req) {
    return this.trainingsService.create(createTrainingDto, +req.user.sub);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.trainingsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ) {
    return this.trainingsService.update(+id, updateTrainingDto);
  }
}
