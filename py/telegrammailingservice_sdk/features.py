# TelegramMailingService SDK feature factory

from telegrammailingservice_sdk.feature.base_feature import TelegramMailingServiceBaseFeature
from telegrammailingservice_sdk.feature.ratelimit_feature import TelegramMailingServiceRatelimitFeature
from telegrammailingservice_sdk.feature.retry_feature import TelegramMailingServiceRetryFeature
from telegrammailingservice_sdk.feature.test_feature import TelegramMailingServiceTestFeature
from telegrammailingservice_sdk.feature.timeout_feature import TelegramMailingServiceTimeoutFeature


_FEATURES = {
    "base": lambda: TelegramMailingServiceBaseFeature(),
    "ratelimit": lambda: TelegramMailingServiceRatelimitFeature(),
    "retry": lambda: TelegramMailingServiceRetryFeature(),
    "test": lambda: TelegramMailingServiceTestFeature(),
    "timeout": lambda: TelegramMailingServiceTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
