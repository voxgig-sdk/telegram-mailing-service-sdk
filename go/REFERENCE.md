# TelegramMailingService Golang SDK Reference

Complete API reference for the TelegramMailingService Golang SDK.


## TelegramMailingServiceSDK

### Constructor

```go
func NewTelegramMailingServiceSDK(options map[string]any) *TelegramMailingServiceSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *TelegramMailingServiceSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `Mailing(data map[string]any) TelegramMailingServiceEntity`

Create a new `Mailing` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## MailingEntity

```go
mailing := client.Mailing(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachment` | ``$ARRAY`` | No |  |
| `completed_at` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `failed_count` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `parse_mode` | ``$STRING`` | No |  |
| `recipient` | ``$ARRAY`` | Yes |  |
| `schedule_time` | ``$STRING`` | No |  |
| `sent_count` | ``$INTEGER`` | No |  |
| `status` | ``$STRING`` | No |  |
| `total_recipient` | ``$INTEGER`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `attachment` | - | - | - | - | - |
| `completed_at` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `failed_count` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `message` | - | - | Yes | - | - |
| `name` | - | - | Yes | - | - |
| `parse_mode` | - | - | - | - | - |
| `recipient` | - | - | - | - | - |
| `schedule_time` | - | - | - | - | - |
| `sent_count` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `total_recipient` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Mailing(nil).Create(map[string]any{
    "recipient": /* `$ARRAY` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Mailing(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Mailing(nil).Load(map[string]any{"id": "mailing_id"}, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Mailing(nil).Remove(map[string]any{"id": "mailing_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MailingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewTelegramMailingServiceSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

