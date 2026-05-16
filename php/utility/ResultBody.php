<?php
declare(strict_types=1);

// TelegramMailingService SDK utility: result_body

class TelegramMailingServiceResultBody
{
    public static function call(TelegramMailingServiceContext $ctx): ?TelegramMailingServiceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
