import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { fillDto, getPasswordHash } from 'src/helpers/common';
import { UserRdo } from 'src/users/rdo/user.rdo';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const existsUser = await this.userRepository.findOneBy({
      email: registerAuthDto.email,
    });
    if (existsUser) throw new BadRequestException('This email already exists!');

    const user = await this.userRepository.save(this.toPOJO(registerAuthDto));

    return fillDto(UserRdo, user);
  }

  async login(loginAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }

  toPOJO(entity: RegisterAuthDto) {
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
