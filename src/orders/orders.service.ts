import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    id: number,
    training_id: number,
  ) {
    const isExist = await this.orderRepository.findBy({
      user: { id },
      training: { training_id },
    });

    if (isExist.length) {
      throw new BadRequestException('This order already exists!');
    }
    const sum = createOrderDto.amount * createOrderDto.price;
    const newOrder = {
      ...createOrderDto,
      sum: sum,
      user: { id },
      training: { training_id },
    };
    return await this.orderRepository.save(newOrder);
  }
}
