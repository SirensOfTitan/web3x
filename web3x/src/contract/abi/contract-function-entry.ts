/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { bufferToHex, hexToBuffer } from '../../utils';
import { abiCoder } from '../abi-coder';
import { ContractEntryDefinition } from './contract-abi-definition';
import { ContractEntry } from './contract-entry';

export class ContractFunctionEntry extends ContractEntry {
  public readonly signature: string;

  constructor(entry: ContractEntryDefinition) {
    entry.inputs = entry.inputs || [];
    super(entry);
    this.signature =
      entry.type === 'constructor'
        ? 'constructor'
        : abiCoder.encodeFunctionSignature(abiCoder.abiMethodToString(entry));
  }

  public get constant() {
    return this.entry.stateMutability === 'view' || this.entry.stateMutability === 'pure' || this.entry.constant;
  }

  public get payable() {
    return this.entry.stateMutability === 'payable' || this.entry.payable;
  }

  public numArgs() {
    return this.entry.inputs ? this.entry.inputs.length : 0;
  }

  public decodeReturnValue(returnValue: string) {
    if (!returnValue) {
      return null;
    }

    const result = abiCoder.decodeParameters(this.entry.outputs, returnValue);

    if (result.__length__ === 1) {
      return result[0];
    } else {
      delete result.__length__;
      return result;
    }
  }

  public encodeABI(args: any[]) {
    return Buffer.concat([hexToBuffer(this.signature), this.encodeParameters(args)]);
  }

  public encodeParameters(args: any[]) {
    return hexToBuffer(abiCoder.encodeParameters(this.entry.inputs, args));
  }

  public decodeParameters(bytes: Buffer) {
    return abiCoder.decodeParameters(this.entry.inputs, bufferToHex(bytes));
  }
}
