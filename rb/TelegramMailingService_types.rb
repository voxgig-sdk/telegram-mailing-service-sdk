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
# @!attribute [rw] attachment
#   @return [Array, nil]
#
# @!attribute [rw] completed_at
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] failed_count
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
# @!attribute [rw] parse_mode
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [Array]
#
# @!attribute [rw] schedule_time
#   @return [String, nil]
#
# @!attribute [rw] sent_count
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_recipient
#   @return [Integer, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
Mailing = Struct.new(
  :attachment,
  :completed_at,
  :created_at,
  :failed_count,
  :id,
  :message,
  :name,
  :parse_mode,
  :recipient,
  :schedule_time,
  :sent_count,
  :status,
  :total_recipient,
  :updated_at,
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
# @!attribute [rw] attachment
#   @return [Array, nil]
#
# @!attribute [rw] completed_at
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] failed_count
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
# @!attribute [rw] parse_mode
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [Array, nil]
#
# @!attribute [rw] schedule_time
#   @return [String, nil]
#
# @!attribute [rw] sent_count
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_recipient
#   @return [Integer, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
MailingListMatch = Struct.new(
  :attachment,
  :completed_at,
  :created_at,
  :failed_count,
  :id,
  :message,
  :name,
  :parse_mode,
  :recipient,
  :schedule_time,
  :sent_count,
  :status,
  :total_recipient,
  :updated_at,
  keyword_init: true
)

# Request payload for Mailing#create.
#
# @!attribute [rw] attachment
#   @return [Array, nil]
#
# @!attribute [rw] completed_at
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] failed_count
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
# @!attribute [rw] parse_mode
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [Array]
#
# @!attribute [rw] schedule_time
#   @return [String, nil]
#
# @!attribute [rw] sent_count
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_recipient
#   @return [Integer, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
MailingCreateData = Struct.new(
  :attachment,
  :completed_at,
  :created_at,
  :failed_count,
  :id,
  :message,
  :name,
  :parse_mode,
  :recipient,
  :schedule_time,
  :sent_count,
  :status,
  :total_recipient,
  :updated_at,
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

