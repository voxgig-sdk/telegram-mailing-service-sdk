<?php
declare(strict_types=1);

// TelegramMailingService SDK configuration

class TelegramMailingServiceConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TelegramMailingService",
                "slug" => "telegram-mailing-service",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://app.telegasend.ru/api/v1",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "mailing" => [],
                ],
            ],
            "entity" => [
        'mailing' => [
          'fields' => [
            [
              'name' => 'attachments',
              'short' => 'Optional list of file URLs to attach',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'completedAt',
              'short' => 'Timestamp when the mailing was completed',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'createdAt',
              'short' => 'Timestamp when the mailing was created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'failedCount',
              'short' => 'Number of messages that failed to send',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier of the mailing',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'message',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Message content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Name of the mailing campaign',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'parseMode',
              'short' => 'Message formatting mode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'recipients',
              'req' => true,
              'short' => 'List of Telegram usernames or chat IDs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'scheduleTime',
              'short' => 'Scheduled time for the mailing',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sentCount',
              'short' => 'Number of messages successfully sent',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'short' => 'Current status of the mailing',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'totalRecipients',
              'short' => 'Total number of recipients',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'updatedAt',
              'short' => 'Timestamp when the mailing was last updated',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'mailing',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/mailings',
                  'parts' => [
                    'mailings',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mailings',
                  'parts' => [
                    'mailings',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                      'status',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'mailing_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mailings/{mailingId}',
                  'parts' => [
                    'mailings',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'mailingId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'mailing_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/mailings/{mailingId}',
                  'parts' => [
                    'mailings',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'mailingId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TelegramMailingServiceFeatures::make_feature($name);
    }
}
