import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "7o4grg5z",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skLvsB5xykAEdkop2wr0TjI7Sev6r0pt4Y9ghaVFC56zjaccdpvsl41C5dqlL14dVJV4eZtFXefQhJonZvXgXLlF9rabmdxIQRFRxmpnIst229ZX2Pm7ApGji5epQh696nKzAIGY99u2sD6kxjV4Wa7r0duMoBT9vr0aPQ9N73PUYd5k850V",
  useCdn: false,
});
