import { TelegramMailingServiceEntityBase } from '../TelegramMailingServiceEntityBase';
import type { TelegramMailingServiceSDK } from '../TelegramMailingServiceSDK';
import type { Control } from '../types';
import type { Mailing, MailingLoadMatch, MailingListMatch, MailingCreateData, MailingRemoveMatch } from '../TelegramMailingServiceTypes';
declare class MailingEntity extends TelegramMailingServiceEntityBase<Mailing> {
    constructor(client: TelegramMailingServiceSDK, entopts: any);
    make(this: MailingEntity): MailingEntity;
    load(this: any, reqmatch?: MailingLoadMatch, ctrl?: Control): Promise<MailingEntity>;
    list(this: any, reqmatch?: MailingListMatch, ctrl?: Control): Promise<MailingEntity[]>;
    create(this: any, reqdata?: MailingCreateData, ctrl?: Control): Promise<MailingEntity>;
    remove(this: any, reqmatch?: MailingRemoveMatch, ctrl?: Control): Promise<MailingEntity>;
}
export { MailingEntity };
