/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
export interface ContractorCreateRequest {
  addressDto: AddressDto;
  birthDate: string;
  contractorDescription?: string;
  email?: string;
  firstName: string;
  lastName: string;
  pesel: string;
  phone?: string;
}
