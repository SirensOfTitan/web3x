/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { calculateStringForm } from './abi-string-form';
import { ContractEntryDefinition } from './contract-abi-definition';

export class ContractEntry {
  private stringForm: string;

  constructor(protected entry: ContractEntryDefinition) {
    this.stringForm = calculateStringForm(entry);
  }

  public get name() {
    return this.entry.name;
  }

  public get anonymous() {
    return this.entry.anonymous || false;
  }

  public asString() {
    return this.stringForm;
  }
}
