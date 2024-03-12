import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { fillDto, getPasswordHash } from 'src/helpers/common';
import { UserRdo } from './rdo/user.rdo';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existsUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existsUser) throw new BadRequestException('This email already exists!');

    const user = await this.userRepository.save(this.toPOJO(createUserDto));

    return fillDto(UserRdo, user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  toPOJO(entity: CreateUserDto) {
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
      timeOfTraining: entity.timeOfTraining,
      caloriesToLose: entity.caloriesToLose,
      caloriesPerDay: entity.caloriesPerDay,
      readyToTrain: entity.readyToTrain,
    };
  }
}
