import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { fillDto } from 'src/helpers/common';
import { UserRdo } from './rdo/user.rdo';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existsUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existsUser) throw new BadRequestException('This email already exists!');

    const salt = await bcrypt.genSalt(+this.configService.get('PASSWORD_SALT'));
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.userRepository.save(
      this.toPOJO(createUserDto, passwordHash),
    );

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

  toPOJO(entity: CreateUserDto, passwordHash?: string) {
    return {
      name: entity.name,
      email: entity.email,
      avatar: entity.avatar,
      password: passwordHash,
      gender: entity.gender,
      birthday: entity.birthday,
      role: entity.role,
      description: entity.description,
      location: entity.location,
      image: entity.image,
      level_of_train: entity.level_of_train,
      type_of_training: entity.type_of_training,
      time_of_training: entity.time_of_training,
      calories_to_lose: entity.calories_to_lose,
      calories_per_day: entity.calories_per_day,
      ready_to_train: entity.ready_to_train,
    };
  }
}
