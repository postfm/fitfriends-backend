import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':training_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req,
    @Param('training_id') training_id: number,
  ) {
    return this.reviewsService.create(
      createReviewDto,
      +req.user.sub,
      training_id,
    );
  }

  @Get(':training_id')
  @UseGuards(AccessTokenGuard)
  findAll(@Param('training_id') training_id: number) {
    return this.reviewsService.findAll(training_id);
  }
}
