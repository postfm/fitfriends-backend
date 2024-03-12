import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
  ) {}

  async create(createTrainingDto: CreateTrainingDto) {
    const training = await this.trainingRepository.save(
      this.toPOJO(createTrainingDto),
    );
    return training;
  }

  findAll() {
    return `This action returns all trainings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} training`;
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }

  toPOJO(entity: CreateTrainingDto) {
    return {
      name: entity.name,
      image: entity.image,
      level: entity.level,
      type: entity.type,
      duration: entity.duration,
      price: entity.price,
      calories: entity.calories,
      description: entity.description,
      gender: entity.gender,
      video: entity.video,
      rating: entity.rating,
      trainer: entity.trainer,
      specialOffer: entity.specialOffer,
    };
  }
}
