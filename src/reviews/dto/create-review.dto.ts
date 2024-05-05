import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { LengthParameter } from 'src/helpers/constants/common.constant';

export class CreateReviewDto {
  /**
   * Training Evaluation
   * @example '3'
   * @minimum '1'
   * @maximum '5'
   */
  @IsInt()
  @IsNotEmpty()
  @Min(LengthParameter.minGrade, {
    message: `The grade cannot be less than ${LengthParameter.minGrade}`,
  })
  @Max(LengthParameter.maxGrade, {
    message: `The grade cannot be more than ${LengthParameter.maxGrade}`,
  })
  grade: number;

  /**
   * Review text
   * @example "Приятно, граждане, наблюдать, как предприниматели в сети интернет неоднозначны и будут объективно рассмотрены соответствующими инстанциями."
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(LengthParameter.minText, {
    message: `Review text cannot be less than ${LengthParameter.minText}`,
  })
  @MaxLength(LengthParameter.maxText, {
    message: `Review text cannot be larger than ${LengthParameter.maxText}`,
  })
  text: string;
}
