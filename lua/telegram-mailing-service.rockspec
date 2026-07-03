package = "voxgig-sdk-telegram-mailing-service"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/telegram-mailing-service-sdk.git",
  tag = "lua/v0.0.1",
  dir = "telegram-mailing-service-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Telegram Mailing Service public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/telegram-mailing-service-sdk",
  issues_url = "https://github.com/voxgig-sdk/telegram-mailing-service-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "telegram-mailing-service" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["telegram-mailing-service_sdk"] = "telegram-mailing-service_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
