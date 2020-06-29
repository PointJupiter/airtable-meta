import got, { Got } from 'got'
import { CookieJar } from 'tough-cookie'
import * as DomParser from 'dom-parser'
import { ClientOptions, Base } from './interfaces'

export class AirtableMetaClient {
  private readonly baseClient: Got

  constructor (private readonly params: ClientOptions) {
    this.baseClient = got.extend({
      prefixUrl: params.apiUrl ?? 'https://airtable.com',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0',
        Referer: 'https://airtable.com/login'
      },
      cookieJar: new CookieJar(),
      followRedirect: false
    })
  }

  async login (): Promise<boolean> {
    const csrf = await this.fetchCsrf()
    const response = await this.baseClient.post('auth/login', {
      form: {
        _csrf: csrf,
        email: this.params.email,
        password: this.params.password
      }
    })

    return response.headers.location === '/'
  }

  async getBase (baseId: string): Promise<Base> {
    const path = `${encodeURIComponent(baseId)}/api/docs`
    let response = await this.baseClient.get(path, { throwHttpErrors: false })
    if (response.statusCode === 404) {
      throw new Error('Base not found')
    } else if (response.statusCode === 302) {
      if (!(await this.login())) {
        throw new Error('Error authenticating client')
      }
      response = await this.baseClient.get(path, { throwHttpErrors: false })
    } else {
      // TODO(djelic): consider handling other error codes
      // throw new Error(`Unknown HTTP error ${response.statusCode}`)
    }

    const [, appData] = response.body.match(/window.application = (.*);/) ?? []
    if (!appData) {
      throw new Error('Base metadata not found')
    }

    const base = JSON.parse(appData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    base.tables.forEach((table: any) => {
      delete table.sampleRows
    })

    return base
  }

  private async fetchCsrf (): Promise<string> {
    const response = await this.baseClient.get('login')
    if (response.statusCode !== 200) {
      throw new Error('Error fetching CSRF token')
    }
    return this.parseCsrf(response.body)
  }

  private parseCsrf (html: string): string {
    const document = new DomParser().parseFromString(html)
    const elements = document.getElementsByName('_csrf')
    return elements?.[0]?.getAttribute('value') ?? ''
  }
}
