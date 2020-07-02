import * as nock from 'nock'
import * as mock from './mock'
import { AirtableMetaClient } from '../src/metadataClient'

const csrf = 'testcsrftoken'
const baseId = 'appdEZLWBaSkQO86T'
const creds = {
  email: 'test@example.com',
  password: 'tester',
  _csrf: csrf
}

let client: AirtableMetaClient

describe('metadata client', () => {
  beforeAll(() => {
    nock.disableNetConnect()
  })

  afterAll(() => {
    nock.enableNetConnect()
  })

  beforeEach(() => {
    client = new AirtableMetaClient(creds)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('instatiation', () => {
    test('should be able to create client instance with credentials', () => {
      const client = new AirtableMetaClient(creds)

      expect(client).toBeInstanceOf(AirtableMetaClient)
    })

    test('should be able to create client instance passing API url', () => {
      const client = new AirtableMetaClient({
        ...creds,
        apiUrl: 'https://test.airtable.com'
      })

      expect(client).toBeInstanceOf(AirtableMetaClient)
    })
  })

  describe('login', () => {
    test('should be able to login with valid credentials', async () => {
      const scope = mock.getLoginPage({ csrf })
      mock.postLoginSucceded(creds, { scope })

      const result = await client.login()
      expect(result).toBe(true)

      scope.done()
    })

    test('should fail to login with invalid credentials', async () => {
      const scope = mock.getLoginPage({ csrf })
      mock.postLoginFailed(creds, { scope })

      const result = await client.login()
      expect(result).toBe(false)

      scope.done()
    })

    test('should throw an error when fetching login page fails', async () => {
      const scope = mock.getLoginPageFailed()

      await expect(client.login())
        .rejects.toThrow(/error fetching csrf token/i)

      scope.done()
    })
  })

  describe('getBase', () => {
    const baseData = expect.objectContaining({
      id: baseId,
      name: 'Demo Base',
      icon: null,
      color: 'cyan',
      tables: expect.arrayContaining([
        expect.objectContaining({
          id: 'tblQS6zY0FPbiIUkD',
          name: 'All types',
          defaultView: {
            id: 'viwecZnVNYbGgVQh0',
            name: 'Grid view'
          },
          isEmptyDueToFilter: false,
          primaryColumnName: 'Single line text - Primary Field',
          columns: expect.arrayContaining([
            {
              id: 'fld4OfvUakyJBVmqT',
              name: 'Single line text - Primary Field',
              type: 'text',
              typeOptions: null
            },
            {
              id: 'flde9EyTSyQ0eKoQC',
              name: 'URL',
              type: 'text',
              typeOptions: { validatorName: 'url' }
            },
            {
              id: 'fldf3dzyeA6jC5kQe',
              name: 'Long text',
              type: 'multilineText',
              typeOptions: null
            }
          ])
        })
      ])
    })

    test('should be able to authenticate and fetch base metadata', async () => {
      const scope = mock.getBaseDocsFailed({ baseId })
      mock.getLoginPage({ csrf }, { scope })
      mock.postLoginSucceded(creds, { scope })
      mock.getBaseDocsSucceded({ baseId }, { scope })

      const base = await client.getBase(baseId)
      expect(base).toEqual(baseData)

      scope.done()
    })

    test('should be able to fetch base metadata when client is already authenticated', async () => {
      const scope = mock.getLoginPage({ csrf })
      mock.postLoginSucceded(creds, { scope })
      mock.getBaseDocsSucceded({ baseId }, { scope })

      const loggedIn = await client.login()
      expect(loggedIn).toBe(true)

      const base = await client.getBase(baseId)
      expect(base).toEqual(baseData)

      scope.done()
    })

    test('should throw an error when unable to authenticate client', async () => {
      const scope = mock.getBaseDocsFailed({ baseId })
      mock.getLoginPage({ csrf }, { scope })
      mock.postLoginFailed(creds, { scope })

      await expect(client.getBase(baseId))
        .rejects.toThrow(/error authenticating client/i)

      scope.done()
    })

    test('should throw an error when unable to parse application data from docs page', async () => {
      const scope = mock.getLoginPage({ csrf })
      mock.postLoginSucceded(creds, { scope })
      mock.getBaseDocsError({ baseId }, { scope })

      const loggedIn = await client.login()
      expect(loggedIn).toBe(true)

      await expect(client.getBase(baseId))
        .rejects.toThrow(/base metadata not found/i)

      scope.done()
    })

    test('should throw an error when base does not exist', async () => {
      const nonExistingBaseId = 'm1551ngb453'

      const scope = mock.getLoginPage({ csrf })
      mock.postLoginSucceded(creds, { scope })
      mock.getBaseDocsMissing({ baseId: nonExistingBaseId }, { scope })

      const loggedIn = await client.login()
      expect(loggedIn).toBe(true)

      await expect(client.getBase(nonExistingBaseId))
        .rejects.toThrow(/base not found/i)

      scope.done()
    })
  })
})
