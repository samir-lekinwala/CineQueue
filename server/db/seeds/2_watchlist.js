export async function seed(knex) {
  await knex('watchlist').del()
  await knex('watchlist').insert([
    { content_id: 1, movie_or_show: 'movie', auth_id: 3 },
    { content_id: 5173, movie_or_show: 'show', auth_id: 2 },
    { content_id: 6, movie_or_show: 'movie', auth_id: 1 },
    { content_id: 60059, movie_or_show: 'show', auth_id: 2 },
    { content_id: 1100, movie_or_show: 'show', auth_id: 2 },
    { content_id: 872585, movie_or_show: 'movie', auth_id: 2 },
  ])
}
