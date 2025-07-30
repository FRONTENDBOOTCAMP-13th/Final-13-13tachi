// app/recipe/search/[query]/page.tsx

import RecipeSearchClient from '../RecipeSearchClient';

interface SearchParams {
  query: string;
}

export default function RecipeSearchPage({ params }: { params: SearchParams }) {
  const searchQuery = decodeURIComponent(params.query);

  return <RecipeSearchClient searchQuery={searchQuery} />;
}
