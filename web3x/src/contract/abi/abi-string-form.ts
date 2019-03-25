/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { isArray } from 'util';
import { AbiInput, ContractEntryDefinition } from './contract-abi-definition';

export function calculateStringForm(entry: ContractEntryDefinition) {
  if (entry.name && entry.name.indexOf('(') !== -1) {
    return entry.name;
  }
  return entry.name + '(' + flattenTypes(false, entry.inputs || []).join(',') + ')';
}

function flattenTypes(includeTuple: boolean, inputs: AbiInput[]) {
  const types: string[] = [];

  inputs.forEach(param => {
    if (typeof param.components === 'object') {
      if (!param.type.startsWith('tuple')) {
        throw new Error('Components found but type is not tuple');
      }
      let suffix = '';
      const arrayBracket = param.type.indexOf('[');
      if (arrayBracket >= 0) {
        suffix = param.type.substring(arrayBracket);
      }
      const result = flattenTypes(includeTuple, param.components);
      if (isArray(result) && includeTuple) {
        types.push('tuple(' + result.join(',') + ')' + suffix);
      } else if (!includeTuple) {
        types.push('(' + result.join(',') + ')' + suffix);
      } else {
        types.push('(' + result + ')');
      }
    } else {
      types.push(param.type);
    }
  });

  return types;
}
