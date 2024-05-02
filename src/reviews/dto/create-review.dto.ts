import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  /**
   * Training Evaluation
   * @example '3'
   * @minimum '1'
   * @maximum '5'
   */
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'The grade cannot be less than 1' })
  @Max(5, { message: 'The grade cannot be more than 5' })
  grade: number;

  /**
   * Review text
   * @example "Приятно, граждане, наблюдать, как предприниматели в сети интернет неоднозначны и будут объективно рассмотрены соответствующими инстанциями."
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(100, { message: 'Review text cannot be less than 100' })
  @MaxLength(1024, { message: 'Review text cannot be larger than 1024' })
  text: string;
}
