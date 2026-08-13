# TelegramMailingService SDK utility: make_context

from projectname_sdk.core.context import TelegramMailingServiceContext


def make_context_util(ctxmap, basectx):
    return TelegramMailingServiceContext(ctxmap, basectx)
