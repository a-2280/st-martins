import { sanityFetch } from "@/sanity/lib/live";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Spacer from "@/components/spacer";
import FoodGallery from "@/components/foodGallery";

const PAGE_QUERY = `{
  "header": *[_type == "header"][0],
  "hero": *[_type == "hero"][0],
  "gallery": *[_type == "gallery"][0]
}`;

export default async function Home() {
  const { data } = await sanityFetch({ query: PAGE_QUERY });

  return (
    <main>
      <Header data={data?.header} />
      <Hero data={data?.hero} />
      <Spacer className="h-250px" />
      <FoodGallery data={data?.gallery} />
      <Spacer className="h-200px" />
    </main>
  );
}
