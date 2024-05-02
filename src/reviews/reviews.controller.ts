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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':training_id')
  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: CreateReviewDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'You have already written a review for this training!',
  })
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

  @ApiOkResponse({
    type: CreateReviewDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: "Training didn't find",
  })
  @Get(':training_id')
  @UseGuards(AccessTokenGuard)
  findAll(@Param('training_id') training_id: number) {
    return this.reviewsService.findAll(training_id);
  }
}
