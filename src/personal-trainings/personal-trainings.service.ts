import { Injectable } from '@nestjs/common';
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

  async create(createPersonalTrainingDto: CreatePersonalTrainingDto) {
    const personalTraining = await this.personalTrainingRepository.save(
      createPersonalTrainingDto,
    );
    return personalTraining;
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

  toPOJO(entity: CreatePersonalTrainingDto) {
    return {
      initiator: entity.initiator,
      user: entity.user,
      status: entity.status,
    };
  }
}
