import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { Repository } from 'typeorm';
import { fillDto } from 'src/helpers/common';
import { TrainingRdo } from './rdo/training.rdo';

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
    return this.trainingRepository.find();
  }

  async findOne(id: number) {
    const training = await this.trainingRepository.findOneBy({ id: id });
    return fillDto(TrainingRdo, training);
  }

  async update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return this.trainingRepository.update(id, updateTrainingDto);
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
