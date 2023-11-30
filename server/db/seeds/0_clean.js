export async function seed(knex) {
  await knex('users').del()
}
