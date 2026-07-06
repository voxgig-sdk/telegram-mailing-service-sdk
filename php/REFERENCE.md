# TelegramMailingService PHP SDK Reference

Complete API reference for the TelegramMailingService PHP SDK.


## TelegramMailingServiceSDK

### Constructor

```php
require_once __DIR__ . '/telegrammailingservice_sdk.php';

$client = new TelegramMailingServiceSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TelegramMailingServiceSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = TelegramMailingServiceSDK::test();
```


### Instance Methods

#### `Mailing($data = null)`

Create a new `MailingEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): TelegramMailingServiceUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## MailingEntity

```php
$mailing = $client->Mailing();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | `array` | No |  |
| `completed_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `failed_count` | `int` | No |  |
| `id` | `string` | No |  |
| `message` | `string` | No |  |
| `name` | `string` | No |  |
| `parse_mode` | `string` | No |  |
| `recipient` | `array` | Yes |  |
| `schedule_time` | `string` | No |  |
| `sent_count` | `int` | No |  |
| `status` | `string` | No |  |
| `total_recipient` | `int` | No |  |
| `updated_at` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `attachment` | - | - | - | - |
| `completed_at` | - | - | - | - |
| `created_at` | - | - | - | - |
| `failed_count` | - | - | - | - |
| `id` | - | - | - | - |
| `message` | - | - | Yes | - |
| `name` | - | - | Yes | - |
| `parse_mode` | - | - | - | - |
| `recipient` | - | - | - | - |
| `schedule_time` | - | - | - | - |
| `sent_count` | - | - | - | - |
| `status` | - | - | - | - |
| `total_recipient` | - | - | - | - |
| `updated_at` | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Mailing()->create([
  "recipient" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Mailing()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Mailing()->load(["id" => "mailing_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Mailing()->remove(["id" => "mailing_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MailingEntity`

Create a new `MailingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new TelegramMailingServiceSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

