import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'supabase_user', 'supabase_password', {
  host: 'your-supabase-host.supabase.co',
  dialect: 'postgres',
  logging: console.log,
});

export default sequelize;
