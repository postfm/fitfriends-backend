import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { fillDto, getPasswordHash } from 'src/helpers/common';
import { TrainerRdo } from './rdo/trainer.rdo';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    private readonly configService: ConfigService,
  ) {}

  async create(createTrainerDto: CreateTrainerDto) {
    const existsTrainer = await this.trainerRepository.findOneBy({
      email: createTrainerDto.email,
    });
    if (existsTrainer)
      throw new BadRequestException('This email already exists!');

    const user = await this.trainerRepository.save(
      this.toPOJO(createTrainerDto),
    );

    return fillDto(TrainerRdo, user);
  }

  findAll() {
    return `This action returns all trainers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainer`;
  }

  update(id: number, updateTrainerDto: UpdateTrainerDto) {
    return `This action updates a #${id} trainer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainer`;
  }

  toPOJO(entity: CreateTrainerDto) {
    return {
      name: entity.name,
      email: entity.email,
      avatar: entity.avatar,
      password: String(getPasswordHash(entity.password)),
      gender: entity.gender,
      birthday: entity.birthday,
      role: entity.role,
      description: entity.description,
      location: entity.location,
      image: entity.image,
      levelOfTrain: entity.levelOfTrain,
      typeOfTraining: entity.typeOfTraining,
      certificates: entity.certificates,
      merits: entity.merits,
      personalTrainings: entity.personalTrainings,
    };
  }
}
