<?php
declare(strict_types=1);

// TelegramMailingService SDK utility: prepare_body

class TelegramMailingServicePrepareBody
{
    public static function call(TelegramMailingServiceContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
