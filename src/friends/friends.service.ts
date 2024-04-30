import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
    private readonly dataSource: DataSource,
  ) {}

  async create(user_id: number, friend_id: number) {
    if (user_id === friend_id) {
      throw new BadRequestException('You are the best friend yourself!');
    }

    const isExist = await this.friendsRepository.findBy({
      user_id: user_id,
      friend_id: friend_id,
    });

    if (isExist.length) {
      throw new BadRequestException('This user already is your friend!');
    }

    const newFriends = {
      user_id: user_id,
      friend_id: friend_id,
    };

    return this.friendsRepository.save(newFriends);
  }

  async findAll(user_id: number) {
    const isExist = await this.friendsRepository.find({
      where: { user_id: user_id },
    });

    if (!isExist) {
      throw new BadRequestException('You are not have friends!');
    }

    const friends = await this.dataSource.manager
      .createQueryBuilder(User, 'user')
      .innerJoinAndSelect(Friend, 'friend', 'user.id = friend.friend_id')
      .where('friend.user_id=:user_id', { user_id: user_id })
      .getMany();

    return friends;
  }

  async trainerFindAll(friend_id: number) {
    const isExist = await this.friendsRepository.find({
      where: { friend_id: friend_id },
    });

    if (!isExist) {
      throw new BadRequestException('You are not have friends!');
    }

    const friends = await this.dataSource.manager
      .createQueryBuilder(User, 'user')
      .innerJoinAndSelect(Friend, 'friend', 'user.id = friend.user_id')
      .where('friend.friend_id=:friend_id', { friend_id: friend_id })
      .getMany();

    return friends;
  }

  async remove(user_id: number, friend_id: number) {
    const isExist = await this.friendsRepository.find({
      where: { user_id: user_id },
    });

    if (!isExist) {
      throw new BadRequestException('You are not have friends!');
    }

    const friend = await this.friendsRepository.findBy({
      user_id: user_id,
      friend_id: friend_id,
    });

    if (!friend) {
      throw new BadRequestException("Friend did't find");
    }

    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Friend)
      .where('user_id = :user_id', { user_id: user_id })
      .where('friend_id = :friend_id', { friend_id: friend_id })
      .execute();
  }
}
