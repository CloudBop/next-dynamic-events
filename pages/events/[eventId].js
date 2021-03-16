import { Fragment } from "react";
import { getEventById, getAllEvents } from "../../helpers/firebase-api";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // get event id from context / url --> remember same regex as filename [eventId]
  const eventId = context.params.eventId;
  //
  const event = await getEventById(eventId);

  return {
    props: {
      event
    },
    revalidate: 60 * 60
  };
}

// tell nextjs what paths to pre-render otherwise it will be looking for a potnetiall infintie amount
export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  // create array of objects wth IDs
  const eventIdPaths = allEvents.map(evt => ({ params: { eventId: evt.id } }));
  // pre-render these paths
  return {
    paths: eventIdPaths,
    // false we know ahead of time all of these pages
    fallback: false
  };
}

export default EventDetailPage;
