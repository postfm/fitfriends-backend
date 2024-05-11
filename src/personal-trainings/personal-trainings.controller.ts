import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PersonalTrainingsService } from './personal-trainings.service';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PersonalTraining } from './dto/personal-training.api';

@ApiTags('personal-trainings')
@ApiBearerAuth()
@Controller('personal-trainings')
export class PersonalTrainingsController {
  constructor(
    private readonly personalTrainingsService: PersonalTrainingsService,
  ) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description:
      'You cannot invite yourself to training, you can only force it.',
  })
  @Post(':user_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  create(
    @Body() createPersonalTrainingDto: CreatePersonalTrainingDto,
    @Req() req,
    @Param('user_id') user_id: number,
  ) {
    return this.personalTrainingsService.create(
      createPersonalTrainingDto,
      +req.user.sub,
      user_id,
    );
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: PersonalTraining,
  })
  @ApiBadRequestResponse({
    description: 'No such application exists',
  })
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updatePersonalTrainingDto: UpdatePersonalTrainingDto,
  ) {
    return this.personalTrainingsService.update(
      +id,
      +req.user.sub,
      updatePersonalTrainingDto,
    );
  }
}
