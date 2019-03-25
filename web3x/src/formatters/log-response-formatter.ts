/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { isNumber, isString } from 'util';
import { Address } from '../address';
import { Data, TransactionHash } from '../types';
import { hexToBuffer, hexToNumber, numberToHex, sha3Buffer } from '../utils';

export interface RawLogResponse {
  id?: string;
  removed?: boolean;
  logIndex: string | null;
  blockNumber: string | null;
  blockHash: string | null;
  transactionHash: string | null;
  transactionIndex: string | null;
  address: string;
  data: string;
  topics: string[];
}

// TODO: Make blockHash, transactionHash and topics be Buffers
export interface LogResponse {
  id: string | null;
  removed?: boolean;
  logIndex: number | null;
  blockNumber: number | null;
  blockHash: string | null;
  transactionHash: TransactionHash | null;
  transactionIndex: number | null;
  address: Address;
  data: Data;
  topics: string[];
}

export function fromRawLogResponse(log: RawLogResponse): LogResponse {
  let id: string | null = log.id || null;

  // Generate a custom log id.
  if (isString(log.blockHash) && isString(log.transactionHash) && isString(log.logIndex)) {
    const shaId = sha3Buffer(
      log.blockHash.replace('0x', '') + log.transactionHash.replace('0x', '') + log.logIndex.replace('0x', ''),
    );
    id = 'log_' + shaId.slice(0, 4).toString('hex');
  }

  const blockNumber = log.blockNumber !== null ? hexToNumber(log.blockNumber) : null;
  const transactionIndex = log.transactionIndex !== null ? hexToNumber(log.transactionIndex) : null;
  const logIndex = log.logIndex !== null ? hexToNumber(log.logIndex) : null;
  const address = isString(log.address) ? Address.fromString(log.address) : log.address;

  return { ...log, id, blockNumber, transactionIndex, logIndex, address };
}

export function toRawLogResponse(log: LogResponse): RawLogResponse {
  const { id, blockNumber, transactionIndex, logIndex, address } = log;
  return {
    ...log,
    id: id ? id : undefined,
    blockNumber: isNumber(blockNumber) ? numberToHex(blockNumber) : null,
    transactionIndex: isNumber(transactionIndex) ? numberToHex(transactionIndex) : null,
    logIndex: isNumber(logIndex) ? numberToHex(logIndex) : null,
    address: address.toString().toLowerCase(),
  };
}
