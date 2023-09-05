import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import mealService from '../service/mealService';
import FetchState from '../../components/FetchState/FetchState';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const mS = new mealService();

const Meal = () => {
	const params = useParams();
	const { data, isLoading, isError, error } = useQuery(['meal', params.mealId], () => mS.getMealById(params.mealId));

	return (
		<Container fluid className='min-vh-100 d-grid'>
			<FetchState isLoading={isLoading} isError={isError} error={error}>
            <Container>
                <Row>
						{data?.map((mealCard) => (
							<Col key={mealCard.strMeal} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src={`${mealCard.strMealThumb}`} />
                                <Card.Body>
                                <Card.Title>{mealCard.strMeal}</Card.Title>
                                <Card.Text><b>Category:</b> {mealCard?.strCategory}</Card.Text>
                                <Card.Text><b>Instructions:</b> {mealCard?.strInstructions}</Card.Text>
                                <ul>
                                    {
                                        (() => {
                                            const ingredients = [];
                                            for (let i = 1; i <= 20; i++) {
                                                if (mealCard[`strIngredient${i}`]) {
                                                    ingredients.push(
                                                        <li key={i}>
                                                            {mealCard[`strIngredient${i}`]} - {mealCard[`strMeasure${i}`]}
                                                        </li>
                                                    );
                                                }
                                            }
                                            return ingredients;
                                        })()
                                    }
                                </ul>
                                </Card.Body>
                                </Card>
							</Col>
						))}
				</Row>
				</Container>
			</FetchState>
		</Container>
	)
}

export default Meal
