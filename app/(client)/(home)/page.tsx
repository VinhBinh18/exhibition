import { listPublicEvents } from "@/lib/supabase/public-events";

import {
  ExpoCta,
  ExpoHero,
  ExpoIndustries,
  ExpoJourneys,
  ExpoSupports,
  ExpoUpcoming,
  ExpoValues,
} from "./_components/expo-home";

const HomePage = async () => {
  const events = await listPublicEvents({ page: 1, limit: 8 });

  return (
    <div className="bg-white">
      <ExpoHero />
      <ExpoSupports />
      <ExpoJourneys />
      <ExpoIndustries categories={[]} />
      {/* <ExpoUpcoming events={events.data} /> */}
      <ExpoValues />
      <ExpoCta />
    </div>
  );
};

export default HomePage;
