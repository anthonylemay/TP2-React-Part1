import { config } from '../../config';

class categoryService {
	baseUrl = config.baseUrl;
	endpoint = 'filter.php?c='

    async getCategoryByName(name) {
		const response = await fetch(`${this.baseUrl}/${this.endpoint}${name}`);
		if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
		const data = await response.json();
		return data.meals;
    }
}

export default categoryService;