import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ORDER_ALREADY_EXISTS } from 'src/helpers/constants/order.constants';

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
      throw new BadRequestException(ORDER_ALREADY_EXISTS);
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

  async findAll() {
    return await this.orderRepository.find({
      relations: {
        training: true,
        user: true,
      },
    });
  }
}
