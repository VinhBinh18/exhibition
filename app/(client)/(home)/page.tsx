import {
  ExpoCta,
  ExpoHero,
  ExpoIndustries,
  ExpoJourneys,
  ExpoSupports,
  ExpoValues,
} from "./_components/expo-home";

const HomePage = () => {
  return (
    <div className="bg-white">
      <ExpoHero />
      <ExpoSupports />
      <ExpoJourneys />
      <ExpoIndustries categories={[]} />
      <ExpoValues />
      <ExpoCta />
    </div>
  );
};

export default HomePage;
