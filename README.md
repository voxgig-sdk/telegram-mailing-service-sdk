# TelegramMailingService SDK

Create, manage, and track mailing campaigns sent through Telegram bots

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Telegram Mailing Service

The Telegram Mailing Service API is provided by [TelegaSend](https://app.telegasend.ru), a service that lets developers run bulk-messaging campaigns to Telegram users through a bot. Requests are made against `https://app.telegasend.ru/api/v1` and authenticated with a Telegram `bot_token` supplied in the request body.

What you get from the API:

- Launch a new mailing with a bot token, message text, optional schedule, development-mode flag, and a recipient list supplied via file URL (`POST /api/v1/mailing`).
- Look up the current delivery status of a previously created mailing by its identifier (`GET /api/v1/mailing/{id}`).
- A per-mailing recipient cap of 1,000.

Operational notes: CORS is disabled, so the API is intended for server-side use rather than direct browser calls. Community monitoring on FreePublicAPIs reports ~700ms average response times and 100% reliability over a recent 30-day window. Licence terms are not published on the catalogue page — consult TelegaSend directly before relying on the service.

## Try it

**TypeScript**
```bash
npm install telegram-mailing-service
```

**Python**
```bash
pip install telegram-mailing-service-sdk
```

**PHP**
```bash
composer require voxgig/telegram-mailing-service-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/telegram-mailing-service-sdk/go
```

**Ruby**
```bash
gem install telegram-mailing-service-sdk
```

**Lua**
```bash
luarocks install telegram-mailing-service-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TelegramMailingServiceSDK } from 'telegram-mailing-service'

const client = new TelegramMailingServiceSDK({})

// List all mailings
const mailings = await client.Mailing().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o telegram-mailing-service-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "telegram-mailing-service": {
      "command": "/abs/path/to/telegram-mailing-service-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Mailing** | A Telegram mailing campaign — created with `POST /api/v1/mailing` (bot token, message, schedule, recipient file URL) and inspected with `GET /api/v1/mailing/{id}` for delivery status. | `/mailings` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from telegrammailingservice_sdk import TelegramMailingServiceSDK

client = TelegramMailingServiceSDK({})

# List all mailings
mailings, err = client.Mailing(None).list(None, None)

# Load a specific mailing
mailing, err = client.Mailing(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'telegrammailingservice_sdk.php';

$client = new TelegramMailingServiceSDK([]);

// List all mailings
[$mailings, $err] = $client->Mailing(null)->list(null, null);

// Load a specific mailing
[$mailing, $err] = $client->Mailing(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/telegram-mailing-service-sdk/go"

client := sdk.NewTelegramMailingServiceSDK(map[string]any{})

// List all mailings
mailings, err := client.Mailing(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "TelegramMailingService_sdk"

client = TelegramMailingServiceSDK.new({})

# List all mailings
mailings, err = client.Mailing(nil).list(nil, nil)

# Load a specific mailing
mailing, err = client.Mailing(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("telegram-mailing-service_sdk")

local client = sdk.new({})

-- List all mailings
local mailings, err = client:Mailing(nil):list(nil, nil)

-- Load a specific mailing
local mailing, err = client:Mailing(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TelegramMailingServiceSDK.test()
const result = await client.Mailing().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TelegramMailingServiceSDK.test(None, None)
result, err = client.Mailing(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TelegramMailingServiceSDK::test(null, null);
[$result, $err] = $client->Mailing(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Mailing(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TelegramMailingServiceSDK.test(nil, nil)
result, err = client.Mailing(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Mailing(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Telegram Mailing Service

- Upstream: [https://app.telegasend.ru](https://app.telegasend.ru)
- API docs: [https://freepublicapis.com/telegram-mailing-service](https://freepublicapis.com/telegram-mailing-service)

---

Generated from the Telegram Mailing Service OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
