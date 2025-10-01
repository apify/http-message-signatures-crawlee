import { signatureHeaders } from "web-bot-auth";
import { signerFromJWK } from "web-bot-auth/crypto";
import { RFC_9421_ED25519_TEST_KEY } from "./crypto.js";

/**
 * Crawlee-compatible pre-navigation hook that adds HTTP Message Signatures to the request.
 * @param context - The context object containing the request to be signed.
 */
export async function signingPreNavigationHook(context: any): Promise<void> {
    // Example Signature-Agent value that the example server expects.
    const signatureAgent = JSON.stringify("https://http-message-signatures-example.research.cloudflare.com");

    const request = new Request(context.request.url, {
        headers: new Headers({
            "Signature-Agent": signatureAgent,
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

    context.request.headers = {
        ...context.request.headers,
        "Signature": headers["Signature"],
        "Signature-Agent": request.headers.get("Signature-Agent")!,
        "Signature-Input": headers["Signature-Input"],
    };
};
