import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://628cfdca3df57e983eda02d0.mockapi.io/'
})

export const pizzasAPI = {
    items: {
        get (currentPage, categoryId, sortType) {
            return instance.get(`items?page=
            ${currentPage}&limit=3&
            ${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=
            ${sortType.sortProperty}&order=
            ${sortType.order}`)
        }
    },
}
