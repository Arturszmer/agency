/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { ShortContractorDto } from '../models/short-contractor-dto';
import { SortObject } from '../models/sort-object';
export interface PageShortContractorDto {
  content?: Array<ShortContractorDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
