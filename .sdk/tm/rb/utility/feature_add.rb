# TelegramMailingService SDK utility: feature_add
module TelegramMailingServiceUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
