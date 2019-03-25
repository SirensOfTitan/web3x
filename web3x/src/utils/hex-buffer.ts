/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { isHexStrict } from './hex';
import { leftPad } from './padding';

export function hexToBuffer(value: string) {
  if (!isHexStrict(value)) {
    throw new Error('Not a 0x formatted hex string');
  }
  if (value.length % 2 !== 0) {
    value = leftPad(value, value.length - 1);
  }
  return Buffer.from(value.slice(2), 'hex');
}

export function bufferToHex(value: Buffer) {
  return '0x' + value.toString('hex');
}
