import {ControlItem} from "@app/models/frontend/control-item";

export interface UserDetailsDto {
  username?: string,
  email?: string,
  role?: RoleDto,
  firstName?: string,
  lastName?: string,
  isBlocked?: boolean
}

export interface RoleDto {
  roleType: RoleType,
  permissions: string[]
}

export enum RoleType {
  ADMIN='ADMIN',
  MANAGER='MANAGER',
  USER='USER'
}

export const roles: ControlItem[] = [
  { label: 'MANAGER', value: RoleType.MANAGER},
  { label: 'USER', value: RoleType.USER}
]
