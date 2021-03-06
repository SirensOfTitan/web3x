import { OpCode } from '.';
import { EvmContext } from '../vm/evm-context';

class ShlOp implements OpCode {
  public readonly code = 0x1b;
  public readonly mnemonic = 'SHL';
  public readonly description = 'Bitwise shift left';
  public readonly gas = 3;
  public readonly bytes = 1;

  public toString(params: Buffer): string {
    return `${this.mnemonic}`;
  }

  public handle(context: EvmContext) {
    const v1 = context.stack.pop()!;
    const v2 = context.stack.pop()!;
    context.stack.push(v1 >= 256 ? BigInt(0) : (v2 << v1) % BigInt(2) ** BigInt(256));
    context.ip += this.bytes;
  }
}

export const Shl = new ShlOp();
