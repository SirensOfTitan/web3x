/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { abiCoder } from '../abi-coder';
import { ContractEntryDefinition } from './contract-abi-definition';

export class ContractEntry {
  constructor(protected entry: ContractEntryDefinition) {}

  public get name() {
    return this.entry.name;
  }

  public get anonymous() {
    return this.entry.anonymous || false;
  }

  public asString() {
    return abiCoder.abiMethodToString(this.entry);
  }
}
