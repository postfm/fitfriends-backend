import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Query,
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
import { TrainingQuery } from 'src/helpers/query/training-query';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TrainingRdo } from './rdo/training.rdo';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}
  @Get('ordered')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  getMyOrders(@Req() req, @Query() query: TrainingQuery) {
    return this.trainingsService.getMyOrders(+req.user.sub, query);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: TrainingRdo,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Training>> {
    return this.trainingsService.findAll(query);
  }

  @Get('catalog')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({
    type: TrainingRdo,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  catalog(@Paginate() query: PaginateQuery): Promise<Paginated<Training>> {
    return this.trainingsService.catalog(query);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: TrainingRdo,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createTrainingDto: CreateTrainingDto, @Req() req) {
    return this.trainingsService.create(createTrainingDto, +req.user.sub);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({
    type: TrainingRdo,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'Training with this ID does not exist',
  })
  findOne(@Param('id') id: string) {
    return this.trainingsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'Training with this ${training_id} does not exis',
  })
  update(
    @Param('id') id: string,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ) {
    return this.trainingsService.update(+id, updateTrainingDto);
  }
}
