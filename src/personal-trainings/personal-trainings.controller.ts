import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@Controller('personal-trainings')
export class PersonalTrainingsController {
  constructor(
    private readonly personalTrainingsService: PersonalTrainingsService,
  ) {}

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalTrainingDto: UpdatePersonalTrainingDto,
  ) {
    return this.personalTrainingsService.update(+id, updatePersonalTrainingDto);
  }
}
