// Typed models for the TelegramMailingService SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Mailing {
  attachment?: any[]
  completed_at?: string
  created_at?: string
  failed_count?: number
  id?: string
  message?: string
  name?: string
  parse_mode?: string
  recipient: any[]
  schedule_time?: string
  sent_count?: number
  status?: string
  total_recipient?: number
  updated_at?: string
}

export interface MailingLoadMatch {
  id: string
}

export type MailingListMatch = Partial<Mailing>

export type MailingCreateData = Partial<Mailing>

export interface MailingRemoveMatch {
  id: string
}

