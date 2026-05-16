<?php
declare(strict_types=1);

// TelegramMailingService SDK utility: feature_add

class TelegramMailingServiceFeatureAdd
{
    public static function call(TelegramMailingServiceContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
