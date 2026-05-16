<?php
declare(strict_types=1);

// TelegramMailingService SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TelegramMailingServiceUtility::setRegistrar(function (TelegramMailingServiceUtility $u): void {
    $u->clean = [TelegramMailingServiceClean::class, 'call'];
    $u->done = [TelegramMailingServiceDone::class, 'call'];
    $u->make_error = [TelegramMailingServiceMakeError::class, 'call'];
    $u->feature_add = [TelegramMailingServiceFeatureAdd::class, 'call'];
    $u->feature_hook = [TelegramMailingServiceFeatureHook::class, 'call'];
    $u->feature_init = [TelegramMailingServiceFeatureInit::class, 'call'];
    $u->fetcher = [TelegramMailingServiceFetcher::class, 'call'];
    $u->make_fetch_def = [TelegramMailingServiceMakeFetchDef::class, 'call'];
    $u->make_context = [TelegramMailingServiceMakeContext::class, 'call'];
    $u->make_options = [TelegramMailingServiceMakeOptions::class, 'call'];
    $u->make_request = [TelegramMailingServiceMakeRequest::class, 'call'];
    $u->make_response = [TelegramMailingServiceMakeResponse::class, 'call'];
    $u->make_result = [TelegramMailingServiceMakeResult::class, 'call'];
    $u->make_point = [TelegramMailingServiceMakePoint::class, 'call'];
    $u->make_spec = [TelegramMailingServiceMakeSpec::class, 'call'];
    $u->make_url = [TelegramMailingServiceMakeUrl::class, 'call'];
    $u->param = [TelegramMailingServiceParam::class, 'call'];
    $u->prepare_auth = [TelegramMailingServicePrepareAuth::class, 'call'];
    $u->prepare_body = [TelegramMailingServicePrepareBody::class, 'call'];
    $u->prepare_headers = [TelegramMailingServicePrepareHeaders::class, 'call'];
    $u->prepare_method = [TelegramMailingServicePrepareMethod::class, 'call'];
    $u->prepare_params = [TelegramMailingServicePrepareParams::class, 'call'];
    $u->prepare_path = [TelegramMailingServicePreparePath::class, 'call'];
    $u->prepare_query = [TelegramMailingServicePrepareQuery::class, 'call'];
    $u->result_basic = [TelegramMailingServiceResultBasic::class, 'call'];
    $u->result_body = [TelegramMailingServiceResultBody::class, 'call'];
    $u->result_headers = [TelegramMailingServiceResultHeaders::class, 'call'];
    $u->transform_request = [TelegramMailingServiceTransformRequest::class, 'call'];
    $u->transform_response = [TelegramMailingServiceTransformResponse::class, 'call'];
});
