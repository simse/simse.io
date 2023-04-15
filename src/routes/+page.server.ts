import { env } from '$env/dynamic/private';
import prisma from '$lib/server/database';

export async function load() {
    await prisma.article.findMany();
    
    return {
        region: env.FLY_REGION || "dev",
    };
}