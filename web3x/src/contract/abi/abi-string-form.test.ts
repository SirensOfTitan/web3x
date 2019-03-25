/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { calculateStringForm } from './abi-string-form';
import { ContractEntryDefinition } from './contract-abi-definition';

const tests: { definition: ContractEntryDefinition; result: string }[] = [
  {
    definition: {
      name: 'myEvent',
      type: 'event',
      inputs: [
        {
          type: 'uint256',
          name: 'myNumber',
        },
        {
          type: 'bytes32',
          name: 'myBytes',
        },
      ],
    },
    result: 'myEvent(uint256,bytes32)',
  },
  {
    definition: {
      name: 'SomeEvent',
      type: 'event',
      inputs: [
        {
          type: 'bytes',
          name: 'somebytes',
        },
        {
          type: 'byte16',
          name: 'myBytes',
        },
      ],
    },

    result: 'SomeEvent(bytes,byte16)',
  },
  {
    definition: {
      name: 'AnotherEvent',
      type: 'event',
      inputs: [],
    },
    result: 'AnotherEvent()',
  },
];

describe('contract', () => {
  describe('abi-string-form', () => {
    tests.forEach(test => {
      it('should correctly compute string form', () => {
        expect(calculateStringForm(test.definition)).toEqual(test.result);
      });
    });
  });
});
