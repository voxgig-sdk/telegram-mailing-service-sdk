import { MailingEntity } from './entity/MailingEntity';
export type * from './TelegramMailingServiceTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TelegramMailingServiceEntityBase } from './TelegramMailingServiceEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TelegramMailingServiceSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Mailing(entopts?: Record<string, any>): MailingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TelegramMailingServiceSDK;
    tester(testopts?: any, sdkopts?: any): TelegramMailingServiceSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TelegramMailingServiceSDK;
export { stdutil, config, BaseFeature, TelegramMailingServiceEntityBase, TelegramMailingServiceSDK, SDK, };
