/* tslint:disable */
/* eslint-disable */
import { BasicContractDetailsDto } from '../models/basic-contract-details-dto';
export interface ContractWorkCreateDto {
  contractDetailsDto?: BasicContractDetailsDto;
  contractorPublicId?: string;
  projectContractNumber?: string;
  withCopyrights?: boolean;
}
