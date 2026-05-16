package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMailingEntityFunc func(client *TelegramMailingServiceSDK, entopts map[string]any) TelegramMailingServiceEntity

