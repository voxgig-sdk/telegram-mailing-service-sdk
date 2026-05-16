
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { TelegramMailingServiceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('MailingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TELEGRAMMAILINGSERVICE_TEST_LIVE=TRUE.
  afterEach(liveDelay('TELEGRAMMAILINGSERVICE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TelegramMailingServiceSDK.test()
    const ent = testsdk.Mailing()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TELEGRAM_MAILING_SERVICE_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'mailing.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set TELEGRAM_MAILING_SERVICE_TEST_MAILING_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mailing_ref01_ent = client.Mailing()
    let mailing_ref01_data = setup.data.new.mailing['mailing_ref01']

    mailing_ref01_data = await mailing_ref01_ent.create(mailing_ref01_data)
    assert(null != mailing_ref01_data.id)


    // LIST
    const mailing_ref01_match: any = {}

    const mailing_ref01_list = await mailing_ref01_ent.list(mailing_ref01_match)

    assert(!isempty(select(mailing_ref01_list, { id: mailing_ref01_data.id })))


    // LOAD
    const mailing_ref01_match_dt0: any = {}
    mailing_ref01_match_dt0.id = mailing_ref01_data.id
    const mailing_ref01_data_dt0 = await mailing_ref01_ent.load(mailing_ref01_match_dt0)
    assert(mailing_ref01_data_dt0.id === mailing_ref01_data.id)


    // REMOVE
    const mailing_ref01_match_rm0: any = { id: mailing_ref01_data.id }
    await mailing_ref01_ent.remove(mailing_ref01_match_rm0)
  

    // LIST
    const mailing_ref01_match_rt0: any = {}

    const mailing_ref01_list_rt0 = await mailing_ref01_ent.list(mailing_ref01_match_rt0)

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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['TELEGRAM_MAILING_SERVICE_TEST_MAILING_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'TELEGRAM_MAILING_SERVICE_TEST_MAILING_ENTID': idmap,
    'TELEGRAM_MAILING_SERVICE_TEST_LIVE': 'FALSE',
    'TELEGRAM_MAILING_SERVICE_TEST_EXPLAIN': 'FALSE',
    'TELEGRAM_MAILING_SERVICE_APIKEY': 'NONE',
  })

  idmap = env['TELEGRAM_MAILING_SERVICE_TEST_MAILING_ENTID']

  const live = 'TRUE' === env.TELEGRAM_MAILING_SERVICE_TEST_LIVE

  if (live) {
    client = new TelegramMailingServiceSDK(merge([
      {
        apikey: env.TELEGRAM_MAILING_SERVICE_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
