
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {auth_id: 2, genre: "action", time_to_watch: 20},
    {auth_id: 4, genre: "comedy", time_to_watch: 232},
    {auth_id: 5, genre: "action", time_to_watch: 255},
  ]);
}
