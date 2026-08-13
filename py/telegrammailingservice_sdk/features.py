# TelegramMailingService SDK feature factory

from telegrammailingservice_sdk.feature.base_feature import TelegramMailingServiceBaseFeature
from telegrammailingservice_sdk.feature.test_feature import TelegramMailingServiceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TelegramMailingServiceBaseFeature(),
        "test": lambda: TelegramMailingServiceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
