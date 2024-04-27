import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { Repository } from 'typeorm';
import { fillDto } from 'src/helpers/common';
import { TrainingRdo } from './rdo/training.rdo';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
  ) {}

  catalog(query: PaginateQuery): Promise<Paginated<Training>> {
    console.log(query);

    return paginate(query, this.trainingRepository, {
      filterableColumns: {
        price: true,
        calories: true,
        rating: true,
        type: true,
      },
      sortableColumns: ['price'],
    });
  }

  async create(createTrainingDto: CreateTrainingDto, id: number) {
    const isExist = await this.trainingRepository.findBy({
      user: { id },
      name: createTrainingDto.name,
      type: createTrainingDto.type,
    });

    if (isExist.length) {
      throw new BadRequestException('This training already exists!');
    }
    const newTraining = {
      ...createTrainingDto,
      user: { id },
    };

    return await this.trainingRepository.save(newTraining);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Training>> {
    return paginate(query, this.trainingRepository, {
      filterableColumns: {
        price: true,
        calories: true,
        rating: true,
        duration: true,
      },
      sortableColumns: ['createdAt'],
    });
  }

  async findOne(training_id: number) {
    const training = await this.trainingRepository.findOneBy({
      training_id: training_id,
    });
    return fillDto(TrainingRdo, training);
  }

  async update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return this.trainingRepository.update(id, updateTrainingDto);
  }
}
