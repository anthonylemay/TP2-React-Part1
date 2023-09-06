import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import mealService from '../service/mealService';
import FetchState from '../../components/FetchState/FetchState';
import { Navbar, Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const mS = new mealService();

const Meal = () => {
    const params = useParams();
    const { data, isLoading, isError, error } = useQuery(['meal', params.mealId], () => mS.getMealById(params.mealId));

    return (
        <Container fluid className='min-vh-100 d-grid'>
                <FetchState isLoading={isLoading} isError={isError} error={error}>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Link to={`/category/${params.categoryName}`} className="navbar-brand">Back to the {params.categoryName} Category</Link>
                        <Link to="/" className="navbar-brand">Back to all Categories</Link>
                    </Container>
                </Navbar>
                <Container>
                    {data?.map((mealCard) => (
                        <Row key={mealCard.strMeal}>
                            <Col md={8}>
                                <Card style={{ width: '100%' }}>
                                    <Card.Img variant="top" src={`${mealCard.strMealThumb}`} />
                                    <Card.Body>
                                        <Card.Title className="text-center">{mealCard.strMeal}</Card.Title>
                                        <Card.Text className="text-center"><b>Category:</b> {mealCard?.strCategory}</Card.Text>
                                        <Card.Text className="text-left"><b>Instructions:</b> {mealCard?.strInstructions}</Card.Text>
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Ingredients & Measurements</Accordion.Header>
                                                <Accordion.Body>
                                                    <Card.Text className="text-left"><b>List of Ingredients & Measurements</b></Card.Text>
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
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                </Container>
            </FetchState>
        </Container>
    )
}

export default Meal;
