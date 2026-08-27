# TelegramMailingService SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "TelegramMailingService",
            "slug": "telegram-mailing-service",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://app.telegasend.ru/api/v1",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "mailing": {},
            },
        },
        "entity": {
      "mailing": {
        "fields": [
          {
            "name": "attachments",
            "short": "Optional list of file URLs to attach",
            "type": "`$ARRAY`",
          },
          {
            "name": "completedAt",
            "short": "Timestamp when the mailing was completed",
            "type": "`$STRING`",
          },
          {
            "name": "createdAt",
            "short": "Timestamp when the mailing was created",
            "type": "`$STRING`",
          },
          {
            "name": "failedCount",
            "short": "Number of messages that failed to send",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Unique identifier of the mailing",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Message content",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Name of the mailing campaign",
            "type": "`$STRING`",
          },
          {
            "name": "parseMode",
            "short": "Message formatting mode",
            "type": "`$STRING`",
          },
          {
            "name": "recipients",
            "req": True,
            "short": "List of Telegram usernames or chat IDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "scheduleTime",
            "short": "Scheduled time for the mailing",
            "type": "`$STRING`",
          },
          {
            "name": "sentCount",
            "short": "Number of messages successfully sent",
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "short": "Current status of the mailing",
            "type": "`$STRING`",
          },
          {
            "name": "totalRecipients",
            "short": "Total number of recipients",
            "type": "`$INTEGER`",
          },
          {
            "name": "updatedAt",
            "short": "Timestamp when the mailing was last updated",
            "type": "`$STRING`",
          },
        ],
        "name": "mailing",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/mailings",
                "parts": [
                  "mailings",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/mailings",
                "parts": [
                  "mailings",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "status",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "mailing_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/mailings/{mailingId}",
                "parts": [
                  "mailings",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "mailingId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "mailing_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/mailings/{mailingId}",
                "parts": [
                  "mailings",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "mailingId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
