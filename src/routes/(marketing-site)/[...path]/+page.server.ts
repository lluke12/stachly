import { error } from '@sveltejs/kit';
import { fetchPage, normalizeWordPressPost } from '$lib/content';

export const load = async ({ params, locals, fetch, url }) => {
  // don't catch paths that end with an extension
  if (/\..+$/.test(params.path)) throw error(404);
  
  try {
    const wpPage = await fetchPage(params.path, { version: locals.version, fetch });
    const page = { story: normalizeWordPressPost(wpPage) };
    return { page };
  } catch (e) {
    // WordPress page not found, return 404
    throw error(404, 'Page not found');
  }
};

export const config = {
  isr: {
    expiration: 60,
    allowQuery: ['t', 'drawer']
  }
};
