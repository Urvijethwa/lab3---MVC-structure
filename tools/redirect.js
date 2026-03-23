export function redirect(url) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: url
      }
    });
  }