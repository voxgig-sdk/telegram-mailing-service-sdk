package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "TelegramMailingService",
			"slug": "telegram-mailing-service",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://app.telegasend.ru/api/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"mailing": map[string]any{},
			},
		},
		"entity": map[string]any{
			"mailing": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attachments",
						"short": "Optional list of file URLs to attach",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "completedAt",
						"short": "Timestamp when the mailing was completed",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "Timestamp when the mailing was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "failedCount",
						"short": "Number of messages that failed to send",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "uuid",
						"name": "id",
						"short": "Unique identifier of the mailing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Message content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Name of the mailing campaign",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parseMode",
						"short": "Message formatting mode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "recipients",
						"req": true,
						"short": "List of Telegram usernames or chat IDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "scheduleTime",
						"short": "Scheduled time for the mailing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sentCount",
						"short": "Number of messages successfully sent",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"short": "Current status of the mailing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "totalRecipients",
						"short": "Total number of recipients",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updatedAt",
						"short": "Timestamp when the mailing was last updated",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "mailing",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/mailings",
								"segments": []any{
									map[string]any{
										"lit": "mailings",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"mailings",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/mailings",
								"segments": []any{
									map[string]any{
										"lit": "mailings",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"mailings",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "mailing_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/mailings/{mailingId}",
								"rename": map[string]any{
									"param": map[string]any{
										"mailingId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "mailings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"mailings",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "mailing_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/mailings/{mailingId}",
								"rename": map[string]any{
									"param": map[string]any{
										"mailingId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "mailings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"mailings",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
