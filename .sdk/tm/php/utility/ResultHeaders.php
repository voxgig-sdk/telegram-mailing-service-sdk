<?php
declare(strict_types=1);

// TelegramMailingService SDK utility: result_headers

class TelegramMailingServiceResultHeaders
{
    public static function call(TelegramMailingServiceContext $ctx): ?TelegramMailingServiceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
