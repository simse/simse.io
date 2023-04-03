import type { APIRoute } from 'astro';

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

    const page = url.searchParams.get('page') || 'articles';

    return {
        body: JSON.stringify([{
            title: page,
            body: `Navigate to ${page}`,
            link: `/${page}`
        }]),
    };
}