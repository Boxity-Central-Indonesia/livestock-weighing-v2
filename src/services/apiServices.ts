import apiClient from "./apiClient";

interface getProductProps {
    param: string;
}

export const getProduct = async ({ param }: getProductProps) => {
    const response = await apiClient.get(`/product-categories?name=${param}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error('Failed to fetch data');
};

export const getOrders = async () => {
    const response = await apiClient.get(`/orders`)

    if (response.status === 200) {
        return response.data
    }

    throw new Error('Failed to fetch data');
}

export const getProductByOrder = async ({ param }: { param: any }) => {
    const response = await apiClient.get(`/orders/product/${param}`)

    if (response.status == 200) {
        return response.data
    }

    throw new Error('Failed to fetch data');
}

export const getProductByCategorie = async ({ param }: { param: any }) => {
    const response = await apiClient.get(`/products?category_name=${param}`)

    if (response.status == 200) {
        return response.data
    }

    throw new Error('Failed to fetch data')
}

export const getWeghingToday = async () => {
    const response = await apiClient.get('/orders/weighing/today')

    if (response.status == 200) {
        return response.data
    }

    throw new Error('Failed to fetch data')

}


export const postOrderWeighing = async ({ dataBody }: { dataBody: any }) => {
    const response = await apiClient.post("orders/weighing", dataBody)
    return response.data

}


export const postKarkas = async ({ dataBody }: { dataBody: any }) => {
    const response = await apiClient.post("orders/weighing/exordered", dataBody)
    return response.data
}