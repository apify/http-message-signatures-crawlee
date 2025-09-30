import { CheerioCrawler } from 'crawlee';
import { router } from './routes.js';
import { SigningHttpClient } from './http-client.js';

const startUrls = ['https://http-message-signatures-example.research.cloudflare.com/'];

const crawler = new CheerioCrawler({
    requestHandler: router,
    httpClient: new SigningHttpClient(),
});

await crawler.run(startUrls);
