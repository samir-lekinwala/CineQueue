import connection from './connection.ts'
// import { Fruit, FruitSnakeCase, FruitData } from '../../models/fruit.ts'

interface User {
  auth_id: string
  genre: string
  time_to_watch: number
}

export async function upsertProfile(user: User, db = connection) {
  await db('users').insert(user).onConflict('auth_id').merge()
}
