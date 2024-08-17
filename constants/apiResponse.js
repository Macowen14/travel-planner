export const dataResponse = {
  trip: {
    start_date: "2024-08-23",
    duration: "1 day",
    budget: "$0 - $500",
    group_size: "2-3 friends",
    destination: "Montevideo, Uruguay",
  },
  transportation: {
    options: [
      {
        type: "Flight",
        provider: "Example Airline",
        price: "$300 - $500 (roundtrip)",
        booking_link: "https://www.exampleairline.com/",
      },
      {
        type: "Bus",
        provider: "Example Bus Company",
        price: "$100 - $200 (roundtrip)",
        booking_link: "https://www.examplebuscompany.com/",
      },
    ],
  },
  accommodation: {
    options: [
      {
        name: "Hotel Boutique 1821",
        price: "$50 - $100 per night",
        address: "18 de Julio 1821, Montevideo",
        rating: "4.5 stars",
        nearby_places: "Plaza Independencia, Teatro Solís, Ciudad Vieja",
      },
      {
        name: "Hotel America",
        price: "$40 - $80 per night",
        address: "Sarandí 592, Montevideo",
        rating: "4 stars",
        nearby_places: "Mercado del Puerto, Rambla, Palacio Salvo",
      },
    ],
  },
  attractions: [
    {
      name: "Plaza Independencia",
      description:
        "A historic square in the heart of Montevideo, featuring the iconic Independence Gate and the Palacio Salvo.",
      image_url: "https://www.example.com/plaza-independencia.jpg",
      ticket_price: "Free",
      best_time_to_visit:
        "Anytime, but especially during the day for its vibrant atmosphere.",
    },
    {
      name: "Teatro Solís",
      description:
        "A beautiful opera house with stunning architecture and regular performances. ",
      image_url: "https://www.example.com/teatro-solis.jpg",
      ticket_price: "Varies depending on performance",
      best_time_to_visit:
        "Check the website for showtimes and purchase tickets in advance.",
    },
    {
      name: "Mercado del Puerto",
      description:
        "A historic market featuring a variety of food stalls, restaurants, and shops.",
      image_url: "https://www.example.com/mercado-del-puerto.jpg",
      ticket_price: "Free",
      best_time_to_visit:
        "Lunchtime or dinner for a delicious and authentic experience.",
    },
    {
      name: "Rambla",
      description:
        "Montevideo's iconic waterfront promenade, perfect for a leisurely stroll, enjoying the views, or having a picnic.",
      image_url: "https://www.example.com/rambla.jpg",
      ticket_price: "Free",
      best_time_to_visit:
        "Anytime, but especially during sunset for stunning views.",
    },
    {
      name: "Museo Nacional de Artes Visuales",
      description:
        "A museum showcasing Uruguayan and international contemporary art.",
      image_url: "https://www.example.com/museo-nacional-de-artes-visuales.jpg",
      ticket_price: "$5",
      best_time_to_visit: "Tuesday - Sunday, 11 AM - 7 PM",
    },
  ],
  daily_schedule: {
    day_1: [
      {
        time: "9:00 AM",
        activity:
          "Arrive at Montevideo airport or bus station and check into your hotel.",
      },
      {
        time: "10:00 AM",
        activity:
          "Explore Plaza Independencia, including the Independence Gate and Palacio Salvo.",
        estimated_travel_time: "15 minutes",
      },
      {
        time: "11:00 AM",
        activity:
          "Visit Teatro Solís and admire its architecture (if open for tours or a show).",
        estimated_travel_time: "10 minutes",
      },
      {
        time: "12:00 PM",
        activity:
          "Lunch at Mercado del Puerto for a traditional Uruguayan experience.",
        estimated_travel_time: "10 minutes",
      },
      {
        time: "2:00 PM",
        activity: "Walk along Rambla, enjoying the views and the sea breeze.",
        estimated_travel_time: "10 minutes",
      },
      {
        time: "4:00 PM",
        activity:
          "Visit Museo Nacional de Artes Visuales to explore contemporary art.",
        estimated_travel_time: "20 minutes",
      },
      {
        time: "6:00 PM",
        activity: "Dinner at a local restaurant in the Ciudad Vieja district.",
        estimated_travel_time: "15 minutes",
      },
      {
        time: "8:00 PM",
        activity:
          "Enjoy a nightcap at a bar in the Ciudad Vieja or Pocitos neighborhood.",
        estimated_travel_time: "10 minutes",
      },
      {
        time: "10:00 PM",
        activity: "Return to your hotel and relax.",
      },
    ],
  },
};
