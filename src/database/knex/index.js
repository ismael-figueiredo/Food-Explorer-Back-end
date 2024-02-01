import knex from 'knex';
import config from '../../../knexfile.js'

const connection = knex(config.development)

export default  connection