/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { ContractShortDto } from '../models/contract-short-dto';
export interface ContractorDto {
  addressDto?: AddressDto;
  birthDate?: string;
  contractorDescription?: string;
  contracts?: Array<ContractShortDto>;
  email?: string;
  lastName?: string;
  name?: string;
  pesel?: string;
  phone?: string;
  publicId?: string;
}
