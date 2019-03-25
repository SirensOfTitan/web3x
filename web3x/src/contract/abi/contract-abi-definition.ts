/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

export type AbiDataTypes = 'uint256' | 'boolean' | 'string' | 'bytes' | string;
export type AbiInput = { components?: any; name: string; type: AbiDataTypes; indexed?: boolean };
export type AbiOutput = { components?: any; name: string; type: AbiDataTypes };

export interface ContractEntryDefinition {
  constant?: boolean;
  payable?: boolean;
  anonymous?: boolean;
  inputs?: AbiInput[];
  name?: string;
  outputs?: AbiOutput[];
  type: 'function' | 'constructor' | 'event' | 'fallback';
  stateMutability?: 'pure' | 'view' | 'payable' | 'nonpayable';
  signature?: string;
}

export type ContractAbiDefinition = ContractEntryDefinition[];
