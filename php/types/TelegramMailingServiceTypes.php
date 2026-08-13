<?php
declare(strict_types=1);

// Typed models for the TelegramMailingService SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Mailing entity data model. */
class Mailing
{
    public ?array $attachments = null;
    public ?string $completedAt = null;
    public ?string $createdAt = null;
    public ?int $failedCount = null;
    public ?string $id = null;
    public ?string $message = null;
    public ?string $name = null;
    public ?string $parseMode = null;
    public array $recipients;
    public ?string $scheduleTime = null;
    public ?int $sentCount = null;
    public ?string $status = null;
    public ?int $totalRecipients = null;
    public ?string $updatedAt = null;
}

/** Request payload for Mailing#load. */
class MailingLoadMatch
{
    public string $id;
}

/** Request payload for Mailing#list. */
class MailingListMatch
{
    public ?array $attachments = null;
    public ?string $completedAt = null;
    public ?string $createdAt = null;
    public ?int $failedCount = null;
    public ?string $id = null;
    public ?string $message = null;
    public ?string $name = null;
    public ?string $parseMode = null;
    public ?array $recipients = null;
    public ?string $scheduleTime = null;
    public ?int $sentCount = null;
    public ?string $status = null;
    public ?int $totalRecipients = null;
    public ?string $updatedAt = null;
}

/** Request payload for Mailing#create. */
class MailingCreateData
{
    public ?array $attachments = null;
    public ?string $completedAt = null;
    public ?string $createdAt = null;
    public ?int $failedCount = null;
    public ?string $id = null;
    public ?string $message = null;
    public ?string $name = null;
    public ?string $parseMode = null;
    public array $recipients;
    public ?string $scheduleTime = null;
    public ?int $sentCount = null;
    public ?string $status = null;
    public ?int $totalRecipients = null;
    public ?string $updatedAt = null;
}

/** Request payload for Mailing#remove. */
class MailingRemoveMatch
{
    public string $id;
}

