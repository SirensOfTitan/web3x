/*
  Copyright (c) 2019 xf00f

  This file is part of web3x and is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

import { EventEmitter } from 'events';
import { isArray } from 'util';
import { EthereumProvider } from '../providers/ethereum-provider';

interface SubscriptionParams {
  subscription: string;
  result: any;
}

export class Subscription<Result = any, RawResult = Result> extends EventEmitter {
  private id?: string;
  private listener?: (result: any) => void;

  constructor(
    readonly type: 'eth' | 'shh',
    readonly subscription: string,
    readonly params: any[],
    private provider: EthereumProvider,
    private callback: (result: RawResult, sub: Subscription<Result, RawResult>) => void,
    subscribeImmediately: boolean = true,
  ) {
    super();

    if (subscribeImmediately) {
      this.subscribe();
    }
  }

  public async subscribe() {
    if (this.id) {
      this.unsubscribe();
    }

    try {
      this.listener = params => this.notificationHandler(params);
      this.provider.on('notification', this.listener);

      this.id = await this.provider.send(`${this.type}_subscribe`, [this.subscription, ...this.params]);

      if (!this.id) {
        throw new Error(`Failed to subscribe to ${this.subscription}.`);
      }
    } catch (err) {
      this.emit('error', err, this);
    }

    return this;
  }

  private notificationHandler(params: SubscriptionParams) {
    const { subscription, result } = params;

    if (subscription !== this.id) {
      return;
    }

    if (result instanceof Error) {
      this.unsubscribe();
      this.emit('error', result, this);
      return;
    }

    const resultArr = isArray(result) ? result : [result];

    resultArr.forEach(resultItem => {
      this.callback(resultItem, this);
    });
  }

  public unsubscribe() {
    if (this.listener) {
      this.provider.removeListener('notification', this.listener);
    }
    if (this.id) {
      this.provider.send(`${this.type}_unsubscribe`, [this.id]);
    }
    this.id = undefined;
    this.listener = undefined;
  }
}
