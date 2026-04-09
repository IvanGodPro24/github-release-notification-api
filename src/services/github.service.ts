import axios from 'axios';
import createHttpError from 'http-errors';

export const checkRepoExists = async (
  owner: string,
  repo: string,
): Promise<void> => {
  try {
    await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
  } catch (error: any) {
    if (error.response?.status === 404)
      throw createHttpError(404, 'Repository not found');

    if (error.response?.status === 429)
      throw createHttpError(429, 'GitHub rate limit exceeded');

    throw createHttpError(500, 'GitHub API error');
  }
};
