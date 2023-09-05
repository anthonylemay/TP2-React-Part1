import {useQuery} from 'react-query'
import categoriesService from '../service/categoriesService'
import FetchState from '../../components/FetchState/FetchState';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';

const csS = new categoriesService()

const Categories = () => {
	const { data, isLoading, isError, error } = useQuery(['categories'], () => csS.getAllCategories());

	return (
		<Container fluid className='d-grid min-vh-100'>
			<FetchState isLoading={isLoading} isError={isError} error={error}>
				<Container>
					<Row>
						{data?.map((category) => (
							<Col key={category.strCategory} xs={12} sm={6} md={4} lg={3} xl={2}>
								<Link to={`/category/${category.strCategory}`}>
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