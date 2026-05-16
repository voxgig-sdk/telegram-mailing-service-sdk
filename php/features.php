<?php
declare(strict_types=1);

// TelegramMailingService SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TelegramMailingServiceFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TelegramMailingServiceBaseFeature();
            case "test":
                return new TelegramMailingServiceTestFeature();
            default:
                return new TelegramMailingServiceBaseFeature();
        }
    }
}
