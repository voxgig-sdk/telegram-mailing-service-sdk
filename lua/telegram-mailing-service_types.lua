-- Typed models for the TelegramMailingService SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Mailing
---@field attachment? table
---@field completed_at? string
---@field created_at? string
---@field failed_count? number
---@field id? string
---@field message? string
---@field name? string
---@field parse_mode? string
---@field recipient table
---@field schedule_time? string
---@field sent_count? number
---@field status? string
---@field total_recipient? number
---@field updated_at? string

---@class MailingLoadMatch
---@field id string

---@class MailingListMatch
---@field attachment? table
---@field completed_at? string
---@field created_at? string
---@field failed_count? number
---@field id? string
---@field message? string
---@field name? string
---@field parse_mode? string
---@field recipient? table
---@field schedule_time? string
---@field sent_count? number
---@field status? string
---@field total_recipient? number
---@field updated_at? string

---@class MailingCreateData
---@field attachment? table
---@field completed_at? string
---@field created_at? string
---@field failed_count? number
---@field id? string
---@field message? string
---@field name? string
---@field parse_mode? string
---@field recipient table
---@field schedule_time? string
---@field sent_count? number
---@field status? string
---@field total_recipient? number
---@field updated_at? string

---@class MailingRemoveMatch
---@field id string

local M = {}

return M
