import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database: process.env.DB_URL,
  soltRounds: process.env.SOLT_ROUNDS,
  accessSecret: process.env.ACCESS_SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
  accessExpire: process.env.ACCESS_EXPIRE,
  refreshExpire: process.env.REFRESH_EXPIRE
}

export default config
