import {useQuery} from 'react-query'
import categoriesService from '../service/categoriesService'
import FetchState from '../../components/FetchState/FetchState';
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const csS = new categoriesService()

const Categories = () => {
	const { data, isLoading, isError, error } = useQuery(['categories'], () => csS.getAllCategories());
	return (
		<Container fluid className='d-grid min-vh-100'>
			<FetchState isLoading={isLoading} isError={isError} error={error}>
				<Container>
                    <h1 className='p-5 mt-4 text-center'>List of all meal categories</h1>
					<Row className='p-5 mt-4'>
						{data?.map((category) => (
							<Col key={category.strCategory} xs={12} sm={6} md={4} lg={3} xl={2}>
								<Link className='h6' to={`/category/${category.strCategory}`}>
									{category.strCategory}
								</Link>
							</Col>
						))}
					</Row>
				</Container>
			</FetchState>
		</Container>
	)
}

export default Categories