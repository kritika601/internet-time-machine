
export default {
  async fetch(request) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle browser CORS preflight requests 
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    const requestUrl = new URL(request.url);

    const website = requestUrl.searchParams.get("url");
    const year = requestUrl.searchParams.get("year");

    // Validate incoming parameters
    if (!website || !year || !/^\d{4}$/.test(year)) {
      return new Response(
        JSON.stringify({
          error: "A website URL and valid four-digit year are required."
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Construct the Wayback Machine CDX API URL
    const archiveUrl = new URL(
      "https://web.archive.org/cdx/search/cdx"
    );

    archiveUrl.searchParams.set("url", website);
    archiveUrl.searchParams.set("from", year);
    archiveUrl.searchParams.set("to", year);
    archiveUrl.searchParams.set(
      "output",
      "json"
    );
    archiveUrl.searchParams.set(
      "fl",
      "timestamp,original,statuscode"
    );
    archiveUrl.searchParams.set(
      "filter",
      "statuscode:200"
    );
    archiveUrl.searchParams.set(
      "collapse",
      "timestamp:6"
    );
    archiveUrl.searchParams.set("limit", "100");
    archiveUrl.searchParams.set("gzip", "false");

    try {

      const archiveResponse = await fetch(archiveUrl, {
        headers: {
          "User-Agent": "InternetTimeMachine/1.0",
          "Accept": "application/json"
        }
      });

      if (!archiveResponse.ok) {

          const errorDetails = await archiveResponse.text();

          return new Response(
              JSON.stringify({
                  error: "The Internet Archive request failed.",
                  upstreamStatus: archiveResponse.status,
                  details: errorDetails,
                  requestedUrl: archiveUrl.toString()
              }),
              {
                  status: 502,
                  headers: {
                      ...corsHeaders,
                      "Content-Type": "application/json"
                  }
              }
          );
      }

      const data = await archiveResponse.json();

      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });

    } catch (error) {

      return new Response(
        JSON.stringify({
          error: "Unable to retrieve archived snapshots."
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );

    }

  }
};
