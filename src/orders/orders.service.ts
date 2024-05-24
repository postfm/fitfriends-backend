import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderError } from 'src/helpers/constants/order.constants';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

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
    const sum = createOrderDto.amount * createOrderDto.price;
    const newOrder = {
      ...createOrderDto,
      sum: sum,
      user: { id },
      training: { training_id },
    };
    return await this.orderRepository.save(newOrder);
  }

  async findAll(id: number) {
    return await this.orderRepository.find({
      relations: {
        training: true,
        user: true,
      },
      where: { user: { id: id } },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const isExist = await this.orderRepository.findOneBy({
      id: id,
    });

    if (!isExist) {
      throw new BadRequestException(OrderError.OrderNotExists);
    }
    const updateOrder = {
      ...isExist,
      amount: updateOrderDto.amount,
    };
    return this.orderRepository.update(id, updateOrder);
  }
}
