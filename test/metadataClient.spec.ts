import * as nock from 'nock'
import * as mock from './mock'
import { AirtableMetaClient } from '../src/metadataClient'

const csrf = 'testcsrftoken'
const baseId = 'appa4Jy2VNe3Qx3Kt'
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
      name: 'IOM Content Engine',
      icon: 'bolt',
      color: 'gray',
      tables: expect.arrayContaining([
        expect.objectContaining({
          id: 'tblGhU7I1GJgup4c9',
          name: 'Daily content',
          defaultView: {
            id: 'viw9KbcPV3xr4jALL',
            name: 'Raw'
          },
          isEmptyDueToFilter: false,
          primaryColumnName: 'Story idea',
          columns: expect.arrayContaining([
            {
              id: 'fldf9s0QsrSprtSYo',
              name: 'Story idea',
              type: 'text',
              typeOptions: null
            },
            {
              id: 'fldGCv4GBAV5VCLco',
              name: 'Source URL',
              type: 'text',
              typeOptions: { validatorName: 'url' }
            },
            {
              id: 'fld0XRolE1DLLe0Zm',
              name: 'Description',
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
