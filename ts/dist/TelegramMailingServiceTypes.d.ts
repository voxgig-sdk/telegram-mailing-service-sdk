export interface Mailing {
    attachments?: any[];
    completedAt?: string;
    createdAt?: string;
    failedCount?: number;
    id?: string;
    message?: string;
    name?: string;
    parseMode?: string;
    recipients: any[];
    scheduleTime?: string;
    sentCount?: number;
    status?: string;
    totalRecipients?: number;
    updatedAt?: string;
}
export interface MailingLoadMatch {
    id: string;
}
export interface MailingListMatch {
    limit?: number;
    offset?: number;
    status?: string;
}
export interface MailingCreateData {
    attachments?: any[];
    completedAt?: string;
    createdAt?: string;
    failedCount?: number;
    id?: string;
    message?: string;
    name?: string;
    parseMode?: string;
    recipients: any[];
    scheduleTime?: string;
    sentCount?: number;
    status?: string;
    totalRecipients?: number;
    updatedAt?: string;
}
export interface MailingRemoveMatch {
    id: string;
}
