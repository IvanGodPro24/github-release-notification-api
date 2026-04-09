import cron from 'node-cron';
import { prisma } from '../db/client.js';
import { getLatestRelease } from './github.service.js';

const scanRepositories = async () => {
  try {
    const repositories = await prisma.repository.findMany({
      where: {
        subscriptions: {
          some: {
            status: 'ACTIVE',
          },
        },
      },
    });

    console.log(`[Scanner] Found ${repositories.length} repositories`);

    for (const repo of repositories) {
      const [owner, repoName] = repo.name.split('/');

      try {
        const latestTag = await getLatestRelease(owner, repoName);

        if (!latestTag) continue;

        if (!repo.lastSeenTag) {
          await prisma.repository.update({
            where: { id: repo.id },
            data: { lastSeenTag: latestTag },
          });
          continue;
        }

        if (repo.lastSeenTag !== latestTag) {
          console.log(`[Scanner] New release for ${repo.name}: ${latestTag}`);

          await prisma.repository.update({
            where: { id: repo.id },
            data: { lastSeenTag: latestTag },
          });
        }
      } catch (error: any) {
        console.error(`[Scanner] Error checking ${repo.name}:`, error.message);
      }
    }
  } catch (globalError) {
    console.error(
      '[Scanner] Critical database error during scan:',
      globalError,
    );
  }
};

export const startScanner = () => {
  console.log('Scanner initialized');

  cron.schedule('*/1 * * * *', scanRepositories);
};
