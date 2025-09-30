import { createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ log, $ }) => {
    // This should print "You successfully authenticated as owning the test public key"
    log.info($('h3').text().trim());
});
