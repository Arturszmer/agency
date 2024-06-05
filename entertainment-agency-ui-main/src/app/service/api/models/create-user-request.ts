import {RoleType} from "@app/service/api/models/user-details";

export interface CreateUserRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roleType?: RoleType;
}
