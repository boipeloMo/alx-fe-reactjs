import { Routes, Route, Link } from 'react-router-dom';
import { RecipeList } from './components/RecipeList';
import { AddRecipeForm } from './components/AddRecipeForm';
import { RecipeDetails } from './components/RecipeDetails';

function App() {
  return (
    <div>
      <header>
        <h1>
          <Link to="/">Recipe Sharing App</Link>
        </h1>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
