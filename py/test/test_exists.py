# ProjectName SDK exists test

import pytest
from telegrammailingservice_sdk import TelegramMailingServiceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TelegramMailingServiceSDK.test(None, None)
        assert testsdk is not None
