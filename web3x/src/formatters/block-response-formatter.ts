/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { isString } from 'util';
import { Address } from '../address';
import { bufferToHex, hexToBuffer, hexToNumber, hexToNumberString, numberToHex } from '../utils';
import {
  fromRawTransactionResponse,
  RawTransactionResponse,
  toRawTransactionResponse,
  TransactionResponse,
} from './transaction-response-formatter';

export interface RawBlockHeaderResponse {
  hash: string | null;
  parentHash: string;
  sha3Uncles: string;
  miner: string;
  stateRoot: string;
  transactionsRoot: string;
  receiptsRoot: string;
  logsBloom: string | null;
  difficulty: string;
  number: string | null;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  extraData: string;
  nonce: string | null;
}

export interface RawBlockResponse extends RawBlockHeaderResponse {
  totalDifficulty: string;
  size: string;
  transactions: (RawTransactionResponse | string)[];
  uncles: string[];
}

export interface BlockHeaderResponse {
  hash: Buffer | null;
  parentHash: Buffer;
  sha3Uncles: Buffer;
  miner: Address;
  stateRoot: Buffer;
  transactionsRoot: Buffer;
  receiptsRoot: Buffer;
  logsBloom: Buffer | null;
  difficulty: string;
  number: number | null;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  extraData: Buffer;
  nonce: Buffer | null;
}

export interface BlockResponse<T = TransactionResponse | Buffer> extends BlockHeaderResponse {
  totalDifficulty: string;
  size: number;
  transactions: T[];
  uncles: string[];
}

export function toRawBlockHeaderResponse(block: BlockHeaderResponse): RawBlockHeaderResponse {
  return {
    hash: block.hash ? bufferToHex(block.hash) : null,
    parentHash: bufferToHex(block.parentHash),
    sha3Uncles: bufferToHex(block.sha3Uncles),
    miner: block.miner.toString(),
    stateRoot: bufferToHex(block.stateRoot),
    transactionsRoot: bufferToHex(block.transactionsRoot),
    receiptsRoot: bufferToHex(block.receiptsRoot),
    logsBloom: block.logsBloom ? bufferToHex(block.logsBloom) : null,
    difficulty: numberToHex(block.difficulty),
    number: block.number ? numberToHex(block.number)! : null,
    gasLimit: numberToHex(block.gasLimit)!,
    gasUsed: numberToHex(block.gasUsed)!,
    timestamp: numberToHex(block.timestamp)!,
    extraData: bufferToHex(block.extraData),
    nonce: block.nonce ? bufferToHex(block.nonce) : null,
  };
}

export function toRawBlockResponse(block: BlockResponse): RawBlockResponse {
  return {
    ...toRawBlockHeaderResponse(block),
    totalDifficulty: numberToHex(block.totalDifficulty),
    size: numberToHex(block.size)!,
    transactions: block.transactions.map(tx => (Buffer.isBuffer(tx) ? bufferToHex(tx) : toRawTransactionResponse(tx))),
    uncles: block.uncles,
  };
}

export function fromRawBlockHeaderResponse(block: RawBlockHeaderResponse): BlockHeaderResponse {
  return {
    hash: block.hash ? hexToBuffer(block.hash) : null,
    parentHash: hexToBuffer(block.parentHash),
    sha3Uncles: hexToBuffer(block.sha3Uncles),
    miner: Address.fromString(block.miner),
    stateRoot: hexToBuffer(block.stateRoot),
    transactionsRoot: hexToBuffer(block.transactionsRoot),
    receiptsRoot: hexToBuffer(block.receiptsRoot),
    logsBloom: block.logsBloom ? hexToBuffer(block.logsBloom) : null,
    difficulty: hexToNumberString(block.difficulty),
    number: block.number ? hexToNumber(block.number)! : null,
    gasLimit: hexToNumber(block.gasLimit)!,
    gasUsed: hexToNumber(block.gasUsed)!,
    timestamp: hexToNumber(block.timestamp)!,
    extraData: hexToBuffer(block.extraData),
    nonce: block.nonce ? hexToBuffer(block.nonce) : null,
  };
}

export function fromRawBlockResponse(block: RawBlockResponse): BlockResponse {
  return {
    ...fromRawBlockHeaderResponse(block),
    totalDifficulty: hexToNumberString(block.totalDifficulty),
    size: hexToNumber(block.size)!,
    transactions: block.transactions.map(tx => (isString(tx) ? hexToBuffer(tx) : fromRawTransactionResponse(tx))),
    uncles: block.uncles,
  };
}
