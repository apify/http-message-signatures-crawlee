# Crawlee + HTTP Message Signatures

This project showcases how to use [Crawlee](https://crawlee.dev/) with HTTP Message Signatures for secure and authenticated requests.

This e.g. shows how to authenticate requests to [Cloudflare's Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/) protected endpoints.

## Usage

1. Install dependencies:

```bash
npm install
```

2. Run the crawler:

```bash
npm start
```

3. You should see a log message indicating successful authentication.

```bash
INFO  CheerioCrawler: Starting the crawler.
INFO  CheerioCrawler: You successfully authenticated as owning the test public key
INFO  CheerioCrawler: All requests from the queue have been processed, the crawler will shut down.
```

---

2025, Jindřich Bär @ Apify
