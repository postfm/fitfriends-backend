import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { SortDirection } from '../constants/sort-direction.enum';
import {
  DEFAULT_SORTING_TYPE,
  DEFAULT_SORT_DIRECTION,
} from '../constants/training.constants';

export class TrainingQuery {
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @Transform(({ value }) => value || DEFAULT_SORT_DIRECTION)
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => value || DEFAULT_SORTING_TYPE)
  @IsOptional()
  public sortingType: string;
}
