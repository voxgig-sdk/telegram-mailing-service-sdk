<?php
declare(strict_types=1);

// TelegramMailingService SDK base feature

class TelegramMailingServiceBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TelegramMailingServiceContext $ctx, array $options): void {}
    public function PostConstruct(TelegramMailingServiceContext $ctx): void {}
    public function PostConstructEntity(TelegramMailingServiceContext $ctx): void {}
    public function SetData(TelegramMailingServiceContext $ctx): void {}
    public function GetData(TelegramMailingServiceContext $ctx): void {}
    public function GetMatch(TelegramMailingServiceContext $ctx): void {}
    public function SetMatch(TelegramMailingServiceContext $ctx): void {}
    public function PrePoint(TelegramMailingServiceContext $ctx): void {}
    public function PreSpec(TelegramMailingServiceContext $ctx): void {}
    public function PreRequest(TelegramMailingServiceContext $ctx): void {}
    public function PreResponse(TelegramMailingServiceContext $ctx): void {}
    public function PreResult(TelegramMailingServiceContext $ctx): void {}
    public function PreDone(TelegramMailingServiceContext $ctx): void {}
    public function PreUnexpected(TelegramMailingServiceContext $ctx): void {}
}
