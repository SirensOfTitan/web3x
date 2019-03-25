/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { isArray } from 'util';
import { EventLog, LogResponse } from '../../formatters';
import { abiCoder } from '../abi-coder';
import { ContractEntryDefinition } from './contract-abi-definition';
import { ContractEntry } from './contract-entry';

export class ContractEventEntry extends ContractEntry {
  public readonly signature: string;

  constructor(entry: ContractEntryDefinition) {
    super(entry);
    this.signature = abiCoder.encodeEventSignature(this.asString());
  }

  public getEventTopics(filter: object = {}) {
    const topics: (string | string[])[] = [];

    if (!this.entry.anonymous && this.signature) {
      topics.push(this.signature);
    }

    const indexedTopics = (this.entry.inputs || [])
      .filter(input => input.indexed === true)
      .map(input => {
        const value = filter[input.name];
        if (!value) {
          return null;
        }

        // TODO: https://github.com/ethereum/web3.js/issues/344
        // TODO: deal properly with components

        if (isArray(value)) {
          return value.map(v => abiCoder.encodeParameter(input.type, v));
        } else {
          return abiCoder.encodeParameter(input.type, value);
        }
      });

    return [...topics, ...indexedTopics];
  }

  public decodeEvent(log: LogResponse): EventLog<any> {
    const { data = '', topics = [], ...formattedLog } = log;
    const { anonymous, inputs = [], name = '' } = this.entry;

    const argTopics = anonymous ? topics : topics.slice(1);
    const returnValues = abiCoder.decodeLog(inputs, data, argTopics);
    delete returnValues.__length__;

    return {
      ...formattedLog,
      event: name,
      returnValues,
      signature: anonymous || !topics[0] ? null : topics[0],
      raw: {
        data,
        topics,
      },
    };
  }
}
