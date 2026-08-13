// Typed models for the TelegramMailingService SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Mailing {
  attachments?: any[]
  completedAt?: string
  createdAt?: string
  failedCount?: number
  id?: string
  message?: string
  name?: string
  parseMode?: string
  recipients: any[]
  scheduleTime?: string
  sentCount?: number
  status?: string
  totalRecipients?: number
  updatedAt?: string
}

export interface MailingLoadMatch {
  id: string
}

export interface MailingListMatch {
  attachments?: any[]
  completedAt?: string
  createdAt?: string
  failedCount?: number
  id?: string
  message?: string
  name?: string
  parseMode?: string
  recipients?: any[]
  scheduleTime?: string
  sentCount?: number
  status?: string
  totalRecipients?: number
  updatedAt?: string
}

export interface MailingCreateData {
  attachments?: any[]
  completedAt?: string
  createdAt?: string
  failedCount?: number
  id?: string
  message?: string
  name?: string
  parseMode?: string
  recipients: any[]
  scheduleTime?: string
  sentCount?: number
  status?: string
  totalRecipients?: number
  updatedAt?: string
}

export interface MailingRemoveMatch {
  id: string
}

