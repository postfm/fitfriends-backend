import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { fillDto, getHash } from 'src/helpers/common';
import { UserRdo } from './rdo/user.rdo';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      relations: ['trainings'],
      sortableColumns: ['roles'],
      filterableColumns: {
        location: true,
        levelOfTrain: true,
        'trainings.type': true,
      },
    });
  }

  async findOneByEmail(email: string) {
    const existsUser = await this.userRepository.findOneBy({
      email: email,
    });

    if (!existsUser) {
      throw new BadRequestException('User with this email not found!');
    }
    return existsUser;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    return fillDto(UserRdo, user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async toPOJO(entity: CreateUserDto) {
    return {
      name: entity.name,
      email: entity.email,
      avatar: entity.avatar,
      password: String(await getHash(entity.password)),
      gender: entity.gender,
      birthday: entity.birthday,
      roles: entity.roles,
      description: entity.description,
      location: entity.location,
      image: entity.image,
      levelOfTrain: entity.levelOfTrain,
      typeOfTraining: entity.typeOfTraining,
      timeOfTraining: entity.timeOfTraining,
      caloriesToLose: entity.caloriesToLose,
      caloriesPerDay: entity.caloriesPerDay,
      readyToTrain: entity.readyToTrain,
    };
  }

  async addFriend(
    user_id: number,
    friend_id: number,
    updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto.friends);
    let user;
    let friend;
    const users = await this.userRepository.findOneBy({ id: user_id });
    if (users) {
      user = [...users.friends, friend_id];
    }
    const friends = await this.userRepository.findOneBy({ id: friend_id });
    if (friends) {
      friend = [...friends.friends, user_id];
    }
    const newUser = {
      ...updateUserDto,
      friends: user,
    };
    const newFriend = {
      ...updateUserDto,
      friends: friend,
    };

    await this.userRepository.update(user_id, newUser);

    return this.userRepository.update(friend_id, newFriend);
  }
}
