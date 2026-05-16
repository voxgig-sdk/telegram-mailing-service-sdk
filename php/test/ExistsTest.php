<?php
declare(strict_types=1);

// TelegramMailingService SDK exists test

require_once __DIR__ . '/../telegrammailingservice_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TelegramMailingServiceSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
