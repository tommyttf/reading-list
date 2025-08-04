# Reading list 

Simple app using tRPC, Next.js, Prisma, Vitest

## Setup
0. Make sure you have Node.js 20+ installed, you may use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions

1. Install dependencies
```bash
npm install
```

2. Copy env.example to .env
```bash
cp env.example .env
```

3. (Optional) Insert seed data
```bash
npm run prisma:seed
```

4. Run dev server
```bash
npm run dev
```

## Test

Unit test:
```bash
npm run test:unit
```

Integration test:
1. Install dotenv-cli
```bash
npm install -g dotenv-cli
```

2. Migrate database to test environment
```bash
npm run prisma:migrate:integration:test
```

3. Run integration test
```bash
npm run test:integration
```
