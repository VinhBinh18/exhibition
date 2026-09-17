import { fetchCategories } from "@/utils/api/categories";

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
      {/* <ExpoUpcoming products={expos} categories={categories} /> */}
      <ExpoValues />
      <ExpoCta />
    </div>
  );
};

export default HomePage;
