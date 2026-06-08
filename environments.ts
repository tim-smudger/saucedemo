const environments = {
  production: {
    baseURL: 'https://www.saucedemo.com',
    users: {
      standard: { username: process.env.STANDARD_USER!, password: process.env.STANDARD_PASSWORD! },
      locked: { username: process.env.LOCKED_USER!, password: process.env.LOCKED_PASSWORD! },
    },
  },
  staging: {
    baseURL: 'https://staging.saucedemo.com',
    users: {
      standard: { username: process.env.STANDARD_USER!, password: process.env.STANDARD_PASSWORD! },
      locked: { username: process.env.LOCKED_USER!, password: process.env.LOCKED_PASSWORD! },
    },
  },
  local: {
    baseURL: 'http://localhost:3000',
    users: {
      standard: { username: process.env.STANDARD_USER!, password: process.env.STANDARD_PASSWORD! },
      locked: { username: process.env.LOCKED_USER!, password: process.env.LOCKED_PASSWORD! },
    },
  },
};

type EnvName = keyof typeof environments;

const envName = (process.env.ENV || 'production') as EnvName;

if (!environments[envName]) {
  throw new Error(`Unknown environment: ${envName}. Valid options: ${Object.keys(environments).join(', ')}`);
}

export const env = environments[envName];
