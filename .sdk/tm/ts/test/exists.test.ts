
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TelegramMailingServiceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TelegramMailingServiceSDK.test()
    equal(testsdk instanceof TelegramMailingServiceSDK, true,
      'TelegramMailingServiceSDK.test() must return a client synchronously')
  })

})
