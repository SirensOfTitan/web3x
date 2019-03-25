/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { Address } from '../address';
import { hexToBuffer } from '../utils';
import { fromRawBlockResponse } from './block-response-formatter';

describe('formatters', () => {
  describe('fromRawBlockResponse', () => {
    it('should return the correct value', () => {
      const rawBlockResponse = {
        hash: '0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265',
        parentHash: '0x83ffb245cfced97ccc5c75253d6960376d6c6dea93647397a543a72fdaea5265',
        miner: '0xdcc6960376d6c6dea93647383ffb245cfced97cf',
        stateRoot: '0x54dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583',
        transactionsRoot: '0x64dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583',
        receiptsRoot: '0x74dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583',
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        logsBloom: '0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265',
        difficulty: '0x3e8',
        totalDifficulty: '0x3e8',
        number: '0x3e8',
        gasLimit: '0x3e8',
        gasUsed: '0x3e8',
        timestamp: '0x3e8',
        extraData: '0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265',
        nonce: '0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265',
        size: '0x3e8',
        transactions: [],
        uncles: [],
      };

      const expected = {
        hash: hexToBuffer('0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265'),
        parentHash: hexToBuffer('0x83ffb245cfced97ccc5c75253d6960376d6c6dea93647397a543a72fdaea5265'),
        miner: Address.fromString('0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf'),
        stateRoot: hexToBuffer('0x54dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583'),
        transactionsRoot: hexToBuffer('0x64dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583'),
        receiptsRoot: hexToBuffer('0x74dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583'),
        sha3Uncles: hexToBuffer('0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'),
        logsBloom: hexToBuffer('0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265'),
        difficulty: '1000',
        totalDifficulty: '1000',
        number: 1000,
        gasLimit: 1000,
        gasUsed: 1000,
        timestamp: 1000,
        extraData: hexToBuffer('0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265'),
        nonce: hexToBuffer('0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265'),
        size: 1000,
        transactions: [],
        uncles: [],
      };

      expect(fromRawBlockResponse(rawBlockResponse)).toEqual(expected);
    });

    it('should return the correct value, when null values are present', () => {
      const rawBlockResponse = {
        hash: null,
        parentHash: '0x83ffb245cfced97ccc5c75253d6960376d6c6dea93647397a543a72fdaea5265',
        miner: '0xdcc6960376d6c6dea93647383ffb245cfced97cf',
        stateRoot: '0x54dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583',
        transactionsRoot: '0x64dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583',
        receiptsRoot: '0x74dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583',
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        logsBloom: '0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265',
        difficulty: '0x3e8',
        totalDifficulty: '0x3e8',
        number: null,
        gasLimit: '0x3e8',
        gasUsed: '0x3e8',
        timestamp: '0x3e8',
        extraData: '0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265',
        nonce: null,
        size: '0x3e8',
        transactions: [],
        uncles: [],
      };

      const expected = {
        hash: null,
        parentHash: hexToBuffer('0x83ffb245cfced97ccc5c75253d6960376d6c6dea93647397a543a72fdaea5265'),
        miner: Address.fromString('0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf'),
        stateRoot: hexToBuffer('0x54dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583'),
        transactionsRoot: hexToBuffer('0x64dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583'),
        receiptsRoot: hexToBuffer('0x74dda68af07643f68739a6e9612ad157a26ae7e2ce81f77842bb5835fbcde583'),
        sha3Uncles: hexToBuffer('0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'),
        logsBloom: hexToBuffer('0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265'),
        difficulty: '1000',
        totalDifficulty: '1000',
        number: null,
        gasLimit: 1000,
        gasUsed: 1000,
        timestamp: 1000,
        extraData: hexToBuffer('0xd6960376d6c6dea93647383ffb245cfced97ccc5c7525397a543a72fdaea5265'),
        nonce: null,
        size: 1000,
        transactions: [],
        uncles: [],
      };

      expect(fromRawBlockResponse(rawBlockResponse)).toEqual(expected);
    });
  });
});
