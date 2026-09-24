

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"sh":"Optional list of file URLs to attach","t":"`$ARRAY`","key$":"attachments","index$":0},"completedAt":{"a":true,"fo":"date-time","h":"Completed At","n":"completedAt","r":false,"sh":"Timestamp when the mailing was completed","t":"`$STRING`","key$":"completedAt","index$":1},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"Timestamp when the mailing was created","t":"`$STRING`","key$":"createdAt","index$":2},"failedCount":{"a":true,"h":"Failed Count","n":"failedCount","r":false,"sh":"Number of messages that failed to send","t":"`$INTEGER`","key$":"failedCount","index$":3},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"sh":"Unique identifier of the mailing","t":"`$STRING`","key$":"id","index$":4},"message":{"a":true,"h":"Message","n":"message","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Message content","t":"`$STRING`","key$":"message","index$":5},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Name of the mailing campaign","t":"`$STRING`","key$":"name","index$":6},"parseMode":{"a":true,"h":"Parse Mode","n":"parseMode","r":false,"sh":"Message formatting mode","t":"`$STRING`","key$":"parseMode","index$":7},"recipients":{"a":true,"h":"Recipients","n":"recipients","r":true,"sh":"List of Telegram usernames or chat IDs","t":"`$ARRAY`","key$":"recipients","index$":8},"scheduleTime":{"a":true,"fo":"date-time","h":"Schedule Time","n":"scheduleTime","r":false,"sh":"Scheduled time for the mailing","t":"`$STRING`","key$":"scheduleTime","index$":9},"sentCount":{"a":true,"h":"Sent Count","n":"sentCount","r":false,"sh":"Number of messages successfully sent","t":"`$INTEGER`","key$":"sentCount","index$":10},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Current status of the mailing","t":"`$STRING`","key$":"status","index$":11},"totalRecipients":{"a":true,"h":"Total Recipients","n":"totalRecipients","r":false,"sh":"Total number of recipients","t":"`$INTEGER`","key$":"totalRecipients","index$":12},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"Timestamp when the mailing was last updated","t":"`$STRING`","key$":"updatedAt","index$":13}},"id":{"field":"id","name":"id"},"name":"mailing","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /mailings","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mailings","q":{},"r":{},"s":[{"lit":"mailings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /mailings","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/mailings","q":{"exist":["limit","offset","status"]},"r":{},"s":[{"lit":"mailings"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /mailings/{mailingId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"mailing_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/mailings/{mailingId}","q":{"exist":["id"]},"r":{"param":{"mailingId":"id"}},"s":[{"lit":"mailings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /mailings/{mailingId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"mailing_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/mailings/{mailingId}","q":{"exist":["id"]},"r":{"param":{"mailingId":"id"}},"s":[{"lit":"mailings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"mailing","name__orig":"mailing","Name":"Mailing","name_":"mailing","name-":"mailing","NAME":"MAILING","index$":0}, {"active":true,"entity":"mailing","key$":"BasicMailingFlow","kind":"basic","name":"BasicMailingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"mailing_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mailing_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"mailing_ref01","srcdatavar":"mailing_ref01_data","suffix":"_dt0"},"m":{"id":"mailing01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mailing_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"mailing_ref01","suffix":"_rm0"},"m":{"id":"mailing01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"mailing_ref01"}}],"index$":4}]}, 'Mailing', {"POST /mailings":{"protocol":"http","operationId":"createMailing","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","message","recipients"],"properties":{"name":{"type":"string","description":"Name of the mailing campaign","minLength":1,"maxLength":255,"example":"Welcome Campaign","key$":"name"},"message":{"type":"string","description":"Message content to be sent to recipients","minLength":1,"maxLength":4096,"example":"Welcome to our service!","key$":"message"},"recipients":{"type":"array","description":"List of Telegram usernames or chat IDs","items":{"type":"string"},"minItems":1,"example":["@user1","@user2","123456789"],"key$":"recipients"},"scheduleTime":{"type":"string","format":"date-time","description":"Optional scheduled time for sending the mailing (ISO 8601 format)","example":"2024-01-15T10:00:00Z","key$":"scheduleTime"},"attachments":{"type":"array","description":"Optional list of file URLs to attach","items":{"type":"string","format":"uri"},"key$":"attachments"},"parseMode":{"type":"string","description":"Message formatting mode","enum":["Markdown","HTML","MarkdownV2"],"default":"Markdown","key$":"parseMode"}},"x-ref":"#/components/schemas/CreateMailingRequest","index$":1},"examples":{"basic":{"summary":"Basic mailing example","value":{"name":"Welcome Campaign","message":"Welcome to our service!","recipients":["@user1","@user2"],"scheduleTime":"2024-01-15T10:00:00Z"}}}}}},"responses":{"201":{"description":"Mailing created successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Unique identifier of the mailing","example":"123e4567-e89b-12d3-a456-426614174000","format":"uuid","type":"string","key$":"id"},"name":{"description":"Name of the mailing campaign","example":"Welcome Campaign","type":"string","key$":"name"},"message":{"description":"Message content","example":"Welcome to our service!","type":"string","key$":"message"},"status":{"description":"Current status of the mailing","enum":["pending","active","completed","cancelled","failed"],"example":"active","type":"string","key$":"status"},"totalRecipients":{"description":"Total number of recipients","example":100,"type":"integer","key$":"totalRecipients"},"sentCount":{"description":"Number of messages successfully sent","example":95,"type":"integer","key$":"sentCount"},"failedCount":{"description":"Number of messages that failed to send","example":5,"type":"integer","key$":"failedCount"},"scheduleTime":{"description":"Scheduled time for the mailing","example":"2024-01-15T10:00:00Z","format":"date-time","type":"string","key$":"scheduleTime"},"createdAt":{"description":"Timestamp when the mailing was created","example":"2024-01-14T15:30:00Z","format":"date-time","type":"string","key$":"createdAt"},"updatedAt":{"description":"Timestamp when the mailing was last updated","example":"2024-01-15T10:30:00Z","format":"date-time","type":"string","key$":"updatedAt"},"completedAt":{"description":"Timestamp when the mailing was completed","example":"2024-01-15T10:35:00Z","format":"date-time","type":"string","key$":"completedAt"}},"x-ref":"#/components/schemas/MailingResponse"}}}},"400":{"description":"Invalid request parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"401":{"description":"Unauthorized - Invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authentication"}}},"GET /mailings":{"protocol":"http","operationId":"listMailings","responses":{"200":{"description":"List of mailings retrieved successfully","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"completedAt":{"description":"Timestamp when the mailing was completed","example":"2024-01-15T10:35:00Z","format":"date-time","type":"string","key$":"completedAt"},"createdAt":{"description":"Timestamp when the mailing was created","example":"2024-01-14T15:30:00Z","format":"date-time","type":"string","key$":"createdAt"},"failedCount":{"description":"Number of messages that failed to send","example":5,"type":"integer","key$":"failedCount"},"id":{"description":"Unique identifier of the mailing","example":"123e4567-e89b-12d3-a456-426614174000","format":"uuid","type":"string","key$":"id"},"message":{"description":"Message content","example":"Welcome to our service!","type":"string","key$":"message"},"name":{"description":"Name of the mailing campaign","example":"Welcome Campaign","type":"string","key$":"name"},"scheduleTime":{"description":"Scheduled time for the mailing","example":"2024-01-15T10:00:00Z","format":"date-time","type":"string","key$":"scheduleTime"},"sentCount":{"description":"Number of messages successfully sent","example":95,"type":"integer","key$":"sentCount"},"status":{"description":"Current status of the mailing","enum":["pending","active","completed","cancelled","failed"],"example":"active","type":"string","key$":"status"},"totalRecipients":{"description":"Total number of recipients","example":100,"type":"integer","key$":"totalRecipients"},"updatedAt":{"description":"Timestamp when the mailing was last updated","example":"2024-01-15T10:30:00Z","format":"date-time","type":"string","key$":"updatedAt"}},"type":"object","x-ref":"#/components/schemas/MailingResponse","index$":0},"key$":"data","type":"array"},"total":{"description":"Total number of mailings","key$":"total","type":"integer"},"limit":{"key$":"limit","type":"integer"},"offset":{"key$":"offset","type":"integer"}}}}}},"401":{"description":"Unauthorized - Invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"status","in":"query","description":"Filter mailings by status","required":false,"schema":{"type":"string","enum":["pending","active","completed","cancelled","failed"]},"index$":0},{"name":"limit","in":"query","description":"Maximum number of results to return","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":1},{"name":"offset","in":"query","description":"Number of results to skip for pagination","required":false,"schema":{"type":"integer","minimum":0,"default":0},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authentication"}}},"GET /mailings/{mailingId}":{"protocol":"http","operationId":"getMailingStatus","responses":{"200":{"description":"Mailing status retrieved successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Unique identifier of the mailing","example":"123e4567-e89b-12d3-a456-426614174000","format":"uuid","type":"string","key$":"id"},"name":{"description":"Name of the mailing campaign","example":"Welcome Campaign","type":"string","key$":"name"},"message":{"description":"Message content","example":"Welcome to our service!","type":"string","key$":"message"},"status":{"description":"Current status of the mailing","enum":["pending","active","completed","cancelled","failed"],"example":"active","type":"string","key$":"status"},"totalRecipients":{"description":"Total number of recipients","example":100,"type":"integer","key$":"totalRecipients"},"sentCount":{"description":"Number of messages successfully sent","example":95,"type":"integer","key$":"sentCount"},"failedCount":{"description":"Number of messages that failed to send","example":5,"type":"integer","key$":"failedCount"},"scheduleTime":{"description":"Scheduled time for the mailing","example":"2024-01-15T10:00:00Z","format":"date-time","type":"string","key$":"scheduleTime"},"createdAt":{"description":"Timestamp when the mailing was created","example":"2024-01-14T15:30:00Z","format":"date-time","type":"string","key$":"createdAt"},"updatedAt":{"description":"Timestamp when the mailing was last updated","example":"2024-01-15T10:30:00Z","format":"date-time","type":"string","key$":"updatedAt"},"completedAt":{"description":"Timestamp when the mailing was completed","example":"2024-01-15T10:35:00Z","format":"date-time","type":"string","key$":"completedAt"}},"x-ref":"#/components/schemas/MailingResponse","index$":0}}}},"401":{"description":"Unauthorized - Invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Mailing not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"mailingId","in":"path","description":"Unique identifier of the mailing","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authentication"}}},"DELETE /mailings/{mailingId}":{"protocol":"http","operationId":"cancelMailing","responses":{"200":{"description":"Mailing cancelled successfully","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","example":"Mailing cancelled successfully"},"mailingId":{"type":"string","format":"uuid"},"status":{"type":"string","enum":["cancelled"]}}}}}},"400":{"description":"Mailing cannot be cancelled (already completed or cancelled)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"401":{"description":"Unauthorized - Invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Mailing not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_REQUEST"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"mailingId","in":"path","description":"Unique identifier of the mailing to cancel","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authentication"}}}})
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
  
