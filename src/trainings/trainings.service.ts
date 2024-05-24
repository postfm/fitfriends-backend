import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Order } from 'src/orders/entities/order.entity';
import { TrainingQuery } from 'src/helpers/query/training-query';
import {
  DEFAULT_SORTING_TYPE,
  DEFAULT_SORT_DIRECTION,
  TrainingError,
} from 'src/helpers/constants/training.constants';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createTrainingDto: CreateTrainingDto, id: number) {
    const isExist = await this.trainingRepository.findBy({
      user: { id },
      name: createTrainingDto.name,
      type: createTrainingDto.type,
    });

    if (isExist.length) {
      throw new BadRequestException(TrainingError.TrainingAlreadyExists);
    }
    const newTraining = {
      ...createTrainingDto,
      user: { id },
    };

    return await this.trainingRepository.save(newTraining);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Training>> {
    return paginate(query, this.trainingRepository, {
      filterableColumns: {
        price: true,
        calories: true,
        rating: true,
        duration: true,
      },
      sortableColumns: ['createdAt'],
      relations: ['orders', 'user', 'reviews'],
    });
  }

  async getMyOrders(user_id: number, query?: TrainingQuery) {
    let sortingType = DEFAULT_SORTING_TYPE;
    let sortDirection = DEFAULT_SORT_DIRECTION;

    if (query?.sortingType) {
      sortingType = query.sortingType;
    }

    if (query?.sortDirection) {
      sortDirection = query.sortDirection;
    }

    const myOrders = await this.dataSource
      .createQueryBuilder()
      .select('training.*')
      .addSelect('SUM(order.amount)', 'quantity')
      .addSelect('SUM(order.sum)', 'cost')
      .from(Order, 'order')
      .innerJoin(
        Training,
        'training',
        'order.training_id = training.training_id',
      )
      .where('training.user_id = :userId', { userId: user_id })
      .groupBy('training.training_id, training.type')
      .orderBy(sortingType, sortDirection)
      .getRawMany();

    return myOrders;
  }

  async catalog(query: PaginateQuery): Promise<Paginated<Training>> {
    return paginate(query, this.trainingRepository, {
      filterableColumns: {
        price: true,
        calories: true,
        rating: true,
        type: true,
      },
      sortableColumns: ['price'],
      relations: ['orders', 'user', 'reviews'],
    });
  }

  async findOne(training_id: number) {
    const training = await this.trainingRepository.findOne({
      where: {
        training_id: training_id,
      },
      relations: { user: true, orders: true, reviews: true },
    });

    if (!training) {
      throw new BadRequestException(TrainingError.TrainingNotExists);
    }
    return training;
  }

  async update(id: number, updateTrainingDto: UpdateTrainingDto) {
    const isExist = await this.trainingRepository.findOneBy({
      training_id: id,
    });

    if (!isExist) {
      throw new BadRequestException(TrainingError.TrainingNotExists);
    }
    return this.trainingRepository.update(id, updateTrainingDto);
  }
}
