# TelegramMailingService Lua SDK Reference

Complete API reference for the TelegramMailingService Lua SDK.


## TelegramMailingServiceSDK

### Constructor

```lua
local sdk = require("telegram-mailing-service_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
```


### Instance Methods

#### `Mailing(data)`

Create a new `Mailing` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## MailingEntity

```lua
local mailing = client:Mailing(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Mailing(nil):create({
  recipient = --[[ `$ARRAY` ]],
}, nil)
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Mailing(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Mailing(nil):load({ id = "mailing_id" }, nil)
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Mailing(nil):remove({ id = "mailing_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

