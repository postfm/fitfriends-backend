import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalTrainingDto } from './create-personal-training.dto';

export class UpdatePersonalTrainingDto extends PartialType(CreatePersonalTrainingDto) {}
