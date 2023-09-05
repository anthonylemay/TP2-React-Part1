import { config } from '../../config';

class categoriesService {
    baseUrl = config.baseUrl;
    endpoint = 'categories.php';

    async getAllCategories() {
        const response = await fetch(`${this.baseUrl}/${this.endpoint}`);
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        const data = await response.json();
        return data.categories;
    }
}

export default categoriesService;