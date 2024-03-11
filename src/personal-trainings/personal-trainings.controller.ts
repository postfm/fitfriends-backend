import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalTrainingsService } from './personal-trainings.service';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';

@Controller('personal-trainings')
export class PersonalTrainingsController {
  constructor(private readonly personalTrainingsService: PersonalTrainingsService) {}

  @Post()
  create(@Body() createPersonalTrainingDto: CreatePersonalTrainingDto) {
    return this.personalTrainingsService.create(createPersonalTrainingDto);
  }

  @Get()
  findAll() {
    return this.personalTrainingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalTrainingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalTrainingDto: UpdatePersonalTrainingDto) {
    return this.personalTrainingsService.update(+id, updatePersonalTrainingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalTrainingsService.remove(+id);
  }
}
