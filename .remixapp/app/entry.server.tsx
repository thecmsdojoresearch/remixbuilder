import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { useEffect } from 'react';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) { 
    if (!request.url.includes('/api')) {
        responseHeaders.set("Content-Type", "text/html");
        
        const comp = () => {
            return (
                <>
                    <head>
                        <title>Super Homepage</title>
                    </head>
                    <body>
                        <div id="root">
                            <h1>here</h1>
                        </div>
                    </body>
                </>
            );
        };

        return new Response("<!DOCTYPE html>" + renderToString(comp()), {
            status: responseStatusCode,
            headers: responseHeaders,
        });
    } else {
        responseHeaders.set("Content-Type", "application/json");

        const markup = renderToString(
            <RemixServer context={remixContext} url={request.url} />
        );

        return new Response("<!DOCTYPE html>" + markup, {
            status: responseStatusCode,
            headers: responseHeaders,
        });
    }
}
