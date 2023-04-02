import type { APIRoute } from 'astro';
import { getAllProjects } from "src/lib/cms";

export const get: APIRoute = async function get ({request}) {
    const url = new URL(request.url);

   /* let query: QueryArticlesInput = {
        sortBy: url.searchParams.get('sortBy') || undefined,
    }

    if (url.searchParams.has('limit')) {
        const limit = Number(url.searchParams.get('limit'));
        query.limit = limit;
    }

    if (url.searchParams.has('sortOrder')) {
        const sortOrder = url.searchParams.get('sortOrder');

        if (sortOrder === 'asc' || sortOrder === 'desc') {
            query.sortOrder = sortOrder;
        }        
    }*/

    const queryResult = await getAllProjects();

    return {
        body: JSON.stringify(queryResult.map(project => ({
            title: project.name,
            tags: project.language.map(language => language.name),
            body: project.summary,
            image: project.media?.cloudflareImageId,
            url: `/project/${project.slug}`
            //categories: article.category.map(cat => cat.name).join(', ')
        }))),
    };
}