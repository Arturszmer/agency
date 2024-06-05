import {PageableObject} from "@app/service/api/models/pageable-object";
import {SortObject} from "@app/service/api/models/sort-object";
import {UserDetailsDto} from "@app/service/api/models/user-details";

export interface PageUserDetailsDto {
  content?: Array<UserDetailsDto>;
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
