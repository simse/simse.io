import axios from 'axios';
import type { Article } from '@simse/app-cms/src/payload-types';

const CMS_URL = "https://cms.simse.io/api/";
const PAGE_SIZE = 24;

const getAllArticles = async (page = 1): Promise<Article[]> => {
    const response = await axios.get(CMS_URL + `articles?page=${page}&limit=${PAGE_SIZE}`);

    if (response.status == 200) {
        return response.data['docs'] as Article[];
    }

    return [];
}

export {
    getAllArticles
}