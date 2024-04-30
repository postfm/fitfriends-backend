import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalTraining } from './entities/personal-training.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalTrainingsService {
  constructor(
    @InjectRepository(PersonalTraining)
    private readonly personalTrainingRepository: Repository<PersonalTraining>,
  ) {}

  async create(
    createPersonalTrainingDto: CreatePersonalTrainingDto,
    initiator: number,
    user: number,
  ) {
    if (initiator === user) {
      throw new BadRequestException(
        'You cannot invite yourself to training, you can only force it.',
      );
    }

    const newPersonalTraining = {
      ...createPersonalTrainingDto,
      initiator,
      user,
    };
    const personalTraining =
      await this.personalTrainingRepository.save(newPersonalTraining);
    return personalTraining;
  }

  async update(
    id: number,
    updatePersonalTrainingDto: UpdatePersonalTrainingDto,
  ) {
    return this.personalTrainingRepository.update(
      id,
      updatePersonalTrainingDto,
    );
  }
}
