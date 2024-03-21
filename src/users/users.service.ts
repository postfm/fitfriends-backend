import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { fillDto, getHash } from 'src/helpers/common';
import { UserRdo } from './rdo/user.rdo';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all users`;
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
      role: entity.role,
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
}
