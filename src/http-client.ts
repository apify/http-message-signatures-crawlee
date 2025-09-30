import { ImpitHttpClient } from "@crawlee/impit-client";
import { ResponseTypes, HttpRequest, HttpResponse, StreamingHttpResponse } from "crawlee";
import { signatureHeaders } from "web-bot-auth";
import { signerFromJWK } from "web-bot-auth/crypto";
import { RFC_9421_ED25519_TEST_KEY } from "./crypto.js";

/**
 * A Crawlee HTTP client that signs requests using HTTP Message Signatures.
 * See following documents for more information:
 * - https://datatracker.ietf.org/doc/html/rfc9421
 * - https://thibmeu.github.io/http-message-signatures-directory/draft-meunier-web-bot-auth-architecture.html
 */
export class SigningHttpClient extends ImpitHttpClient {
    private signatureAgent = JSON.stringify("https://http-message-signatures-example.research.cloudflare.com");

    constructor(options = {}) {
        super(options);
    }

    async signRequest(crawleeRequest: HttpRequest<any>): Promise<HttpRequest<any>> {
        const request = new Request(crawleeRequest.url, {
            headers: new Headers({
                "Signature-Agent": this.signatureAgent,
            }),
        });

        const now = new Date();
        const headers = await signatureHeaders(
            request,
            await signerFromJWK(RFC_9421_ED25519_TEST_KEY), {
                created: now,
                expires: new Date(now.getTime() + 300_000), // now + 5 min
            }
        );

        crawleeRequest.headers = {
            ...crawleeRequest.headers,
            "Signature": headers["Signature"],
            "Signature-Agent": request.headers.get("Signature-Agent")!,
            "Signature-Input": headers["Signature-Input"],
        }

        return crawleeRequest;
    }

    override async sendRequest<TResponseType extends keyof ResponseTypes>(crawleeRequest: HttpRequest<TResponseType>): Promise<HttpResponse<TResponseType>> {
        return super.sendRequest(await this.signRequest(crawleeRequest));
    }

    override async stream(crawleeRequest: HttpRequest): Promise<StreamingHttpResponse> {
        return super.stream(await this.signRequest(crawleeRequest));
    }
}
