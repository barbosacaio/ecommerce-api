import './config/loadEnv';
import { app } from './app';
import { env } from './config/env';
import { comparePassword, hashPassword } from './services/password.service';
import test from 'node:test';

app.listen(env.port, () => {
  console.log(`Server is running on http://localhost:${env.port} in ${env.nodeEnv} mode`);
});