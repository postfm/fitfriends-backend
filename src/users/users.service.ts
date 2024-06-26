import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { fillDto } from 'src/helpers/common';
import { UserRdo } from './rdo/user.rdo';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { UserError } from 'src/helpers/constants/user.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return await paginate(query, this.userRepository, {
      relations: ['trainings', 'orders', 'reviews', 'balance'],
      sortableColumns: ['roles'],
      filterableColumns: {
        location: true,
        levelOfTrain: true,
        'trainings.type': true,
      },
    });
  }

  async findOneByEmail(email: string) {
    const existsUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['trainings', 'orders', 'reviews'],
    });

    if (!existsUser) {
      throw new BadRequestException(UserError.EmailNotFound);
    }

    return existsUser;
  }

  async findOne(id: number) {
    const existsUser = await this.userRepository.findOneBy({
      id,
    });

    if (!existsUser) {
      throw new BadRequestException(UserError.UserNotFound);
    }

    const user = await this.userRepository.findOneBy({ id: id });
    return fillDto(UserRdo, user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existsUser = await this.userRepository.findOneBy({
      id,
    });

    if (!existsUser) {
      throw new BadRequestException(UserError.UserNotFound);
    }

    await this.userRepository.update(id, updateUserDto);
    const user = this.userRepository.findOneBy({ id: id });
    return fillDto(UserRdo, user);
  }
}
