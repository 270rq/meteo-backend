import 'dotenv/config';

export const config = Object.freeze({
  Port: process.env.PORT ?? 3000,
  HashSaltRound: process.env.HASH_SALT_ROUND,
});

export const JwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES ?? '120s',
};
