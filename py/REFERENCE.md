# TelegramMailingService Python SDK Reference

Complete API reference for the TelegramMailingService Python SDK.


## TelegramMailingServiceSDK

### Constructor

```python
from telegrammailingservice_sdk import TelegramMailingServiceSDK

client = TelegramMailingServiceSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TelegramMailingServiceSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = TelegramMailingServiceSDK.test()
```


### Instance Methods

#### `Mailing(data=None)`

Create a new `MailingEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## MailingEntity

```python
mailing = client.Mailing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `list` | No | Optional list of file URLs to attach |
| `completedAt` | `str` | No | Timestamp when the mailing was completed |
| `createdAt` | `str` | No | Timestamp when the mailing was created |
| `failedCount` | `int` | No | Number of messages that failed to send |
| `id` | `str` | No | Unique identifier of the mailing |
| `message` | `str` | No | Message content |
| `name` | `str` | No | Name of the mailing campaign |
| `parseMode` | `str` | No | Message formatting mode |
| `recipients` | `list` | Yes | List of Telegram usernames or chat IDs |
| `scheduleTime` | `str` | No | Scheduled time for the mailing |
| `sentCount` | `int` | No | Number of messages successfully sent |
| `status` | `str` | No | Current status of the mailing |
| `totalRecipients` | `int` | No | Total number of recipients |
| `updatedAt` | `str` | No | Timestamp when the mailing was last updated |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `attachments` | - | - | - | - |
| `completedAt` | - | - | - | - |
| `createdAt` | - | - | - | - |
| `failedCount` | - | - | - | - |
| `id` | - | - | - | - |
| `message` | - | - | Yes | - |
| `name` | - | - | Yes | - |
| `parseMode` | - | - | - | - |
| `recipients` | - | - | - | - |
| `scheduleTime` | - | - | - | - |
| `sentCount` | - | - | - | - |
| `status` | - | - | - | - |
| `totalRecipients` | - | - | - | - |
| `updatedAt` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Mailing().create({
    "recipients": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Mailing().list()
for mailing in results:
    print(mailing)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Mailing().load({"id": "mailing_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Mailing().remove({"id": "mailing_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MailingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = TelegramMailingServiceSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

