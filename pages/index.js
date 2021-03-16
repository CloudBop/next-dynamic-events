import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

// export async function getStaticProps() {

//   const data

//   return {
//     props: {
//       featuredEvents: data
//     }
//   }
// }

export default HomePage;
