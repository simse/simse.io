import axios from 'axios';
import * as qs from 'qs';
import type { Article } from '@simse/app-cms/src/payload-types';

// stuff that should probably be environment variables
const CMS_URL = "https://cms.simse.io/api/";
const PAGE_SIZE = 24;

// getAllArticles returns all published articles from the CMS given page and page size
const getAllArticles = async (page = 1, pageSize = PAGE_SIZE): Promise<Article[]> => {
    const query = {
        _status: {
            equals: 'published',
        },
    }

    const stringifiedQuery = qs.stringify({
        where: query,
        page,
        limit: pageSize
    })

    try {
        const response = await axios.get(`${CMS_URL}articles?${stringifiedQuery}`);

        if (response.status == 200) {
            return response.data['docs'] as Article[];
        }
    } catch (err) {
        console.log(err);
    }

    return [];
}

const getArticleById = async (id: string): Promise<Article> => {
    const response = await axios.get(`${CMS_URL}articles/${id}`);

    if (response.status == 200) {
        return response.data as Article;
    } else {
        throw Error("could not find article");
    }
}

const getArticleBySlug = async (slug?: string): Promise<Article> => {
    const query = {
        slug: {
            equals: slug,
        },
    }

    const stringifiedQuery = qs.stringify({
        where: query,
        page: 1,
        limit: 1
    })

    const response = await axios.get(`${CMS_URL}articles?${stringifiedQuery}`);

    if (response.status == 200) {
        return (response.data['docs'] as Article[])[0];
    } else {
        throw Error("could not find article");
    }
}

// getAllSlugs gets all articles slugs from the CMS
const getAllArticleSlugs = async (): Promise<String[]> => {
    const query = {
        _status: {
            equals: 'published',
        },
    }

    const stringifiedQuery = qs.stringify({
        where: query,
        limit: 10000,
        depth: 0
    });

    try {
        const response = await axios.get(`${CMS_URL}articles?${stringifiedQuery}`);

        if (response.status == 200) {
            return response.data['docs'].map((article: Article) => article.slug)
        }
    } catch (err) {
        console.log(err);
    }

    return [];
}

export {
    getAllArticles,
    getArticleById,
    getArticleBySlug,
    getAllArticleSlugs
}