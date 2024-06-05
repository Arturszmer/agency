/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
export interface AgencyDetailsDto {
  addressDto: AddressDto;
  krsNumber?: string;
  name: string;
  nip: string;
  pesel?: string;
  regon?: string;
}
