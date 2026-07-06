# Typed models for the TelegramMailingService SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class MailingRequired(TypedDict):
    recipient: list


class Mailing(MailingRequired, total=False):
    attachment: list
    completed_at: str
    created_at: str
    failed_count: int
    id: str
    message: str
    name: str
    parse_mode: str
    schedule_time: str
    sent_count: int
    status: str
    total_recipient: int
    updated_at: str


class MailingLoadMatch(TypedDict):
    id: str


class MailingListMatch(TypedDict, total=False):
    attachment: list
    completed_at: str
    created_at: str
    failed_count: int
    id: str
    message: str
    name: str
    parse_mode: str
    recipient: list
    schedule_time: str
    sent_count: int
    status: str
    total_recipient: int
    updated_at: str


class MailingCreateDataRequired(TypedDict):
    recipient: list


class MailingCreateData(MailingCreateDataRequired, total=False):
    attachment: list
    completed_at: str
    created_at: str
    failed_count: int
    id: str
    message: str
    name: str
    parse_mode: str
    schedule_time: str
    sent_count: int
    status: str
    total_recipient: int
    updated_at: str


class MailingRemoveMatch(TypedDict):
    id: str
