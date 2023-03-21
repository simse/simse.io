import axios from 'axios';
import * as qs from 'qs';
import { groupBy } from 'lodash-es';
import type { Article, Project } from '@simse/app-cms/src/types';

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
        limit: pageSize,
        sort: '-createdAt'
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

    const response = await axios.get(`${CMS_URL}articles?${stringifiedQuery}`)

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

const getAllProjects = async (): Promise<Project[]> => {
    const query = {
        /*_status: {
            equals: 'published',
        },*/
    }

    const stringifiedQuery = qs.stringify({
        where: query,
        limit: 10000,
        depth: 1
    });

    try {
        const response = await axios.get(`${CMS_URL}projects?${stringifiedQuery}`);

        if (response.status == 200) {
            return response.data['docs'] as Project[];
        }
    } catch (err) {
        console.log(err);
    }

    return [];
}

const getAllProjectSlugs = async (): Promise<String[]> => {
    const stringifiedQuery = qs.stringify({
        limit: 10000,
        depth: 1
    });

    try {
        const response = await axios.get(`${CMS_URL}projects?${stringifiedQuery}`);

        if (response.status == 200) {
            return response.data['docs'].map((project: Project) => project.slug)
        }
    } catch (err) {
        console.log(err);
    }

    return [];
}
        
const getProjectBySlug = async (slug: string): Promise<Project> => {
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

    const response = await axios.get(`${CMS_URL}projects?${stringifiedQuery}`);

    if (response.status == 200) {
        return (response.data['docs'] as Project[])[0];
    } else {
        throw Error("could not find project");
    }
}


interface ProjectGroup {
    name: string;
    plural?: string;
    projects: Project[];
}

const getAllProjectsGroupByCategory = async (): Promise<ProjectGroup[]> => {
    const projects = await getAllProjects();

    const groupedProjects = groupBy(projects, 'category.name');

    return Object.keys(groupedProjects).map((key) => {
        return {
            name: key,
            plural: groupedProjects[key][0].category.plural,
            projects: groupedProjects[key]
        }
    });
}

export {
    getAllArticles,
    getArticleById,
    getArticleBySlug,
    getAllArticleSlugs,
    
    // projects
    getAllProjects,
    getAllProjectSlugs,
    getProjectBySlug,
    getAllProjectsGroupByCategory
}