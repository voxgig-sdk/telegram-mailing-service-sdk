

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TelegramMailingServiceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('MailingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TELEGRAM_MAILING_SERVICE_TEST_LIVE=TRUE.
  afterEach(liveDelay('TELEGRAM_MAILING_SERVICE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TelegramMailingServiceSDK.test()
    const ent = testsdk.Mailing()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TELEGRAM_MAILING_SERVICE_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"attachments","req":false,"short":"Optional list of file URLs to attach","type":"`$ARRAY`","index$":0},{"active":true,"format":"date-time","name":"completedAt","req":false,"short":"Timestamp when the mailing was completed","type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Timestamp when the mailing was created","type":"`$STRING`","index$":2},{"active":true,"name":"failedCount","req":false,"short":"Number of messages that failed to send","type":"`$INTEGER`","index$":3},{"active":true,"format":"uuid","name":"id","req":false,"short":"Unique identifier of the mailing","type":"`$STRING`","index$":4},{"active":true,"name":"message","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"Message content","type":"`$STRING`","index$":5},{"active":true,"name":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"Name of the mailing campaign","type":"`$STRING`","index$":6},{"active":true,"name":"parseMode","req":false,"short":"Message formatting mode","type":"`$STRING`","index$":7},{"active":true,"name":"recipients","req":true,"short":"List of Telegram usernames or chat IDs","type":"`$ARRAY`","index$":8},{"active":true,"format":"date-time","name":"scheduleTime","req":false,"short":"Scheduled time for the mailing","type":"`$STRING`","index$":9},{"active":true,"name":"sentCount","req":false,"short":"Number of messages successfully sent","type":"`$INTEGER`","index$":10},{"active":true,"name":"status","req":false,"short":"Current status of the mailing","type":"`$STRING`","index$":11},{"active":true,"name":"totalRecipients","req":false,"short":"Total number of recipients","type":"`$INTEGER`","index$":12},{"active":true,"format":"date-time","name":"updatedAt","req":false,"short":"Timestamp when the mailing was last updated","type":"`$STRING`","index$":13}],"id":{"field":"id","name":"id"},"name":"mailing","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /mailings","json":"{\"operationId\":\"createMailing\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"basic\":{\"summary\":\"Basic mailing example\",\"value\":{\"message\":\"Welcome to our service!\",\"name\":\"Welcome Campaign\",\"recipients\":[\"@user1\",\"@user2\"],\"scheduleTime\":\"2024-01-15T10:00:00Z\"}}},\"schema\":{\"properties\":{\"attachments\":{\"description\":\"Optional list of file URLs to attach\",\"items\":{\"format\":\"uri\",\"type\":\"string\"},\"type\":\"array\"},\"message\":{\"description\":\"Message content to be sent to recipients\",\"example\":\"Welcome to our service!\",\"maxLength\":4096,\"minLength\":1,\"type\":\"string\"},\"name\":{\"description\":\"Name of the mailing campaign\",\"example\":\"Welcome Campaign\",\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"parseMode\":{\"default\":\"Markdown\",\"description\":\"Message formatting mode\",\"enum\":[\"Markdown\",\"HTML\",\"MarkdownV2\"],\"type\":\"string\"},\"recipients\":{\"description\":\"List of Telegram usernames or chat IDs\",\"example\":[\"@user1\",\"@user2\",\"123456789\"],\"items\":{\"type\":\"string\"},\"minItems\":1,\"type\":\"array\"},\"scheduleTime\":{\"description\":\"Optional scheduled time for sending the mailing (ISO 8601 format)\",\"example\":\"2024-01-15T10:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"name\",\"message\",\"recipients\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completedAt\":{\"description\":\"Timestamp when the mailing was completed\",\"example\":\"2024-01-15T10:35:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the mailing was created\",\"example\":\"2024-01-14T15:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"failedCount\":{\"description\":\"Number of messages that failed to send\",\"example\":5,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier of the mailing\",\"example\":\"123e4567-e89b-12d3-a456-426614174000\",\"format\":\"uuid\",\"type\":\"string\"},\"message\":{\"description\":\"Message content\",\"example\":\"Welcome to our service!\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the mailing campaign\",\"example\":\"Welcome Campaign\",\"type\":\"string\"},\"scheduleTime\":{\"description\":\"Scheduled time for the mailing\",\"example\":\"2024-01-15T10:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"sentCount\":{\"description\":\"Number of messages successfully sent\",\"example\":95,\"type\":\"integer\"},\"status\":{\"description\":\"Current status of the mailing\",\"enum\":[\"pending\",\"active\",\"completed\",\"cancelled\",\"failed\"],\"example\":\"active\",\"type\":\"string\"},\"totalRecipients\":{\"description\":\"Total number of recipients\",\"example\":100,\"type\":\"integer\"},\"updatedAt\":{\"description\":\"Timestamp when the mailing was last updated\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Mailing created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/mailings","segments":[{"lit":"mailings"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /mailings","json":"{\"operationId\":\"listMailings\",\"parameters\":[{\"description\":\"Filter mailings by status\",\"in\":\"query\",\"name\":\"status\",\"required\":false,\"schema\":{\"enum\":[\"pending\",\"active\",\"completed\",\"cancelled\",\"failed\"],\"type\":\"string\"}},{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of results to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"completedAt\":{\"description\":\"Timestamp when the mailing was completed\",\"example\":\"2024-01-15T10:35:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the mailing was created\",\"example\":\"2024-01-14T15:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"failedCount\":{\"description\":\"Number of messages that failed to send\",\"example\":5,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier of the mailing\",\"example\":\"123e4567-e89b-12d3-a456-426614174000\",\"format\":\"uuid\",\"type\":\"string\"},\"message\":{\"description\":\"Message content\",\"example\":\"Welcome to our service!\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the mailing campaign\",\"example\":\"Welcome Campaign\",\"type\":\"string\"},\"scheduleTime\":{\"description\":\"Scheduled time for the mailing\",\"example\":\"2024-01-15T10:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"sentCount\":{\"description\":\"Number of messages successfully sent\",\"example\":95,\"type\":\"integer\"},\"status\":{\"description\":\"Current status of the mailing\",\"enum\":[\"pending\",\"active\",\"completed\",\"cancelled\",\"failed\"],\"example\":\"active\",\"type\":\"string\"},\"totalRecipients\":{\"description\":\"Total number of recipients\",\"example\":100,\"type\":\"integer\"},\"updatedAt\":{\"description\":\"Timestamp when the mailing was last updated\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"limit\":{\"type\":\"integer\"},\"offset\":{\"type\":\"integer\"},\"total\":{\"description\":\"Total number of mailings\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"List of mailings retrieved successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/mailings","segments":[{"lit":"mailings"}],"select":{"exist":["limit","offset","status"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"mailing_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /mailings/{mailingId}","json":"{\"operationId\":\"getMailingStatus\",\"parameters\":[{\"description\":\"Unique identifier of the mailing\",\"in\":\"path\",\"name\":\"mailingId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completedAt\":{\"description\":\"Timestamp when the mailing was completed\",\"example\":\"2024-01-15T10:35:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the mailing was created\",\"example\":\"2024-01-14T15:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"failedCount\":{\"description\":\"Number of messages that failed to send\",\"example\":5,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier of the mailing\",\"example\":\"123e4567-e89b-12d3-a456-426614174000\",\"format\":\"uuid\",\"type\":\"string\"},\"message\":{\"description\":\"Message content\",\"example\":\"Welcome to our service!\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the mailing campaign\",\"example\":\"Welcome Campaign\",\"type\":\"string\"},\"scheduleTime\":{\"description\":\"Scheduled time for the mailing\",\"example\":\"2024-01-15T10:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"sentCount\":{\"description\":\"Number of messages successfully sent\",\"example\":95,\"type\":\"integer\"},\"status\":{\"description\":\"Current status of the mailing\",\"enum\":[\"pending\",\"active\",\"completed\",\"cancelled\",\"failed\"],\"example\":\"active\",\"type\":\"string\"},\"totalRecipients\":{\"description\":\"Total number of recipients\",\"example\":100,\"type\":\"integer\"},\"updatedAt\":{\"description\":\"Timestamp when the mailing was last updated\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Mailing status retrieved successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Mailing not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/mailings/{mailingId}","rename":{"param":{"mailingId":"id"}},"segments":[{"lit":"mailings"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"mailing_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /mailings/{mailingId}","json":"{\"operationId\":\"cancelMailing\",\"parameters\":[{\"description\":\"Unique identifier of the mailing to cancel\",\"in\":\"path\",\"name\":\"mailingId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"mailingId\":{\"format\":\"uuid\",\"type\":\"string\"},\"message\":{\"example\":\"Mailing cancelled successfully\",\"type\":\"string\"},\"status\":{\"enum\":[\"cancelled\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Mailing cancelled successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Mailing cannot be cancelled (already completed or cancelled)\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Mailing not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_REQUEST\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/mailings/{mailingId}","rename":{"param":{"mailingId":"id"}},"segments":[{"lit":"mailings"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"mailing","name__orig":"mailing","Name":"Mailing","name_":"mailing","name-":"mailing","NAME":"MAILING","index$":0}, {"active":true,"entity":"mailing","key$":"BasicMailingFlow","kind":"basic","name":"BasicMailingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"mailing_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"mailing_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"mailing_ref01","srcdatavar":"mailing_ref01_data","suffix":"_dt0"},"match":{"id":"mailing01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mailing_ref01"}}],"index$":2},{"active":true,"data":{},"input":{"ref":"mailing_ref01","suffix":"_rm0"},"match":{"id":"mailing01"},"op":"remove","spec":[],"valid":[],"index$":3},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"mailing_ref01"}}],"index$":4}]}, 'Mailing')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mailing_ref01_ent = client.Mailing()
    let mailing_ref01_data = setup.data.new.mailing['mailing_ref01']

    mailing_ref01_data = (await mailing_ref01_ent.create(mailing_ref01_data)).data()
    assert(null != mailing_ref01_data.id)


    // LIST
    const mailing_ref01_match: any = {}

    const mailing_ref01_list = (await mailing_ref01_ent.list(mailing_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(mailing_ref01_list, { id: mailing_ref01_data.id })))


    // LOAD
    const mailing_ref01_match_dt0: any = {}
    mailing_ref01_match_dt0.id = mailing_ref01_data.id
    const mailing_ref01_data_dt0 = (await mailing_ref01_ent.load(mailing_ref01_match_dt0)).data()
    assert(mailing_ref01_data_dt0.id === mailing_ref01_data.id)


    // REMOVE
    const mailing_ref01_match_rm0: any = { id: mailing_ref01_data.id }
    await mailing_ref01_ent.remove(mailing_ref01_match_rm0)
  

    // LIST
    const mailing_ref01_match_rt0: any = {}

    const mailing_ref01_list_rt0 = (await mailing_ref01_ent.list(mailing_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(mailing_ref01_list_rt0, { id: mailing_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mailing/MailingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TelegramMailingServiceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['mailing01','mailing02','mailing03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TELEGRAM_MAILING_SERVICE_TEST_MAILING_ENTID': idmap,
    'TELEGRAM_MAILING_SERVICE_TEST_LIVE': 'FALSE',
    'TELEGRAM_MAILING_SERVICE_TEST_EXPLAIN': 'FALSE',
    'TELEGRAM_MAILING_SERVICE_APIKEY': '',
  })

  idmap = env['TELEGRAM_MAILING_SERVICE_TEST_MAILING_ENTID']

  const live = 'TRUE' === env.TELEGRAM_MAILING_SERVICE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TELEGRAM_MAILING_SERVICE_TEST_MAILING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TelegramMailingServiceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.TELEGRAM_MAILING_SERVICE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TELEGRAM_MAILING_SERVICE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
