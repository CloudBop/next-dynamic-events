import { getFeaturedEvents } from "../helpers/firebase-api";
import EventList from "../components/events/event-list";
import Head from "next/head";

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
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
