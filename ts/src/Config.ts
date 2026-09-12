
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TelegramMailingService',
        slug: "telegram-mailing-service",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://app.telegasend.ru/api/v1",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      mailing: {
      },

    }
  }


  entity = {
    "mailing": {
      "fields": [
        {
          "name": "attachments",
          "short": "Optional list of file URLs to attach",
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "completedAt",
          "short": "Timestamp when the mailing was completed",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "createdAt",
          "short": "Timestamp when the mailing was created",
          "type": "`$STRING`"
        },
        {
          "name": "failedCount",
          "short": "Number of messages that failed to send",
          "type": "`$INTEGER`"
        },
        {
          "format": "uuid",
          "name": "id",
          "short": "Unique identifier of the mailing",
          "type": "`$STRING`"
        },
        {
          "name": "message",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Message content",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Name of the mailing campaign",
          "type": "`$STRING`"
        },
        {
          "name": "parseMode",
          "short": "Message formatting mode",
          "type": "`$STRING`"
        },
        {
          "name": "recipients",
          "req": true,
          "short": "List of Telegram usernames or chat IDs",
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "scheduleTime",
          "short": "Scheduled time for the mailing",
          "type": "`$STRING`"
        },
        {
          "name": "sentCount",
          "short": "Number of messages successfully sent",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "short": "Current status of the mailing",
          "type": "`$STRING`"
        },
        {
          "name": "totalRecipients",
          "short": "Total number of recipients",
          "type": "`$INTEGER`"
        },
        {
          "format": "date-time",
          "name": "updatedAt",
          "short": "Timestamp when the mailing was last updated",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "mailings"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "mailings"
              ]
            }
          ]
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/mailings",
              "segments": [
                {
                  "lit": "mailings"
                }
              ],
              "select": {
                "exist": [
                  "limit",
                  "offset",
                  "status"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "mailings"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/mailings/{mailingId}",
              "rename": {
                "param": {
                  "mailingId": "id"
                }
              },
              "segments": [
                {
                  "lit": "mailings"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "mailings",
                "{id}"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/mailings/{mailingId}",
              "rename": {
                "param": {
                  "mailingId": "id"
                }
              },
              "segments": [
                {
                  "lit": "mailings"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "mailings",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

