import request from 'superagent'

export async function getUser(token: string) {
  const res = await request
    .get('/api/v1/cine')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}
