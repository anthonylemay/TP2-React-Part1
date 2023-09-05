import { config } from '../../config';

class mealService {
	baseUrl = config.baseUrl;
	endpoint = 'lookup.php?i='

    async getMealById(id) {
		const response = await fetch(`${this.baseUrl}/${this.endpoint}${id}`);
		if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
		const data = await response.json();
		return data.meals;
    }
}

export default mealService;