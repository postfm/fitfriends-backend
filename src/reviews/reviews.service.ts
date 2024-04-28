import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Training } from 'src/trainings/entities/training.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    user_id: number,
    training_id: number,
  ) {
    const isExist = await this.reviewRepository.findBy({
      training: { training_id: training_id },
      user: { id: user_id },
    });

    if (isExist.length) {
      throw new BadRequestException(
        'You have already written a review for this training!',
      );
    }

    const newReview = {
      ...createReviewDto,
      user: { id: user_id },
      training: { training_id },
    };

    // Сохраняем новый отзыв в БД
    const saveReview = this.reviewRepository.save(newReview);

    await this.dataSource
      .getRepository(Review)
      .createQueryBuilder('review')
      .where('review.training=:training_id', { training_id: training_id })
      .getMany();

    // Считаем рейтинг с учетом добавленного
    const review = await this.dataSource
      .getRepository(Review)
      .createQueryBuilder('review')
      .select('AVG(review.grade)', 'avg')
      .where('review.training=:training_id', { training_id: training_id })
      .getRawOne();

    // Обновляем рейтинг в таблице тренировок
    await this.dataSource
      .createQueryBuilder()
      .update(Training)
      .set({ rating: review.avg })
      .where('training_id = :training_id', { training_id: training_id })
      .execute();

    return saveReview;
  }

  async findAll(training_id: number) {
    const reviews = await this.dataSource
      .getRepository(Review)
      .createQueryBuilder('review')
      .where('review.training=:training_id', { training_id: training_id })
      .getMany();

    return reviews;
  }
}
