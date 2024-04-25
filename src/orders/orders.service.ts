import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  toPOJO(entity: CreateOrderDto) {
    return {
      type: entity.type,
      price: entity.price,
      amount: entity.amount,
      pay: entity.pay,
    };
  }
}
