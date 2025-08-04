import { Metadata } from 'next';
import RecipeSearchClient from '../RecipeSearchClient';

interface SearchParams {
  query: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SearchParams>;
}): Promise<Metadata> {
  const { query } = await params;
  const decodedQuery = decodeURIComponent(query);

  return {
    title: `"${decodedQuery}" 검색 결과 | UgVeg 레시피`,
    description: `"${decodedQuery}"에 대한 레시피 검색 결과를 확인하세요.`,
    openGraph: {
      title: `"${decodedQuery}" 검색 결과 | UgVeg 레시피`,
      description: `"${decodedQuery}"에 대한 레시피 검색 결과를 확인하세요.`,
      url: 'https://ugveg.vercel.app/UgVeg.png',
    },
  };
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
