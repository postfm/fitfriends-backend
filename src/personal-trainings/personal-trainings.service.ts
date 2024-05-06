import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalTraining } from './entities/personal-training.entity';
import { DataSource, Repository } from 'typeorm';
import { Alert } from 'src/alerts/entities/alert.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CHANGE_STATUS,
  PersonalTrainingError,
  REQUEST_PERSONAL_TRAINING,
} from 'src/helpers/constants/personal-training.constants';

@Injectable()
export class PersonalTrainingsService {
  constructor(
    @InjectRepository(PersonalTraining)
    private readonly personalTrainingRepository: Repository<PersonalTraining>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createPersonalTrainingDto: CreatePersonalTrainingDto,
    initiator: number,
    user: number,
  ) {
    if (initiator === user) {
      throw new BadRequestException(PersonalTrainingError.CanNotInvite);
    }

    const newPersonalTraining = {
      ...createPersonalTrainingDto,
      initiator,
      user,
    };

    const personalTraining =
      await this.personalTrainingRepository.save(newPersonalTraining);

    if (!personalTraining.id) {
      throw new BadRequestException(PersonalTrainingError.RequestNotCreated);
    }

    const userInitiator = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id=:id', { id: initiator })
      .getOne();

    const newAlert = {
      text: userInitiator?.name + REQUEST_PERSONAL_TRAINING,
      user,
    };
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Alert)
      .values([newAlert])
      .execute();

    return personalTraining;
  }

  async update(
    id: number,
    user: number,
    updatePersonalTrainingDto: UpdatePersonalTrainingDto,
  ) {
    const isExist = await this.personalTrainingRepository.findOneBy({
      id: id,
      user: user,
    });

    if (isExist?.status === updatePersonalTrainingDto.status) {
      return;
    }

    if (!isExist) {
      throw new BadRequestException(PersonalTrainingError.TrainingNotExists);
    }

    const inviter = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id=:id', { id: user })
      .getOne();

    const newAlert = {
      text: inviter?.name + CHANGE_STATUS + updatePersonalTrainingDto.status,
      user: isExist.initiator,
    };

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Alert)
      .values([newAlert])
      .execute();

    return this.personalTrainingRepository.update(
      id,
      updatePersonalTrainingDto,
    );
  }
}
