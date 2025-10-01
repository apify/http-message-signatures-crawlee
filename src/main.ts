/**
 * This example shows how to use Crawlee with HTTP message signatures
 * to authenticate requests to e.g. a Cloudflare-protected resource.
 *
 * It uses a pre-navigation hook to sign each request with a test key (see `crypto.ts`).
 * In a real-world scenario, you would use your own key.
 *
 * Note that this approach is crawler-agnostic and works with any Crawlee crawler (including Playwright and Puppeteer).
 */

import { CheerioCrawler } from 'crawlee';
import { signingPreNavigationHook } from './signing.js';

const crawler = new CheerioCrawler({
    preNavigationHooks: [signingPreNavigationHook],
    requestHandler: async ({ parseWithCheerio, log }) => {
        const $ = await parseWithCheerio();

        log.info($('h3').text());
    },
});

await crawler.run(['https://http-message-signatures-example.research.cloudflare.com/']);
