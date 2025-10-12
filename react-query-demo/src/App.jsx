import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent.jsx";

const queryClient = new QueryClient();

function App() {
  return (
  
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className="text-2xl font-bold text-center mt-6">
          Advanced Data Handling with React Query
        </h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;
