import request from 'superagent'

export async function getUser(token: unknown) {
  const res = await request
    .get('/api/v1/cine')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}

export async function postUser(token: unknown) {
  const res = await request
    .post('/api/v1/cine')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}
