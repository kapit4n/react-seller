import {SellerApplication} from './application';

const app = new SellerApplication({
  rest: {
    port: 3000,
    host: '0.0.0.0',
    cors: {
      origin: true,
      credentials: true,
      maxAge: 86400,
    },
    expressSettings: {
      'x-powered-by': false,
    },
  },
});

async function main(): Promise<void> {
  await app.boot();
  await app.start();
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Explore at ${url}/explorer`);
}

main().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
