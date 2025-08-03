import RecipeSearchClient from '../RecipeSearchClient';

interface SearchParams {
  query: string;
}

export default async function RecipeSearchPage({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const resolvedParams = await params;
  const searchQuery = decodeURIComponent(resolvedParams.query);

  return <RecipeSearchClient searchQuery={searchQuery} />;
}
