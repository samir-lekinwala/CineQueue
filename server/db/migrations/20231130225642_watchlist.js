export async function up(knex) {
    await knex.schema.createTable('watchlist', (table) => {
      table.increments('id').primary()
      table.integer('content_id')
      table.string('movie_or_show')
      table.integer('user_id')
    })
  }
  
  export async function down(knex) {
    await knex.schema.dropTable('watchlist')
  }
