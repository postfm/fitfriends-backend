import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalTraining } from './entities/personal-training.entity';
import { DataSource, Repository } from 'typeorm';
import { Alert } from 'src/alerts/entities/alert.entity';
import { User } from 'src/users/entities/user.entity';

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

    if (!personalTraining.id) {
      throw new BadRequestException('Personal training request not created');
    }

    const userInitiator = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id=:id', { id: initiator })
      .getOne();

    const newAlert = {
      text: `The user ${userInitiator?.name} submitted a request for personal (joint) training`,
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
      throw new BadRequestException('No such application exists');
    }

    const inviter = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id=:id', { id: user })
      .getOne();

    const newAlert = {
      text: `The user ${inviter?.name} changed the status of your application to ${updatePersonalTrainingDto.status}`,
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
