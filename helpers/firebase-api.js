export async function getAllEvents() {
  const response = await fetch(
    "https://my-nextjs-db-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  // - not needed
  // const events = [];
  // console.log(`data`, data);
  // for (const key in data) {
  //   if (Object.hasOwnProperty.call(data, key)) {
  //     // const element = data[key];

  //     events.push({
  //       ...data[key]
  //     });
  //   }
  // }
  return data;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find(event => event.id === id);
}

// export function getAllEvents() {
//   return DUMMY_EVENTS;
// }

// export function getFilteredEvents(dateFilter) {
//   const { year, month } = dateFilter;

//   let filteredEvents = DUMMY_EVENTS.filter(event => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
//     );
//   });

//   return filteredEvents;
// }
