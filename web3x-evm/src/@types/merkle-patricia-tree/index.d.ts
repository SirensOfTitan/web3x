declare module 'merkle-patricia-tree' {
  import { Readable } from 'stream';

  export default class Trie {
    public readonly root: Buffer;
    public readonly isCheckpoint: boolean;
    public readonly EMPTY_TRIE_ROOT: Buffer;

    constructor(db?: object, root?: Buffer | string);
    public get(key: Buffer | string, cb: (err: Error, value: Buffer) => void): void;
    public put(key: Buffer | string, value: Buffer | string, cb: (err: Error) => void): void;
    public del(key: Buffer | string, cb: (err: Error) => void): void;
    public getRaw(key: Buffer | string, cb: (err: Error, value: Buffer) => void): void;
    public putRaw(key: Buffer | string, value: Buffer, cb: (err: Error) => void): void;
    public delRaw(key: Buffer | string, cb: (err: Error) => void): void;
    public createReadStream(): Readable;
    public batch(ops: { type: 'get' | 'put' | 'del'; key: Buffer | string; value?: Buffer | string }[], cb: () => void): void;
    public checkRoot(root: Buffer, cb: (exists: boolean) => void): void;
    public checkpoint(): void;
    public commit(cb: () => void): void;
    public revert(cb: () => void): void;

    public static prove(trie: Trie, key: string, cb: (err: Error, proof: any[]) => void): void;
    public static verifyProof(rootHash: Buffer, key: string, proof: any[], cb: (err: Error, value: string) => void): void;
  }
}
