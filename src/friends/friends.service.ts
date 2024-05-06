import {
  ADDED_AS_FRIEND,
  FriendError,
} from './../helpers/constants/friends.constants';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Alert } from 'src/alerts/entities/alert.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
    private readonly dataSource: DataSource,
  ) {}

  async create(user_id: number, friend_id: number) {
    if (user_id === friend_id) {
      throw new BadRequestException(FriendError.FriendYourself);
    }

    const isExist = await this.friendsRepository.findBy({
      user_id: user_id,
      friend_id: friend_id,
    });

    if (isExist.length) {
      throw new BadRequestException(FriendError.UserNotAdded);
    }

    const newFriends = {
      user_id: user_id,
      friend_id: friend_id,
    };

    const addedFriend = await this.friendsRepository.save(newFriends);

    if (!addedFriend.id) {
      throw new BadRequestException(FriendError.UserNotAdded);
    }

    const userName = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user_id })
      .getOne();

    const newAlert = {
      text: ADDED_AS_FRIEND + userName?.name,
      user: friend_id,
    };

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Alert)
      .values([newAlert])
      .execute();

    return addedFriend;
  }

  async findAll(user_id: number) {
    const isExist = await this.friendsRepository.find({
      where: { user_id: user_id },
    });

    if (!isExist) {
      throw new BadRequestException(FriendError.NotHaveFriends);
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
      throw new BadRequestException(FriendError.NotHaveFriends);
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
      throw new BadRequestException(FriendError.NotHaveFriends);
    }

    const friend = await this.friendsRepository.findBy({
      user_id: user_id,
      friend_id: friend_id,
    });

    if (!friend) {
      throw new BadRequestException();
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
