/* tslint:disable */
/* eslint-disable */
import { BasicContractDetailsDto } from '../models/basic-contract-details-dto';
import { ContractShortDto } from '../models/contract-short-dto';
export interface ProjectDto {
  contractDetailsDto?: BasicContractDetailsDto;
  contractNumber?: string;
  contractType?: 'PROJECT' | 'CONTRACT_WORK' | 'MANDATORY_CONTRACT';
  contracts?: Array<ContractShortDto>;
}
