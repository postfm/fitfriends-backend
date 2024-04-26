import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';

@Injectable()
export class FriendsService {
  create(createFriendDto: CreateFriendDto) {
    return 'This action adds a new friend';
  }

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
