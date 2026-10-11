import { fetchCategories } from "@/lib/api/categories";

import {
  ExpoCta,
  ExpoHero,
  ExpoIndustries,
  ExpoJourneys,
  ExpoSupports,
  ExpoValues,
} from "./_components/expo-home";

const HomePage = async () => {
  const categories = await fetchCategories();

  return (
    <div className="bg-white">
      <ExpoHero />
      <ExpoSupports />
      <ExpoJourneys />
      <ExpoIndustries categories={categories} />
      <ExpoValues />
      <ExpoCta />
    </div>
  );
};

export default HomePage;
