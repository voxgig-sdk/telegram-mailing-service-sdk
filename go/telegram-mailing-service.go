package voxgigtelegrammailingservicesdk

import (
	"github.com/voxgig-sdk/telegram-mailing-service-sdk/go/core"
	"github.com/voxgig-sdk/telegram-mailing-service-sdk/go/entity"
	"github.com/voxgig-sdk/telegram-mailing-service-sdk/go/feature"
	_ "github.com/voxgig-sdk/telegram-mailing-service-sdk/go/utility"
)

// Type aliases preserve external API.
type TelegramMailingServiceSDK = core.TelegramMailingServiceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TelegramMailingServiceEntity = core.TelegramMailingServiceEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TelegramMailingServiceError = core.TelegramMailingServiceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewMailingEntityFunc = func(client *core.TelegramMailingServiceSDK, entopts map[string]any) core.TelegramMailingServiceEntity {
		return entity.NewMailingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTelegramMailingServiceSDK = core.NewTelegramMailingServiceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
