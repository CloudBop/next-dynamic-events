import { getFeaturedEvents } from "../helpers/firebase-api";
import EventList from "../components/events/event-list";

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
      // in production regen every hour
      revalidate: 60 * 60
    }
  };
}

export default HomePage;
