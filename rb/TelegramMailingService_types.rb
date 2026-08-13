# frozen_string_literal: true

# Typed models for the TelegramMailingService SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Mailing entity data model.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] failedCount
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] parseMode
#   @return [String, nil]
#
# @!attribute [rw] recipients
#   @return [Array]
#
# @!attribute [rw] scheduleTime
#   @return [String, nil]
#
# @!attribute [rw] sentCount
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] totalRecipients
#   @return [Integer, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
Mailing = Struct.new(
  :attachments,
  :completedAt,
  :createdAt,
  :failedCount,
  :id,
  :message,
  :name,
  :parseMode,
  :recipients,
  :scheduleTime,
  :sentCount,
  :status,
  :totalRecipients,
  :updatedAt,
  keyword_init: true
)

# Request payload for Mailing#load.
#
# @!attribute [rw] id
#   @return [String]
MailingLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Mailing#list.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] failedCount
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] parseMode
#   @return [String, nil]
#
# @!attribute [rw] recipients
#   @return [Array, nil]
#
# @!attribute [rw] scheduleTime
#   @return [String, nil]
#
# @!attribute [rw] sentCount
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] totalRecipients
#   @return [Integer, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
MailingListMatch = Struct.new(
  :attachments,
  :completedAt,
  :createdAt,
  :failedCount,
  :id,
  :message,
  :name,
  :parseMode,
  :recipients,
  :scheduleTime,
  :sentCount,
  :status,
  :totalRecipients,
  :updatedAt,
  keyword_init: true
)

# Request payload for Mailing#create.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] failedCount
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] parseMode
#   @return [String, nil]
#
# @!attribute [rw] recipients
#   @return [Array]
#
# @!attribute [rw] scheduleTime
#   @return [String, nil]
#
# @!attribute [rw] sentCount
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] totalRecipients
#   @return [Integer, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
MailingCreateData = Struct.new(
  :attachments,
  :completedAt,
  :createdAt,
  :failedCount,
  :id,
  :message,
  :name,
  :parseMode,
  :recipients,
  :scheduleTime,
  :sentCount,
  :status,
  :totalRecipients,
  :updatedAt,
  keyword_init: true
)

# Request payload for Mailing#remove.
#
# @!attribute [rw] id
#   @return [String]
MailingRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

