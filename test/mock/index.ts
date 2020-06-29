import * as fs from 'fs'
import * as path from 'path'
import * as nock from 'nock'

const baseUrl = 'https://airtable.com:443'

export type MockOptions = {
  scope?: nock.Scope
}

export function getLoginPage (params: {
  csrf: string
}, options: MockOptions = {}): nock.Scope {
  const filename = path.join(__dirname, '/responses/login.html')
  const content = fs.readFileSync(filename, { encoding: 'utf8' })
  const body = content.replace('<csrf-token>', params.csrf)

  return (options.scope ?? nock(baseUrl))
    .get('/login')
    .reply(200, body, [
      'Cache-control', 'no-cache="set-cookie"',
      'Content-Type', 'text/html; charset=utf-8',
      'Date', 'Tue, 02 Jun 2020 13:33:34 GMT',
      'ETag', 'W/"83cd-ogw4oRGk8yjMarWr87m4Vg+XMbg"',
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brwmAkbWGBtiBzR3g; path=/; expires=Wed, 02 Jun 2021 13:33:34 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXMxSUVWQXlwZ2p3dzIydSIsImNzcmZTZWNyZXQiOiJiQVM5TE9LSlpVdjdwb3pFSUp6VnNmeFUifQ==; path=/; expires=Wed, 02 Jun 2021 13:33:34 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=yddGmKknZZ_zEI_gjuqinp9s10Dt-6QijY_jbvHCo1k; path=/; expires=Wed, 02 Jun 2021 13:33:34 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXMxSUVWQXlwZ2p3dzIydSIsImNzcmZTZWNyZXQiOiJiQVM5TE9LSlpVdjdwb3pFSUp6VnNmeFUifQ==; path=/; expires=Wed, 02 Jun 2021 13:33:34 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=l6atxzIhtvYx1DdAOkP58Gb--Hc; path=/; expires=Wed, 02 Jun 2021 13:33:34 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'AWSELB=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE92B48CE1BB3BE2DF64F2AF8FC299B7DB140BC1262B9940A7DF1D234855648842F3E0FB9B04A3AF982872DD6E2878F54249;PATH=/',
      'Set-Cookie', 'AWSELBCORS=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE92B48CE1BB3BE2DF64F2AF8FC299B7DB140BC1262B9940A7DF1D234855648842F3E0FB9B04A3AF982872DD6E2878F54249;PATH=/;SECURE;SAMESITE=None',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'Content-Length', `${body.length}`,
      'Connection', 'Close'
    ])
}

export function getLoginPageFailed (options: MockOptions = {}): nock.Scope {
  const body = 'Found. Redirecting to /'

  return (options.scope ?? nock(baseUrl))
    .get('/login')
    .reply(302, body, [
      'Content-Type', 'text/plain; charset=utf-8',
      'Date', 'Tue, 02 Jun 2020 15:06:37 GMT',
      'Location', '/',
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brwINeDXlqU3g0cUo; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlfQ==; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=n4V0cPK_EW-lfTcrEXvCT4yrW9yph1g688DWXtop1RU; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlfQ==; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=-cNK5GMCFQ0PvWXN9YVsWOgj7nA; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept, Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'Content-Length', `${body.length}`,
      'Connection', 'Close'
    ])
}

export function postLoginSucceded (params: {
  email: string
  password: string
  _csrf: string
}, options: MockOptions = {}): nock.Scope {
  const body = 'Found. Redirecting to /'

  return (options.scope ?? nock(baseUrl))
    .post('/auth/login', params)
    .reply(302, body, [
      'Content-Type', 'text/plain; charset=utf-8',
      'Date', 'Tue, 02 Jun 2020 15:06:37 GMT',
      'Location', '/',
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brwINeDXlqU3g0cUo; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlfQ==; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=n4V0cPK_EW-lfTcrEXvCT4yrW9yph1g688DWXtop1RU; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlfQ==; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=-cNK5GMCFQ0PvWXN9YVsWOgj7nA; path=/; expires=Wed, 02 Jun 2021 15:06:37 GMT; samesite=none; secure; httponly',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept, Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'Content-Length', `${body.length}`,
      'Connection', 'Close'
    ])
}

export function postLoginFailed (params: {
  email: string
  password: string
  _csrf: string
}, options: MockOptions = {}): nock.Scope {
  const body = 'Found. Redirecting to /login'

  return (options.scope ?? nock(baseUrl))
    .post('/auth/login', params)
    .reply(302, body, [
      'Content-Type', 'text/plain; charset=utf-8',
      'Date', 'Tue, 02 Jun 2020 13:33:35 GMT',
      'Location', '/login',
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brwmAkbWGBtiBzR3g; path=/; expires=Wed, 02 Jun 2021 13:33:34 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXMxSUVWQXlwZ2p3dzIydSIsImNzcmZTZWNyZXQiOiJiQVM5TE9LSlpVdjdwb3pFSUp6VnNmeFUiLCJmbGFzaCI6IntcImVtYWlsXCI6XCJ0ZXN0QGV4YW1wbGUuY29tXCIsXCJhdXRoRXJyb3JNZXNzYWdlc1wiOntcInBhc3N3b3JkRXJyb3JNZXNzYWdlXCI6XCJJbnZhbGlkIHBhc3N3b3JkXCJ9fSJ9; path=/; expires=Wed, 02 Jun 2021 13:33:35 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=9a4BUStrQAaXaxAFiOoj8BAkkBaXCE16ZsN2J3-LFyU; path=/; expires=Wed, 02 Jun 2021 13:33:35 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXMxSUVWQXlwZ2p3dzIydSIsImNzcmZTZWNyZXQiOiJiQVM5TE9LSlpVdjdwb3pFSUp6VnNmeFUiLCJmbGFzaCI6IntcImVtYWlsXCI6XCJ0ZXN0QGV4YW1wbGUuY29tXCIsXCJhdXRoRXJyb3JNZXNzYWdlc1wiOntcInBhc3N3b3JkRXJyb3JNZXNzYWdlXCI6XCJJbnZhbGlkIHBhc3N3b3JkXCJ9fSJ9; path=/; expires=Wed, 02 Jun 2021 13:33:35 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=4zX2ecFxwALuEeTjp_pdtlXady4; path=/; expires=Wed, 02 Jun 2021 13:33:35 GMT; samesite=none; secure; httponly',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept, Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'Content-Length', `${body.length}`,
      'Connection', 'Close'
    ])
}

export function getBaseDocsSucceded (params: { baseId: string }, options: MockOptions = {}): nock.Scope {
  const url = `/${params.baseId}/api/docs`
  const filename = path.join(__dirname, `/responses/docs-${params.baseId}-succeded.html`)

  return (options.scope ?? nock(baseUrl))
    .get(url)
    .reply(200, (uri, requestBody) => {
      return fs.createReadStream(filename)
    }, [
      'cache-control', 'no-store, no-cache, must-revalidate',
      'Content-Type', 'text/html; charset=utf-8',
      'Date', 'Wed, 03 Jun 2020 09:40:38 GMT',
      'ETag', 'W/"28240-m0YOo0q+XyJO4lZ8VawutdyxIA0"',
      'expires', 'Wed Jun 03 2020 09:40:37 GMT+0000 (Coordinated Universal Time)',
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brwINeDXlqU3g0cUo; path=/; expires=Thu, 03 Jun 2021 09:40:37 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlLCJleHBpcmF0aW9uVGltZU1zU2luY2VFcG9jaCI6bnVsbH0=; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=Xcb0Em-IW8bSNIAtaHJzHkOgHqEhpbMkXOb2uaPEDxQ; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlLCJleHBpcmF0aW9uVGltZU1zU2luY2VFcG9jaCI6bnVsbH0=; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=KqOSLJ0tIiaH7D-8buBrxLZ7_PY; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'transfer-encoding', 'chunked',
      'Connection', 'Close'
    ])
}

export function getBaseDocsFailed (params: { baseId: string }, options: MockOptions = {}): nock.Scope {
  const url = `/${params.baseId}/api/docs`
  const body = `Found. Redirecting to /login?continue=${encodeURIComponent(url)}`

  return (options.scope ?? nock(baseUrl))
    .get(url)
    .reply(302, body, [
      'Cache-control', 'no-cache="set-cookie"',
      'Content-Type', 'text/plain; charset=utf-8',
      'Date', 'Wed, 03 Jun 2020 07:16:06 GMT',
      'Location', `/login?continue=${encodeURIComponent(url)}`,
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brw58mW4Ug21tVXnM; path=/; expires=Thu, 03 Jun 2021 07:16:06 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNTQnZYVUY0aUFpSGVJWCIsImNzcmZTZWNyZXQiOiJqRk5fRmNVeVh0REEtRW9STGQ4VmlBaHkifQ==; path=/; expires=Thu, 03 Jun 2021 07:16:06 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=y0pZw3MTeV0mbA-hB0n4uMprN_ozOlVKfAdSHsTvov8; path=/; expires=Thu, 03 Jun 2021 07:16:06 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXNTQnZYVUY0aUFpSGVJWCIsImNzcmZTZWNyZXQiOiJqRk5fRmNVeVh0REEtRW9STGQ4VmlBaHkifQ==; path=/; expires=Thu, 03 Jun 2021 07:16:06 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=Swglq3o7l60iAt6dRl7QtoaJ5Cw; path=/; expires=Thu, 03 Jun 2021 07:16:06 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'AWSELB=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE92325D713B3652D6B045FE084A9DA6DE4A0BC1262B9940A7DF1D234855648842F3177D9C5ABA436732E197A8F6FC5416C7;PATH=/',
      'Set-Cookie', 'AWSELBCORS=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE92325D713B3652D6B045FE084A9DA6DE4A0BC1262B9940A7DF1D234855648842F3177D9C5ABA436732E197A8F6FC5416C7;PATH=/;SECURE;SAMESITE=None',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept, Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'Content-Length', `${body.length}`,
      'Connection', 'Close'
    ])
}

export function getBaseDocsError (params: { baseId: string }, options: MockOptions = {}): nock.Scope {
  const url = `/${params.baseId}/api/docs`
  const filename = path.join(__dirname, `/responses/docs-${params.baseId}-error.html`)

  return (options.scope ?? nock(baseUrl))
    .get(url)
    .reply(200, (uri, requestBody) => {
      return fs.createReadStream(filename)
    }, [
      'cache-control', 'no-store, no-cache, must-revalidate',
      'Content-Type', 'text/html; charset=utf-8',
      'Date', 'Wed, 03 Jun 2020 09:40:38 GMT',
      'ETag', 'W/"28240-m0YOo0q+XyJO4lZ8VawutdyxIA0"',
      'expires', 'Wed Jun 03 2020 09:40:37 GMT+0000 (Coordinated Universal Time)',
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brwINeDXlqU3g0cUo; path=/; expires=Thu, 03 Jun 2021 09:40:37 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlLCJleHBpcmF0aW9uVGltZU1zU2luY2VFcG9jaCI6bnVsbH0=; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=Xcb0Em-IW8bSNIAtaHJzHkOgHqEhpbMkXOb2uaPEDxQ; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlLCJleHBpcmF0aW9uVGltZU1zU2luY2VFcG9jaCI6bnVsbH0=; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=KqOSLJ0tIiaH7D-8buBrxLZ7_PY; path=/; expires=Thu, 03 Jun 2021 09:40:38 GMT; samesite=none; secure; httponly',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'transfer-encoding', 'chunked',
      'Connection', 'Close'
    ])
}
export function getBaseDocsMissing (params: { baseId: string }, options: MockOptions = {}): nock.Scope {
  const url = `/${params.baseId}/api/docs`
  const filename = path.join(__dirname, '/responses/docs-missing.html')
  const content = fs.readFileSync(filename, { encoding: 'utf8' })

  return (options.scope ?? nock(baseUrl))
    .get(url)
    .reply(404, content, [
      'Cache-control', 'no-cache="set-cookie"',
      'Content-Type', 'text/html; charset=utf-8',
      'Date', 'Thu, 04 Jun 2020 10:44:19 GMT',
      'ETag', 'W/"9729-dSBUjs1jYs2BnZgiCGQdT+EbBD0"',
      'Referrer-Policy', 'same-origin',
      'Server', 'Tengine',
      'Set-Cookie', 'brw=brwINeDXlqU3g0cUo; path=/; expires=Fri, 04 Jun 2021 10:44:19 GMT; domain=.airtable.com; secure; httponly',
      'Set-Cookie', '__Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlLCJleHBpcmF0aW9uVGltZU1zU2luY2VFcG9jaCI6bnVsbH0=; path=/; expires=Fri, 04 Jun 2021 10:44:19 GMT; samesite=none; secure; httponly',
      'Set-Cookie', '__Host-airtable-session.sig=Xcb0Em-IW8bSNIAtaHJzHkOgHqEhpbMkXOb2uaPEDxQ; path=/; expires=Fri, 04 Jun 2021 10:44:19 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess=eyJzZXNzaW9uSWQiOiJzZXNXQXlnSGE0WmhPZVpaOSIsImNzcmZTZWNyZXQiOiJOcHB4X3ZPVHFnMjJCMHZTcmpaMzB0V1EiLCJoaWdoU2VjdXJpdHlNb2RlRW5hYmxlZFRpbWUiOjE1OTExMTAzOTc3ODAsInVzZXJJZCI6InVzclJzN2VtQmlTVGFCZjFxIiwiaXNGaXJzdExvZ2luIjpmYWxzZSwiZGlkSnVzdExvZ0luIjp0cnVlLCJleHBpcmF0aW9uVGltZU1zU2luY2VFcG9jaCI6bnVsbH0=; path=/; expires=Fri, 04 Jun 2021 10:44:19 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'express:sess.sig=KqOSLJ0tIiaH7D-8buBrxLZ7_PY; path=/; expires=Fri, 04 Jun 2021 10:44:19 GMT; samesite=none; secure; httponly',
      'Set-Cookie', 'AWSELB=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE9253BE434965F4D2126129E0338EBA226991AC3560650744EDFEAB3519A6F71FB938FA7FDC9A871ED2F09D29BFF983BADA;PATH=/',
      'Set-Cookie', 'AWSELBCORS=F5E9CFCB0C87D62DB5D03914FDC2A2D2D45FBECE9253BE434965F4D2126129E0338EBA226991AC3560650744EDFEAB3519A6F71FB938FA7FDC9A871ED2F09D29BFF983BADA;PATH=/;SECURE;SAMESITE=None',
      'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload',
      'Vary', 'Accept-Encoding',
      'X-Content-Type-Options', 'nosniff',
      'X-Frame-Options', 'SAMEORIGIN',
      'X-XSS-Protection', '1; mode=block',
      'Content-Length', `${content.length}`,
      'Connection', 'Close'
    ])
}
