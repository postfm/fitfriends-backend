import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { DefaultValue } from 'src/helpers/constants/user.constants';
import { SortDirection } from 'src/helpers/types/sort-direction.interface';

export class UsersQuery {
  @Transform(({ value }) => +value || DefaultValue.UsersCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = DefaultValue.UsersCountLimit;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public categories?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection;

  @Transform(({ value }) => +value || DefaultValue.PageCount)
  @IsOptional()
  public page: number = DefaultValue.PageCount;

  @IsOptional()
  public sortingType: string;

  @IsOptional()
  public filterType: string;

  @IsOptional()
  public filterStrings: string;
}
