import {Route, Routes} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import Categories from './meals/components/categories'
import Category from './meals/components/category'
import Meal from './meals/components/meal'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
          <Route index element={<Categories />} />
          <Route path="/category/:categoryName" element={<Category />}>
              <Route path=":mealId" element={<Meal />} />
          </Route>
      </Routes>

    </QueryClientProvider>
  );
}



export default App
