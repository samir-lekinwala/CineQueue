export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    // table.increments('id').primary()
    table.string('auth_id').primary()
    table.string('genre')
    table.integer('time_to_watch')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
