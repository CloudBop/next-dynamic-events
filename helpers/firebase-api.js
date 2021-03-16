export async function getAllEvents() {
  const response = await fetch(
    "https://my-nextjs-db-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

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
