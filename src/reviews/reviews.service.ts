import { Review } from 'src/reviews/entities/review.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Training } from 'src/trainings/entities/training.entity';
import { ReviewError } from 'src/helpers/constants/review.constant';

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
      throw new BadRequestException(ReviewError.ReviewExists);
    }

    const newReview = {
      ...createReviewDto,
      user: { id: user_id },
      training: { training_id },
    };

    // Сохраняем новый отзыв в БД
    const saveReview = this.reviewRepository.save(newReview);

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
      .set({ rating: +review.avg })
      .where('training_id = :training_id', { training_id: training_id })
      .execute();

    return saveReview;
  }

  async findAll(training_id: number) {
    const isExist = await this.reviewRepository.findOneBy({
      training: { training_id: training_id },
    });

    if (!isExist) {
      throw new BadRequestException(ReviewError.TrainingNotFound);
    }
    const reviews = await this.dataSource
      .createQueryBuilder(Review, 'review')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.training=:training_id', { training_id: training_id })
      .orderBy('review.created_at', 'DESC')
      .getMany();

    return reviews;
  }
}
