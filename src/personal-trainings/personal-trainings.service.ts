import { Injectable } from '@nestjs/common';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';

@Injectable()
export class PersonalTrainingsService {
  create(createPersonalTrainingDto: CreatePersonalTrainingDto) {
    return 'This action adds a new personalTraining';
  }

  findAll() {
    return `This action returns all personalTrainings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalTraining`;
  }

  update(id: number, updatePersonalTrainingDto: UpdatePersonalTrainingDto) {
    return `This action updates a #${id} personalTraining`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalTraining`;
  }
}
