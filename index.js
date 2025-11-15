const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//replace this url with any image's url that you want.
const example_image = 'https://tse3.mm.bing.net/th/id/OIF.8sbPratvpFakKsMLxjoHoQ?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
// const image_2 = 'image url'

// Endpoint to handle incoming dialogflow events 
// You can replace req (Request) and res (Respond) with any desired names
app.post('/dialog', async(req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;
  const location = parameters['geo-city'] || "unspecified";
  const date = parameters['date-time']?.date_time || parameters['date-time'] || "unspecified";

  if (intent === 'book.rooms') {
    const roomType = parameters['rooms'];
    return res.json({
        fulfillmentMessages: [
          {
            platform: "DIALOGFLOW_MESSENGER",
            payload: {
              richContent: [
                [
                  {
                    type: "image",
                    rawUrl: example_image,
                    accessibilityText: "Booking confirmed"
                  },
                  {
                    type: "description",
                    title: `Booking Confirmed: ${roomType}`,
                    text: [
                      `Location: ${location}`,
                      `Booked for date: ${date}`
                    ]
                  },
                  {
                    type: "button",
                    icon: { type: "cancel" },
                    text: "Cancel Booking",
                    event: {
                      name: "cancel_booking",
                      parameters: { room_car: roomType }
                    }
                  }
                ]
              ]
            }
          }
        ]
      });
  }

  if (intent === 'book.cars') {
    const carType = parameters['cars'];
      return res.json({
        fulfillmentMessages: [
          {
            platform: "DIALOGFLOW_MESSENGER",
            payload: {
              richContent: [
                [
                  {
                    type: "image",
                    rawUrl: example_image,
                    accessibilityText: "Booking confirmed"
                  },
                  {
                    type: "description",
                    title: `Booking Confirmed: ${carType}`,
                    text: [
                      `Location: ${location}`,
                      `Booked for date: ${date}`
                    ]
                  },
                  {
                    type: "button",
                    icon: { type: "cancel" },
                    text: "Cancel Booking",
                    event: {
                      name: "cancel_booking",
                      parameters: { room_car: carType }
                    }
                  }
                ]
              ]
            }
          }
        ]
      });
  }

    if (intent === 'cancel_booking') {
       const roomCar = parameters['room_car'] || "unspecified";
      return res.json({ fulfillmentText: `✅ Booking for ${roomCar} has been cancelled.` });
  }

  return res.json({ fulfillmentText: "Intent not handled by webhook." });
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));




