-- Typed models for the TelegramMailingService SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Mailing
---@field attachments? table
---@field completedAt? string
---@field createdAt? string
---@field failedCount? number
---@field id? string
---@field message? string
---@field name? string
---@field parseMode? string
---@field recipients table
---@field scheduleTime? string
---@field sentCount? number
---@field status? string
---@field totalRecipients? number
---@field updatedAt? string

---@class MailingLoadMatch
---@field id string

---@class MailingListMatch
---@field limit? number
---@field offset? number
---@field status? string

---@class MailingCreateData
---@field attachments? table
---@field completedAt? string
---@field createdAt? string
---@field failedCount? number
---@field id? string
---@field message? string
---@field name? string
---@field parseMode? string
---@field recipients table
---@field scheduleTime? string
---@field sentCount? number
---@field status? string
---@field totalRecipients? number
---@field updatedAt? string

---@class MailingRemoveMatch
---@field id string

local M = {}

return M
