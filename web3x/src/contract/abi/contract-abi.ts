/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { ContractAbiDefinition, ContractEventEntry, ContractFunctionEntry } from '.';
import { LogResponse } from '../../formatters';
import { bufferToHex } from '../../utils';

export class ContractAbi {
  public functions: ContractFunctionEntry[];
  public events: ContractEventEntry[];
  public ctor: ContractFunctionEntry;
  public fallback?: ContractFunctionEntry;

  constructor(definition: ContractAbiDefinition) {
    this.functions = definition.filter(e => e.type === 'function').map(entry => new ContractFunctionEntry(entry));
    this.events = definition.filter(e => e.type === 'event').map(entry => new ContractEventEntry(entry));
    const ctor = definition.find(e => e.type === 'constructor');
    this.ctor = new ContractFunctionEntry(ctor || { type: 'constructor' });
    const fallback = definition.find(e => e.type === 'fallback');
    if (fallback) {
      this.fallback = new ContractFunctionEntry(fallback);
    }
  }

  public findEntryForLog(log: LogResponse) {
    return this.events.find(abiDef => abiDef.signature === log.topics[0]);
  }

  public decodeEvent(log: LogResponse) {
    const event = this.findEntryForLog(log);
    if (!event) {
      throw new Error(`Unable to find matching event signature for log: ${log.id}`);
    }
    return event.decodeEvent(log);
  }

  public decodeFunctionData(data: Buffer) {
    const funcSig = bufferToHex(data.slice(0, 4));
    const func = this.functions.find(f => f.signature === funcSig);
    return func ? func.decodeParameters(data.slice(4)) : undefined;
  }
}
