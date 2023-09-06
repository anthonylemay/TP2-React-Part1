import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import categoryService from '../service/categoryService';
import FetchState from '../../components/FetchState/FetchState';
import {Navbar, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cS = new categoryService();

const Category = () => {
	const params = useParams();
	const { data, isLoading, isError, error } = useQuery(['category', params.categoryName], () => cS.getCategoryByName(params.categoryName));
	return (
		<Container fluid className='min-vh-100 d-grid'>
			<FetchState isLoading={isLoading} isError={isError} error={error}>
            <Navbar className="bg-body-tertiary">
                    <Container>
                        <Link to="/" className="navbar-brand">Back to all Categories</Link>
                    </Container>
                </Navbar>
            <Container>
                <Row className='p-5 mt-4'>
						{data?.map((meal) => (
							<Col key={meal.strMeal} xs={12} sm={12} md={6} lg={4} xl={4} className='text-left'>
                                <Link to={`/category/${params.categoryName}/${meal.idMeal}`}>
                                <Card style={{ width: '18rem' }} className='m-4 p-3'>
                                <Card.Img variant="top" src={`${meal.strMealThumb}`} />
                                <Card.Body>
                                <Card.Title>{meal.strMeal}</Card.Title>
                                <Button variant="primary">See full recipe</Button>
                                </Card.Body>
                                </Card></Link>

							</Col>
						))}
				</Row>
				</Container>
			</FetchState>
		</Container>
	)
}

export default Category
