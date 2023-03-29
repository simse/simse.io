import type { APIRoute } from 'astro';
import { queryArticles, QueryArticlesInput } from "src/lib/cms";

export const get: APIRoute = async function get ({request}) {
    const url = new URL(request.url);

    let query: QueryArticlesInput = {
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
    }

    const queryResult = await queryArticles(query);

    return {
        body: JSON.stringify(queryResult.map(article => ({
            title: article.name,
            body: article.summary,
            image: article.media?.cloudflareImageId,
            url: `/articles/${article.slug}`
            //categories: article.category.map(cat => cat.name).join(', ')
        }))),
    };
}