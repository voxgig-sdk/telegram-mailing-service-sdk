# Typed models for the TelegramMailingService SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Mailing:
    recipient: list
    attachment: Optional[list] = None
    completed_at: Optional[str] = None
    created_at: Optional[str] = None
    failed_count: Optional[int] = None
    id: Optional[str] = None
    message: Optional[str] = None
    name: Optional[str] = None
    parse_mode: Optional[str] = None
    schedule_time: Optional[str] = None
    sent_count: Optional[int] = None
    status: Optional[str] = None
    total_recipient: Optional[int] = None
    updated_at: Optional[str] = None


@dataclass
class MailingLoadMatch:
    id: str


@dataclass
class MailingListMatch:
    attachment: Optional[list] = None
    completed_at: Optional[str] = None
    created_at: Optional[str] = None
    failed_count: Optional[int] = None
    id: Optional[str] = None
    message: Optional[str] = None
    name: Optional[str] = None
    parse_mode: Optional[str] = None
    recipient: Optional[list] = None
    schedule_time: Optional[str] = None
    sent_count: Optional[int] = None
    status: Optional[str] = None
    total_recipient: Optional[int] = None
    updated_at: Optional[str] = None


@dataclass
class MailingCreateData:
    attachment: Optional[list] = None
    completed_at: Optional[str] = None
    created_at: Optional[str] = None
    failed_count: Optional[int] = None
    id: Optional[str] = None
    message: Optional[str] = None
    name: Optional[str] = None
    parse_mode: Optional[str] = None
    recipient: Optional[list] = None
    schedule_time: Optional[str] = None
    sent_count: Optional[int] = None
    status: Optional[str] = None
    total_recipient: Optional[int] = None
    updated_at: Optional[str] = None


@dataclass
class MailingRemoveMatch:
    id: str

