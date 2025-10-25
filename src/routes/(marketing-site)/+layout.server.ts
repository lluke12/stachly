import { fetchCareers, fetchAwards, fetchTeamMembers, fetchHomeBlogPosts } from '$lib/content';

export const load = async ({ fetch, locals }) => {
  try {
    // Fetch data from WordPress in parallel
    const [careers, awards, teamMembers, homePosts] = await Promise.all([
      fetchCareers({ version: locals.version, fetch }).catch(() => []),
      fetchAwards({ version: locals.version, fetch }).catch(() => []),
      fetchTeamMembers({ version: locals.version, fetch }).catch(() => []),
      fetchHomeBlogPosts({ version: locals.version, fetch }).catch(() => [])
    ]);

    return {
      configuration: null, // WordPress doesn't have a global configuration like Storyblok
      careers,
      awards,
      awardsTypes: [], // WordPress doesn't have separate award types
      teamMembers,
      homePosts
    };
  } catch (error) {
    console.error('Error loading layout data:', error);
    // Return empty data on error to prevent page from breaking
    return {
      configuration: null,
      careers: [],
      awards: [],
      awardsTypes: [],
      teamMembers: [],
      homePosts: []
    };
  }
};
