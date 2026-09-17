import { fetchCategories } from "@/utils/api/categories";
import { fetchUpcomingExpos } from "@/utils/api/products";

import {
  ExpoCta,
  ExpoHero,
  ExpoValues,
  ExpoSupports,
  ExpoJourneys,
  ExpoUpcoming,
  ExpoIndustries,
} from "./_components/expo-home";

const HomePage = async () => {
  const [categories, expos] = await Promise.all([
    fetchCategories(),
    fetchUpcomingExpos(24),
  ]);

  return (
    <div className="bg-white">
      <ExpoHero />
      <ExpoSupports />
      <ExpoJourneys />
      <ExpoIndustries categories={categories} />
      {/* <ExpoUpcoming products={expos} categories={categories} /> */}
      <ExpoValues />
      <ExpoCta />
    </div>
  );
};

export default HomePage;
