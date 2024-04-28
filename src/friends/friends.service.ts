import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
    private readonly dataSource: DataSource,
  ) {}

  async create(user_id: number, friend_id: number) {
    if (user_id === friend_id) {
      throw new BadRequestException('You are the best yourself!');
    }

    const isExist = await this.friendsRepository.findBy({
      user_id: user_id,
      friend: { id: friend_id },
    });

    if (isExist.length) {
      throw new BadRequestException('This user already is your friend!');
    }

    const newFriends = {
      user_id: user_id,
      friend: { id: friend_id },
    };

    return this.friendsRepository.save(newFriends);
  }

  async findAll(user_id: number) {
    const friends = await this.friendsRepository.find({
      where: { user_id: user_id },
      relations: { friend: true },
    });

    if (!friends) {
      throw new BadRequestException('You are not have friends!');
    }

    return friends;
  }

  async remove(user_id: number, friend_id: number) {
    const friend = await this.friendsRepository.findBy({
      user_id: user_id,
      friend: { id: friend_id },
    });

    if (!friend) {
      throw new BadRequestException("Friend did't find");
    }

    return this.friendsRepository.delete(user_id);
  }
}
