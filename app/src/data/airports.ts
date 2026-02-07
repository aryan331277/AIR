// Real airport data for 5 major international airports
export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number];
  terminals: Terminal[];
  amenities: Amenity[];
  services: Service[];
}

export interface Terminal {
  id: string;
  name: string;
  gates: Gate[];
  floors: Floor[];
}

export interface Gate {
  id: string;
  number: string;
  coordinates: [number, number];
  status: 'available' | 'occupied' | 'boarding' | 'closed';
  currentFlight?: string;
}

export interface Floor {
  id: string;
  level: number;
  name: string;
  features: MapFeature[];
}

export interface MapFeature {
  id: string;
  type: 'security' | 'restroom' | 'food' | 'retail' | 'lounge' | 'baggage' | 'checkpoint' | 'atm' | 'medical' | 'prayer' | 'smoking' | 'wifi' | 'charging' | 'service' | 'amenity';
  name: string;
  coordinates: [number, number];
  description?: string;
  hours?: string;
}

export interface Amenity {
  id: string;
  type: string;
  name: string;
  location: string;
  hours: string;
  description?: string;
}

export interface Service {
  id: string;
  type: string;
  name: string;
  provider: string;
  location: string;
  hours: string;
}

// Atlanta Hartsfield-Jackson International Airport (ATL)
const atlantaAirport: Airport = {
  id: 'atl',
  code: 'ATL',
  name: 'Hartsfield-Jackson Atlanta International Airport',
  city: 'Atlanta',
  country: 'USA',
  coordinates: [-84.4281, 33.6407],
  terminals: [
    {
      id: 'domestic',
      name: 'Domestic Terminal',
      gates: [
        { id: 'T1', number: 'T1', coordinates: [-84.4285, 33.6405], status: 'available' },
        { id: 'T2', number: 'T2', coordinates: [-84.4283, 33.6406], status: 'occupied' },
        { id: 'T3', number: 'T3', coordinates: [-84.4281, 33.6407], status: 'boarding' },
        { id: 'T4', number: 'T4', coordinates: [-84.4279, 33.6408], status: 'available' },
        { id: 'T5', number: 'T5', coordinates: [-84.4277, 33.6409], status: 'occupied' },
        { id: 'T6', number: 'T6', coordinates: [-84.4275, 33.6410], status: 'available' },
        { id: 'T7', number: 'T7', coordinates: [-84.4273, 33.6411], status: 'closed' },
        { id: 'T8', number: 'T8', coordinates: [-84.4271, 33.6412], status: 'available' },
      ],
      floors: [
        {
          id: 'domestic-l1',
          level: 1,
          name: 'Baggage Claim',
          features: [
            { id: 'bag1', type: 'baggage', name: 'Baggage Claim North', coordinates: [-84.4285, 33.6405], hours: '24 hours' },
            { id: 'bag2', type: 'baggage', name: 'Baggage Claim South', coordinates: [-84.4275, 33.6410], hours: '24 hours' },
            { id: 'atm1', type: 'atm', name: 'Truist ATM', coordinates: [-84.4283, 33.6406], hours: '24 hours' },
            { id: 'rest1', type: 'restroom', name: 'Restrooms', coordinates: [-84.4281, 33.6407], hours: '24 hours' },
          ]
        },
        {
          id: 'domestic-l2',
          level: 2,
          name: 'Check-in & Security',
          features: [
            { id: 'sec1', type: 'security', name: 'North Security Checkpoint', coordinates: [-84.4285, 33.6405], hours: '24 hours', description: 'Main TSA checkpoint' },
            { id: 'sec2', type: 'security', name: 'South Security Checkpoint', coordinates: [-84.4275, 33.6410], hours: '24 hours', description: 'Main TSA checkpoint' },
            { id: 'sec3', type: 'security', name: 'Lower North Security', coordinates: [-84.4283, 33.6406], hours: '4:00 AM - 10:00 PM' },
            { id: 'check1', type: 'checkpoint', name: 'Check-in Counters North', coordinates: [-84.4281, 33.6407], hours: '24 hours' },
            { id: 'check2', type: 'checkpoint', name: 'Check-in Counters South', coordinates: [-84.4279, 33.6408], hours: '24 hours' },
          ]
        }
      ]
    },
    {
      id: 'concourse-a',
      name: 'Concourse A',
      gates: [
        { id: 'A1', number: 'A1', coordinates: [-84.4260, 33.6415], status: 'boarding' },
        { id: 'A2', number: 'A2', coordinates: [-84.4258, 33.6416], status: 'occupied' },
        { id: 'A3', number: 'A3', coordinates: [-84.4256, 33.6417], status: 'available' },
        { id: 'A4', number: 'A4', coordinates: [-84.4254, 33.6418], status: 'occupied' },
        { id: 'A5', number: 'A5', coordinates: [-84.4252, 33.6419], status: 'available' },
        { id: 'A6', number: 'A6', coordinates: [-84.4250, 33.6420], status: 'boarding' },
        { id: 'A7', number: 'A7', coordinates: [-84.4248, 33.6421], status: 'occupied' },
        { id: 'A8', number: 'A8', coordinates: [-84.4246, 33.6422], status: 'available' },
        { id: 'A9', number: 'A9', coordinates: [-84.4244, 33.6423], status: 'closed' },
        { id: 'A10', number: 'A10', coordinates: [-84.4242, 33.6424], status: 'available' },
        { id: 'A11', number: 'A11', coordinates: [-84.4240, 33.6425], status: 'occupied' },
        { id: 'A12', number: 'A12', coordinates: [-84.4238, 33.6426], status: 'available' },
      ],
      floors: [
        {
          id: 'a-l1',
          level: 1,
          name: 'Main Level',
          features: [
            { id: 'a-food1', type: 'food', name: 'Chick-fil-A', coordinates: [-84.4260, 33.6415], hours: '5:00 AM - 10:00 PM' },
            { id: 'a-retail1', type: 'retail', name: 'Atlanta Braves All-Star Grill', coordinates: [-84.4258, 33.6416], hours: '6:00 AM - 11:00 PM' },
            { id: 'a-lounge1', type: 'lounge', name: 'Delta Sky Club', coordinates: [-84.4256, 33.6417], hours: '4:30 AM - 11:30 PM', description: 'Premium lounge access' },
            { id: 'a-rest1', type: 'restroom', name: 'Restrooms', coordinates: [-84.4254, 33.6418], hours: '24 hours' },
            { id: 'a-charge1', type: 'charging', name: 'Charging Station', coordinates: [-84.4252, 33.6419], hours: '24 hours' },
          ]
        }
      ]
    },
    {
      id: 'concourse-b',
      name: 'Concourse B',
      gates: [
        { id: 'B1', number: 'B1', coordinates: [-84.4220, 33.6430], status: 'available' },
        { id: 'B2', number: 'B2', coordinates: [-84.4218, 33.6431], status: 'occupied' },
        { id: 'B3', number: 'B3', coordinates: [-84.4216, 33.6432], status: 'boarding' },
        { id: 'B4', number: 'B4', coordinates: [-84.4214, 33.6433], status: 'available' },
        { id: 'B5', number: 'B5', coordinates: [-84.4212, 33.6434], status: 'occupied' },
        { id: 'B6', number: 'B6', coordinates: [-84.4210, 33.6435], status: 'available' },
        { id: 'B7', number: 'B7', coordinates: [-84.4208, 33.6436], status: 'closed' },
        { id: 'B8', number: 'B8', coordinates: [-84.4206, 33.6437], status: 'occupied' },
        { id: 'B9', number: 'B9', coordinates: [-84.4204, 33.6438], status: 'available' },
        { id: 'B10', number: 'B10', coordinates: [-84.4202, 33.6439], status: 'boarding' },
      ],
      floors: [
        {
          id: 'b-l1',
          level: 1,
          name: 'Main Level',
          features: [
            { id: 'b-food1', type: 'food', name: 'Popeyes', coordinates: [-84.4220, 33.6430], hours: '5:00 AM - 11:00 PM' },
            { id: 'b-food2', type: 'food', name: 'Five Guys', coordinates: [-84.4218, 33.6431], hours: '6:00 AM - 10:00 PM' },
            { id: 'b-retail1', type: 'retail', name: 'Best Buy Express', coordinates: [-84.4216, 33.6432], hours: '6:00 AM - 10:00 PM' },
            { id: 'b-lounge1', type: 'lounge', name: 'Delta Sky Club', coordinates: [-84.4214, 33.6433], hours: '4:30 AM - 11:30 PM' },
            { id: 'b-spa1', type: 'medical', name: 'Be Relax Spa', coordinates: [-84.4212, 33.6434], hours: '7:00 AM - 10:00 PM', description: 'Massage and relaxation services' },
          ]
        }
      ]
    },
    {
      id: 'concourse-c',
      name: 'Concourse C',
      gates: [
        { id: 'C1', number: 'C1', coordinates: [-84.4180, 33.6445], status: 'occupied' },
        { id: 'C2', number: 'C2', coordinates: [-84.4178, 33.6446], status: 'available' },
        { id: 'C3', number: 'C3', coordinates: [-84.4176, 33.6447], status: 'boarding' },
        { id: 'C4', number: 'C4', coordinates: [-84.4174, 33.6448], status: 'occupied' },
        { id: 'C5', number: 'C5', coordinates: [-84.4172, 33.6449], status: 'available' },
        { id: 'C6', number: 'C6', coordinates: [-84.4170, 33.6450], status: 'closed' },
        { id: 'C7', number: 'C7', coordinates: [-84.4168, 33.6451], status: 'occupied' },
        { id: 'C8', number: 'C8', coordinates: [-84.4166, 33.6452], status: 'available' },
      ],
      floors: [
        {
          id: 'c-l1',
          level: 1,
          name: 'Main Level',
          features: [
            { id: 'c-food1', type: 'food', name: 'Corner Bakery Cafe', coordinates: [-84.4180, 33.6445], hours: '5:00 AM - 10:00 PM' },
            { id: 'c-retail1', type: 'retail', name: 'Buckhead Books', coordinates: [-84.4178, 33.6446], hours: '6:00 AM - 10:00 PM' },
            { id: 'c-lounge1', type: 'lounge', name: 'Delta Sky Club', coordinates: [-84.4176, 33.6447], hours: '4:30 AM - 11:30 PM' },
          ]
        }
      ]
    },
    {
      id: 'concourse-d',
      name: 'Concourse D',
      gates: [
        { id: 'D1', number: 'D1', coordinates: [-84.4140, 33.6460], status: 'available' },
        { id: 'D2', number: 'D2', coordinates: [-84.4138, 33.6461], status: 'occupied' },
        { id: 'D3', number: 'D3', coordinates: [-84.4136, 33.6462], status: 'boarding' },
        { id: 'D4', number: 'D4', coordinates: [-84.4134, 33.6463], status: 'available' },
        { id: 'D5', number: 'D5', coordinates: [-84.4132, 33.6464], status: 'occupied' },
        { id: 'D6', number: 'D6', coordinates: [-84.4130, 33.6465], status: 'available' },
        { id: 'D7', number: 'D7', coordinates: [-84.4128, 33.6466], status: 'closed' },
        { id: 'D8', number: 'D8', coordinates: [-84.4126, 33.6467], status: 'occupied' },
      ],
      floors: [
        {
          id: 'd-l1',
          level: 1,
          name: 'Main Level',
          features: [
            { id: 'd-food1', type: 'food', name: 'Buffalo Wild Wings', coordinates: [-84.4140, 33.6460], hours: '10:00 AM - 12:00 AM' },
            { id: 'd-retail1', type: 'retail', name: 'Luxe International', coordinates: [-84.4138, 33.6461], hours: '6:00 AM - 10:00 PM' },
            { id: 'd-shoe1', type: 'service', name: 'Shoeshine Service', coordinates: [-84.4136, 33.6462], hours: '7:00 AM - 9:00 PM' },
          ]
        }
      ]
    },
    {
      id: 'concourse-e',
      name: 'Concourse E',
      gates: [
        { id: 'E1', number: 'E1', coordinates: [-84.4100, 33.6475], status: 'boarding' },
        { id: 'E2', number: 'E2', coordinates: [-84.4098, 33.6476], status: 'occupied' },
        { id: 'E3', number: 'E3', coordinates: [-84.4096, 33.6477], status: 'available' },
        { id: 'E4', number: 'E4', coordinates: [-84.4094, 33.6478], status: 'occupied' },
        { id: 'E5', number: 'E5', coordinates: [-84.4092, 33.6479], status: 'available' },
        { id: 'E6', number: 'E6', coordinates: [-84.4090, 33.6480], status: 'closed' },
      ],
      floors: [
        {
          id: 'e-l1',
          level: 1,
          name: 'Main Level',
          features: [
            { id: 'e-food1', type: 'food', name: 'Das Waffle Haus', coordinates: [-84.4100, 33.6475], hours: '6:00 AM - 10:00 PM' },
            { id: 'e-retail1', type: 'retail', name: 'Michael Kors', coordinates: [-84.4098, 33.6476], hours: '6:00 AM - 10:00 PM' },
            { id: 'e-lounge1', type: 'lounge', name: 'Centurion Lounge', coordinates: [-84.4096, 33.6477], hours: '5:00 AM - 11:00 PM', description: 'American Express premium lounge' },
          ]
        }
      ]
    },
    {
      id: 'concourse-f',
      name: 'Concourse F (International)',
      gates: [
        { id: 'F1', number: 'F1', coordinates: [-84.4060, 33.6490], status: 'occupied' },
        { id: 'F2', number: 'F2', coordinates: [-84.4058, 33.6491], status: 'boarding' },
        { id: 'F3', number: 'F3', coordinates: [-84.4056, 33.6492], status: 'available' },
        { id: 'F4', number: 'F4', coordinates: [-84.4054, 33.6493], status: 'occupied' },
        { id: 'F5', number: 'F5', coordinates: [-84.4052, 33.6494], status: 'available' },
        { id: 'F6', number: 'F6', coordinates: [-84.4050, 33.6495], status: 'closed' },
        { id: 'F7', number: 'F7', coordinates: [-84.4048, 33.6496], status: 'occupied' },
        { id: 'F8', number: 'F8', coordinates: [-84.4046, 33.6497], status: 'available' },
        { id: 'F9', number: 'F9', coordinates: [-84.4044, 33.6498], status: 'boarding' },
        { id: 'F10', number: 'F10', coordinates: [-84.4042, 33.6499], status: 'occupied' },
        { id: 'F11', number: 'F11', coordinates: [-84.4040, 33.6500], status: 'available' },
        { id: 'F12', number: 'F12', coordinates: [-84.4038, 33.6501], status: 'occupied' },
      ],
      floors: [
        {
          id: 'f-l1',
          level: 1,
          name: 'Main Level',
          features: [
            { id: 'f-food1', type: 'food', name: 'The Coffee Bean & Tea Leaf', coordinates: [-84.4060, 33.6490], hours: '5:00 AM - 11:00 PM' },
            { id: 'f-retail1', type: 'retail', name: 'Duty Free Americas', coordinates: [-84.4058, 33.6491], hours: '24 hours' },
            { id: 'f-retail2', type: 'retail', name: 'Harrods', coordinates: [-84.4056, 33.6492], hours: '6:00 AM - 11:00 PM' },
            { id: 'f-retail3', type: 'retail', name: 'Coach', coordinates: [-84.4054, 33.6493], hours: '6:00 AM - 10:00 PM' },
            { id: 'f-retail4', type: 'retail', name: 'MAC Cosmetics', coordinates: [-84.4052, 33.6494], hours: '6:00 AM - 10:00 PM' },
            { id: 'f-lounge1', type: 'lounge', name: 'The Club at ATL', coordinates: [-84.4050, 33.6495], hours: '6:00 AM - 10:00 PM' },
            { id: 'f-lounge2', type: 'lounge', name: 'Delta Sky Club', coordinates: [-84.4048, 33.6496], hours: '4:30 AM - 11:30 PM' },
            { id: 'f-customs', type: 'checkpoint', name: 'Customs & Immigration', coordinates: [-84.4046, 33.6497], hours: '24 hours' },
          ]
        }
      ]
    },
  ],
  amenities: [
    { id: 'wifi', type: 'connectivity', name: 'Free WiFi', location: 'All terminals', hours: '24 hours', description: 'ATL Free WiFi - up to 45 minutes free' },
    { id: 'pet', type: 'service', name: 'Pet Relief Areas', location: 'Ground Transportation Area', hours: '24 hours', description: '1,000 sq ft dog park facility' },
    { id: 'nursing', type: 'service', name: 'Mamava Lactation Pods', location: 'Concourses B, C, F', hours: '24 hours' },
    { id: 'medical', type: 'service', name: 'Medical Center', location: 'Domestic Terminal', hours: '24 hours' },
    { id: 'prayer', type: 'service', name: 'Interfaith Chapel', location: 'Concourse E', hours: '24 hours' },
  ],
  services: [
    { id: 'currency', type: 'financial', name: 'Currency Exchange', provider: 'Travelex', location: 'All concourses', hours: '6:00 AM - 10:00 PM' },
    { id: 'atm', type: 'financial', name: 'ATMs', provider: 'Truist', location: 'All terminals', hours: '24 hours' },
    { id: 'car', type: 'transport', name: 'Car Rental', provider: 'Multiple', location: 'Ground Transportation Center', hours: '24 hours' },
    { id: 'taxi', type: 'transport', name: 'Taxi Service', provider: 'Atlanta Taxi', location: 'West End between exits W-1 and W-2', hours: '24 hours' },
    { id: 'rideshare', type: 'transport', name: 'Rideshare Pickup', provider: 'Uber/Lyft', location: 'North Economy parking lot', hours: '24 hours' },
  ]
};

// London Heathrow Airport (LHR) - Terminal 5
const heathrowAirport: Airport = {
  id: 'lhr',
  code: 'LHR',
  name: 'London Heathrow Airport',
  city: 'London',
  country: 'UK',
  coordinates: [-0.4614, 51.4700],
  terminals: [
    {
      id: 't5a',
      name: 'Terminal 5A',
      gates: [
        { id: 'T5-A1', number: 'A1', coordinates: [-0.4610, 51.4705], status: 'boarding' },
        { id: 'T5-A2', number: 'A2', coordinates: [-0.4608, 51.4706], status: 'occupied' },
        { id: 'T5-A3', number: 'A3', coordinates: [-0.4606, 51.4707], status: 'available' },
        { id: 'T5-A4', number: 'A4', coordinates: [-0.4604, 51.4708], status: 'occupied' },
        { id: 'T5-A5', number: 'A5', coordinates: [-0.4602, 51.4709], status: 'available' },
        { id: 'T5-A6', number: 'A6', coordinates: [-0.4600, 51.4710], status: 'boarding' },
        { id: 'T5-A7', number: 'A7', coordinates: [-0.4598, 51.4711], status: 'occupied' },
        { id: 'T5-A8', number: 'A8', coordinates: [-0.4596, 51.4712], status: 'available' },
        { id: 'T5-A9', number: 'A9', coordinates: [-0.4594, 51.4713], status: 'closed' },
        { id: 'T5-A10', number: 'A10', coordinates: [-0.4592, 51.4714], status: 'occupied' },
        { id: 'T5-A11', number: 'A11', coordinates: [-0.4590, 51.4715], status: 'available' },
        { id: 'T5-A12', number: 'A12', coordinates: [-0.4588, 51.4716], status: 'boarding' },
      ],
      floors: [
        {
          id: 't5a-l0',
          level: 0,
          name: 'Arrivals',
          features: [
            { id: 't5a-bag1', type: 'baggage', name: 'Baggage Reclaim', coordinates: [-0.4610, 51.4705], hours: '24 hours' },
            { id: 't5a-customs', type: 'checkpoint', name: 'Customs', coordinates: [-0.4608, 51.4706], hours: '24 hours' },
          ]
        },
        {
          id: 't5a-l1',
          level: 1,
          name: 'Departures',
          features: [
            { id: 't5a-check1', type: 'checkpoint', name: 'Check-in Hall', coordinates: [-0.4610, 51.4705], hours: '24 hours' },
            { id: 't5a-sec1', type: 'security', name: 'North Security', coordinates: [-0.4608, 51.4706], hours: '24 hours' },
            { id: 't5a-sec2', type: 'security', name: 'South Security', coordinates: [-0.4606, 51.4707], hours: '24 hours' },
            { id: 't5a-fast', type: 'security', name: 'Fast Track Security', coordinates: [-0.4604, 51.4708], hours: '5:00 AM - 10:00 PM' },
          ]
        },
        {
          id: 't5a-l2',
          level: 2,
          name: 'Gates & Shopping',
          features: [
            { id: 't5a-food1', type: 'food', name: 'Gordon Ramsay Plane Food', coordinates: [-0.4610, 51.4705], hours: '5:00 AM - 10:00 PM' },
            { id: 't5a-food2', type: 'food', name: 'Huxleys', coordinates: [-0.4608, 51.4706], hours: '6:00 AM - 11:00 PM' },
            { id: 't5a-food3', type: 'food', name: 'Costa Coffee', coordinates: [-0.4606, 51.4707], hours: '5:00 AM - 10:00 PM' },
            { id: 't5a-retail1', type: 'retail', name: 'Harrods', coordinates: [-0.4604, 51.4708], hours: '6:00 AM - 10:00 PM' },
            { id: 't5a-retail2', type: 'retail', name: 'World Duty Free', coordinates: [-0.4602, 51.4709], hours: '5:00 AM - 11:00 PM' },
            { id: 't5a-lounge1', type: 'lounge', name: 'British Airways Galleries Club', coordinates: [-0.4600, 51.4710], hours: '5:00 AM - 10:00 PM' },
            { id: 't5a-lounge2', type: 'lounge', name: 'British Airways First Lounge', coordinates: [-0.4598, 51.4711], hours: '5:00 AM - 10:00 PM' },
          ]
        }
      ]
    },
    {
      id: 't5b',
      name: 'Terminal 5B',
      gates: [
        { id: 'T5-B32', number: 'B32', coordinates: [-0.4560, 51.4725], status: 'boarding' },
        { id: 'T5-B33', number: 'B33', coordinates: [-0.4558, 51.4726], status: 'occupied' },
        { id: 'T5-B34', number: 'B34', coordinates: [-0.4556, 51.4727], status: 'available' },
        { id: 'T5-B35', number: 'B35', coordinates: [-0.4554, 51.4728], status: 'occupied' },
        { id: 'T5-B36', number: 'B36', coordinates: [-0.4552, 51.4729], status: 'available' },
        { id: 'T5-B37', number: 'B37', coordinates: [-0.4550, 51.4730], status: 'boarding' },
        { id: 'T5-B38', number: 'B38', coordinates: [-0.4548, 51.4731], status: 'occupied' },
        { id: 'T5-B39', number: 'B39', coordinates: [-0.4546, 51.4732], status: 'available' },
        { id: 'T5-B40', number: 'B40', coordinates: [-0.4544, 51.4733], status: 'closed' },
        { id: 'T5-B41', number: 'B41', coordinates: [-0.4542, 51.4734], status: 'occupied' },
        { id: 'T5-B42', number: 'B42', coordinates: [-0.4540, 51.4735], status: 'available' },
        { id: 'T5-B43', number: 'B43', coordinates: [-0.4538, 51.4736], status: 'boarding' },
      ],
      floors: [
        {
          id: 't5b-l1',
          level: 1,
          name: 'Gates Level',
          features: [
            { id: 't5b-food1', type: 'food', name: 'Costa', coordinates: [-0.4560, 51.4725], hours: '5:00 AM - 10:00 PM' },
            { id: 't5b-retail1', type: 'retail', name: 'World Duty Free', coordinates: [-0.4558, 51.4726], hours: '5:00 AM - 11:00 PM' },
            { id: 't5b-lounge1', type: 'lounge', name: 'British Airways Club Lounge', coordinates: [-0.4556, 51.4727], hours: '5:00 AM - 10:00 PM' },
          ]
        }
      ]
    },
    {
      id: 't5c',
      name: 'Terminal 5C',
      gates: [
        { id: 'T5-C52', number: 'C52', coordinates: [-0.4510, 51.4745], status: 'occupied' },
        { id: 'T5-C53', number: 'C53', coordinates: [-0.4508, 51.4746], status: 'available' },
        { id: 'T5-C54', number: 'C54', coordinates: [-0.4506, 51.4747], status: 'boarding' },
        { id: 'T5-C55', number: 'C55', coordinates: [-0.4504, 51.4748], status: 'occupied' },
        { id: 'T5-C56', number: 'C56', coordinates: [-0.4502, 51.4749], status: 'available' },
        { id: 'T5-C57', number: 'C57', coordinates: [-0.4500, 51.4750], status: 'closed' },
        { id: 'T5-C58', number: 'C58', coordinates: [-0.4498, 51.4751], status: 'occupied' },
        { id: 'T5-C59', number: 'C59', coordinates: [-0.4496, 51.4752], status: 'available' },
        { id: 'T5-C60', number: 'C60', coordinates: [-0.4494, 51.4753], status: 'boarding' },
        { id: 'T5-C61', number: 'C61', coordinates: [-0.4492, 51.4754], status: 'occupied' },
        { id: 'T5-C62', number: 'C62', coordinates: [-0.4490, 51.4755], status: 'available' },
        { id: 'T5-C63', number: 'C63', coordinates: [-0.4488, 51.4756], status: 'occupied' },
      ],
      floors: [
        {
          id: 't5c-l1',
          level: 1,
          name: 'Gates Level',
          features: [
            { id: 't5c-food1', type: 'food', name: 'Kelly Deli', coordinates: [-0.4510, 51.4745], hours: '6:00 AM - 10:00 PM' },
            { id: 't5c-retail1', type: 'retail', name: 'World Duty Free', coordinates: [-0.4508, 51.4746], hours: '5:00 AM - 11:00 PM' },
          ]
        }
      ]
    },
  ],
  amenities: [
    { id: 'wifi', type: 'connectivity', name: 'Free WiFi', location: 'All terminals', hours: '24 hours', description: '_Heathrow Free WiFi' },
    { id: 'prayer', type: 'service', name: 'Multi-Faith Prayer Rooms', location: 'All terminals', hours: '24 hours' },
    { id: 'medical', type: 'service', name: 'Medical Centre', location: 'Terminal 5', hours: '24 hours' },
    { id: 'shower', type: 'service', name: 'Shower Facilities', location: 'Lounges and arrivals', hours: '24 hours' },
    { id: 'currency', type: 'service', name: 'Currency Exchange', location: 'All terminals', hours: '5:00 AM - 11:00 PM' },
  ],
  services: [
    { id: 'express', type: 'transport', name: 'Heathrow Express', provider: 'Heathrow Express', location: 'Terminal 5 Station', hours: '5:00 AM - 11:30 PM' },
    { id: 'tube', type: 'transport', name: 'London Underground', provider: 'TfL', location: 'Terminal 5 Station', hours: '24 hours' },
    { id: 'taxi', type: 'transport', name: 'Black Cabs', provider: 'London Taxis', location: 'Rank outside terminal', hours: '24 hours' },
    { id: 'car', type: 'transport', name: 'Car Rental', provider: 'Multiple', location: 'Terminal 5', hours: '6:00 AM - 11:00 PM' },
  ]
};

// Dubai International Airport (DXB)
const dubaiAirport: Airport = {
  id: 'dxb',
  code: 'DXB',
  name: 'Dubai International Airport',
  city: 'Dubai',
  country: 'UAE',
  coordinates: [55.3644, 25.2532],
  terminals: [
    {
      id: 't1',
      name: 'Terminal 1',
      gates: [
        { id: 'DXB-T1-D1', number: 'D1', coordinates: [55.3640, 25.2535], status: 'boarding' },
        { id: 'DXB-T1-D2', number: 'D2', coordinates: [55.3638, 25.2536], status: 'occupied' },
        { id: 'DXB-T1-D3', number: 'D3', coordinates: [55.3636, 25.2537], status: 'available' },
        { id: 'DXB-T1-D4', number: 'D4', coordinates: [55.3634, 25.2538], status: 'occupied' },
        { id: 'DXB-T1-D5', number: 'D5', coordinates: [55.3632, 25.2539], status: 'available' },
        { id: 'DXB-T1-D6', number: 'D6', coordinates: [55.3630, 25.2540], status: 'boarding' },
        { id: 'DXB-T1-D7', number: 'D7', coordinates: [55.3628, 25.2541], status: 'occupied' },
        { id: 'DXB-T1-D8', number: 'D8', coordinates: [55.3626, 25.2542], status: 'available' },
        { id: 'DXB-T1-D9', number: 'D9', coordinates: [55.3624, 25.2543], status: 'closed' },
        { id: 'DXB-T1-D10', number: 'D10', coordinates: [55.3622, 25.2544], status: 'occupied' },
      ],
      floors: [
        {
          id: 't1-l1',
          level: 1,
          name: 'Departures',
          features: [
            { id: 't1-check1', type: 'checkpoint', name: 'Check-in Counters', coordinates: [55.3640, 25.2535], hours: '24 hours' },
            { id: 't1-sec1', type: 'security', name: 'Security Checkpoint', coordinates: [55.3638, 25.2536], hours: '24 hours' },
            { id: 't1-food1', type: 'food', name: 'Dubai Duty Free Cafe', coordinates: [55.3636, 25.2537], hours: '24 hours' },
            { id: 't1-retail1', type: 'retail', name: 'Dubai Duty Free', coordinates: [55.3634, 25.2538], hours: '24 hours' },
            { id: 't1-lounge1', type: 'lounge', name: 'Marhaba Lounge', coordinates: [55.3632, 25.2539], hours: '24 hours' },
          ]
        }
      ]
    },
    {
      id: 't3',
      name: 'Terminal 3 (Emirates)',
      gates: [
        { id: 'DXB-T3-A1', number: 'A1', coordinates: [55.3680, 25.2510], status: 'boarding' },
        { id: 'DXB-T3-A2', number: 'A2', coordinates: [55.3678, 25.2511], status: 'occupied' },
        { id: 'DXB-T3-A3', number: 'A3', coordinates: [55.3676, 25.2512], status: 'available' },
        { id: 'DXB-T3-A4', number: 'A4', coordinates: [55.3674, 25.2513], status: 'occupied' },
        { id: 'DXB-T3-A5', number: 'A5', coordinates: [55.3672, 25.2514], status: 'available' },
        { id: 'DXB-T3-A6', number: 'A6', coordinates: [55.3670, 25.2515], status: 'boarding' },
        { id: 'DXB-T3-A7', number: 'A7', coordinates: [55.3668, 25.2516], status: 'occupied' },
        { id: 'DXB-T3-A8', number: 'A8', coordinates: [55.3666, 25.2517], status: 'available' },
        { id: 'DXB-T3-B1', number: 'B1', coordinates: [55.3664, 25.2518], status: 'closed' },
        { id: 'DXB-T3-B2', number: 'B2', coordinates: [55.3662, 25.2519], status: 'occupied' },
        { id: 'DXB-T3-B3', number: 'B3', coordinates: [55.3660, 25.2520], status: 'available' },
        { id: 'DXB-T3-B4', number: 'B4', coordinates: [55.3658, 25.2521], status: 'boarding' },
        { id: 'DXB-T3-B5', number: 'B5', coordinates: [55.3656, 25.2522], status: 'occupied' },
        { id: 'DXB-T3-B6', number: 'B6', coordinates: [55.3654, 25.2523], status: 'available' },
        { id: 'DXB-T3-B7', number: 'B7', coordinates: [55.3652, 25.2524], status: 'occupied' },
        { id: 'DXB-T3-B8', number: 'B8', coordinates: [55.3650, 25.2525], status: 'available' },
        { id: 'DXB-T3-C1', number: 'C1', coordinates: [55.3648, 25.2526], status: 'boarding' },
        { id: 'DXB-T3-C2', number: 'C2', coordinates: [55.3646, 25.2527], status: 'occupied' },
        { id: 'DXB-T3-C3', number: 'C3', coordinates: [55.3644, 25.2528], status: 'available' },
        { id: 'DXB-T3-C4', number: 'C4', coordinates: [55.3642, 25.2529], status: 'occupied' },
        { id: 'DXB-T3-C5', number: 'C5', coordinates: [55.3640, 25.2530], status: 'available' },
        { id: 'DXB-T3-C6', number: 'C6', coordinates: [55.3638, 25.2531], status: 'boarding' },
      ],
      floors: [
        {
          id: 't3-l1',
          level: 1,
          name: 'Departures & Lounges',
          features: [
            { id: 't3-check1', type: 'checkpoint', name: 'Emirates Check-in', coordinates: [55.3680, 25.2510], hours: '24 hours' },
            { id: 't3-sec1', type: 'security', name: 'Security Checkpoint', coordinates: [55.3678, 25.2511], hours: '24 hours' },
            { id: 't3-food1', type: 'food', name: 'Emirates Business Class Lounge', coordinates: [55.3676, 25.2512], hours: '24 hours' },
            { id: 't3-lounge1', type: 'lounge', name: 'Emirates First Class Lounge', coordinates: [55.3674, 25.2513], hours: '24 hours', description: 'Premium lounge with spa and dining' },
            { id: 't3-lounge2', type: 'lounge', name: 'Emirates Business Lounge Concourse B', coordinates: [55.3672, 25.2514], hours: '24 hours', description: 'Moet & Chandon Champagne bar' },
            { id: 't3-retail1', type: 'retail', name: 'Dubai Duty Free', coordinates: [55.3670, 25.2515], hours: '24 hours' },
          ]
        }
      ]
    },
  ],
  amenities: [
    { id: 'wifi', type: 'connectivity', name: 'Free WiFi', location: 'All terminals', hours: '24 hours', description: 'DXB Free WiFi' },
    { id: 'prayer', type: 'service', name: 'Prayer Rooms', location: 'All terminals', hours: '24 hours' },
    { id: 'medical', type: 'service', name: 'Medical Centre', location: 'All terminals', hours: '24 hours' },
    { id: 'spa', type: 'service', name: 'Spa Facilities', location: 'Lounges', hours: '24 hours' },
    { id: 'shower', type: 'service', name: 'Shower Facilities', location: 'Lounges', hours: '24 hours' },
  ],
  services: [
    { id: 'metro', type: 'transport', name: 'Dubai Metro', provider: 'RTA', location: 'Terminal 1 & 3', hours: '6:00 AM - 11:00 PM' },
    { id: 'taxi', type: 'transport', name: 'Dubai Taxi', provider: 'Dubai Taxi Agency', location: 'All terminals', hours: '24 hours' },
    { id: 'bus', type: 'transport', name: 'Public Bus', provider: 'RTA', location: 'Terminal 1 & 3', hours: '24 hours' },
    { id: 'car', type: 'transport', name: 'Car Rental', provider: 'Multiple', location: 'Arrivals Hall', hours: '24 hours' },
    { id: 'currency', type: 'financial', name: 'Currency Exchange', provider: 'Multiple', location: 'All terminals', hours: '24 hours' },
  ]
};

// Singapore Changi Airport (SIN)
const singaporeAirport: Airport = {
  id: 'sin',
  code: 'SIN',
  name: 'Singapore Changi Airport',
  city: 'Singapore',
  country: 'Singapore',
  coordinates: [103.9915, 1.3644],
  terminals: [
    {
      id: 't1',
      name: 'Terminal 1',
      gates: [
        { id: 'SIN-T1-C1', number: 'C1', coordinates: [103.9910, 1.3648], status: 'boarding' },
        { id: 'SIN-T1-C2', number: 'C2', coordinates: [103.9908, 1.3649], status: 'occupied' },
        { id: 'SIN-T1-C3', number: 'C3', coordinates: [103.9906, 1.3650], status: 'available' },
        { id: 'SIN-T1-C4', number: 'C4', coordinates: [103.9904, 1.3651], status: 'occupied' },
        { id: 'SIN-T1-C5', number: 'C5', coordinates: [103.9902, 1.3652], status: 'available' },
        { id: 'SIN-T1-C6', number: 'C6', coordinates: [103.9900, 1.3653], status: 'boarding' },
        { id: 'SIN-T1-C7', number: 'C7', coordinates: [103.9898, 1.3654], status: 'occupied' },
        { id: 'SIN-T1-C8', number: 'C8', coordinates: [103.9896, 1.3655], status: 'available' },
        { id: 'SIN-T1-C9', number: 'C9', coordinates: [103.9894, 1.3656], status: 'closed' },
        { id: 'SIN-T1-C10', number: 'C10', coordinates: [103.9892, 1.3657], status: 'occupied' },
      ],
      floors: [
        {
          id: 't1-l1',
          level: 1,
          name: 'Departures',
          features: [
            { id: 't1-check1', type: 'checkpoint', name: 'Check-in Hall', coordinates: [103.9910, 1.3648], hours: '24 hours' },
            { id: 't1-sec1', type: 'security', name: 'North Security', coordinates: [103.9908, 1.3649], hours: '24 hours' },
            { id: 't1-sec2', type: 'security', name: 'South Security', coordinates: [103.9906, 1.3650], hours: '24 hours' },
            { id: 't1-fast', type: 'security', name: 'Fast Track Lane', coordinates: [103.9904, 1.3651], hours: '5:00 AM - 11:00 PM' },
            { id: 't1-food1', type: 'food', name: 'Food Court', coordinates: [103.9902, 1.3652], hours: '24 hours' },
            { id: 't1-retail1', type: 'retail', name: 'Duty Free Shop', coordinates: [103.9900, 1.3653], hours: '24 hours' },
            { id: 't1-lounge1', type: 'lounge', name: 'SilverKris Lounge', coordinates: [103.9898, 1.3654], hours: '5:00 AM - 11:00 PM' },
          ]
        }
      ]
    },
    {
      id: 't2',
      name: 'Terminal 2',
      gates: [
        { id: 'SIN-T2-E1', number: 'E1', coordinates: [103.9950, 1.3630], status: 'boarding' },
        { id: 'SIN-T2-E2', number: 'E2', coordinates: [103.9948, 1.3631], status: 'occupied' },
        { id: 'SIN-T2-E3', number: 'E3', coordinates: [103.9946, 1.3632], status: 'available' },
        { id: 'SIN-T2-E4', number: 'E4', coordinates: [103.9944, 1.3633], status: 'occupied' },
        { id: 'SIN-T2-E5', number: 'E5', coordinates: [103.9942, 1.3634], status: 'available' },
        { id: 'SIN-T2-E6', number: 'E6', coordinates: [103.9940, 1.3635], status: 'boarding' },
        { id: 'SIN-T2-E7', number: 'E7', coordinates: [103.9938, 1.3636], status: 'occupied' },
        { id: 'SIN-T2-E8', number: 'E8', coordinates: [103.9936, 1.3637], status: 'available' },
        { id: 'SIN-T2-F1', number: 'F1', coordinates: [103.9934, 1.3638], status: 'closed' },
        { id: 'SIN-T2-F2', number: 'F2', coordinates: [103.9932, 1.3639], status: 'occupied' },
        { id: 'SIN-T2-F3', number: 'F3', coordinates: [103.9930, 1.3640], status: 'available' },
        { id: 'SIN-T2-F4', number: 'F4', coordinates: [103.9928, 1.3641], status: 'boarding' },
      ],
      floors: [
        {
          id: 't2-l1',
          level: 1,
          name: 'Departures',
          features: [
            { id: 't2-check1', type: 'checkpoint', name: 'Check-in Hall', coordinates: [103.9950, 1.3630], hours: '24 hours' },
            { id: 't2-sec1', type: 'security', name: 'North Security', coordinates: [103.9948, 1.3631], hours: '24 hours' },
            { id: 't2-sec2', type: 'security', name: 'South Security', coordinates: [103.9946, 1.3632], hours: '24 hours' },
            { id: 't2-sec3', type: 'security', name: 'Level 2 Departure Transit', coordinates: [103.9944, 1.3633], hours: '24 hours' },
            { id: 't2-garden', type: 'amenity', name: 'Sunflower Garden', coordinates: [103.9942, 1.3634], hours: '24 hours', description: 'Outdoor garden with sunflower displays' },
            { id: 't2-food1', type: 'food', name: 'Food Court', coordinates: [103.9940, 1.3635], hours: '24 hours' },
            { id: 't2-retail1', type: 'retail', name: 'Duty Free Shop', coordinates: [103.9938, 1.3636], hours: '24 hours' },
          ]
        }
      ]
    },
    {
      id: 't3',
      name: 'Terminal 3',
      gates: [
        { id: 'SIN-T3-A1', number: 'A1', coordinates: [103.9980, 1.3620], status: 'boarding' },
        { id: 'SIN-T3-A2', number: 'A2', coordinates: [103.9978, 1.3621], status: 'occupied' },
        { id: 'SIN-T3-A3', number: 'A3', coordinates: [103.9976, 1.3622], status: 'available' },
        { id: 'SIN-T3-A4', number: 'A4', coordinates: [103.9974, 1.3623], status: 'occupied' },
        { id: 'SIN-T3-A5', number: 'A5', coordinates: [103.9972, 1.3624], status: 'available' },
        { id: 'SIN-T3-A6', number: 'A6', coordinates: [103.9970, 1.3625], status: 'boarding' },
        { id: 'SIN-T3-A7', number: 'A7', coordinates: [103.9968, 1.3626], status: 'occupied' },
        { id: 'SIN-T3-A8', number: 'A8', coordinates: [103.9966, 1.3627], status: 'available' },
        { id: 'SIN-T3-B1', number: 'B1', coordinates: [103.9964, 1.3628], status: 'closed' },
        { id: 'SIN-T3-B2', number: 'B2', coordinates: [103.9962, 1.3629], status: 'occupied' },
        { id: 'SIN-T3-B3', number: 'B3', coordinates: [103.9960, 1.3630], status: 'available' },
        { id: 'SIN-T3-B4', number: 'B4', coordinates: [103.9958, 1.3631], status: 'boarding' },
      ],
      floors: [
        {
          id: 't3-l1',
          level: 1,
          name: 'Departures',
          features: [
            { id: 't3-check1', type: 'checkpoint', name: 'Check-in Hall', coordinates: [103.9980, 1.3620], hours: '24 hours' },
            { id: 't3-sec1', type: 'security', name: 'North Security', coordinates: [103.9978, 1.3621], hours: '24 hours' },
            { id: 't3-sec2', type: 'security', name: 'South Security', coordinates: [103.9976, 1.3622], hours: '24 hours' },
            { id: 't3-garden', type: 'amenity', name: 'Butterfly Garden', coordinates: [103.9974, 1.3623], hours: '24 hours', description: 'Indoor butterfly habitat' },
            { id: 't3-food1', type: 'food', name: 'Food Court', coordinates: [103.9972, 1.3624], hours: '24 hours' },
            { id: 't3-retail1', type: 'retail', name: 'Duty Free Shop', coordinates: [103.9970, 1.3625], hours: '24 hours' },
            { id: 't3-lounge1', type: 'lounge', name: 'SilverKris Lounge', coordinates: [103.9968, 1.3626], hours: '5:00 AM - 11:00 PM' },
          ]
        }
      ]
    },
    {
      id: 't4',
      name: 'Terminal 4',
      gates: [
        { id: 'SIN-T4-G1', number: 'G1', coordinates: [104.0010, 1.3610], status: 'boarding' },
        { id: 'SIN-T4-G2', number: 'G2', coordinates: [104.0008, 1.3611], status: 'occupied' },
        { id: 'SIN-T4-G3', number: 'G3', coordinates: [104.0006, 1.3612], status: 'available' },
        { id: 'SIN-T4-G4', number: 'G4', coordinates: [104.0004, 1.3613], status: 'occupied' },
        { id: 'SIN-T4-G5', number: 'G5', coordinates: [104.0002, 1.3614], status: 'available' },
        { id: 'SIN-T4-G6', number: 'G6', coordinates: [104.0000, 1.3615], status: 'boarding' },
        { id: 'SIN-T4-G7', number: 'G7', coordinates: [103.9998, 1.3616], status: 'occupied' },
        { id: 'SIN-T4-G8', number: 'G8', coordinates: [103.9996, 1.3617], status: 'available' },
      ],
      floors: [
        {
          id: 't4-l1',
          level: 1,
          name: 'Departures',
          features: [
            { id: 't4-check1', type: 'checkpoint', name: 'FAST Check-in', coordinates: [104.0010, 1.3610], hours: '24 hours', description: 'Self-service check-in system' },
            { id: 't4-sec1', type: 'security', name: 'Security Checkpoint', coordinates: [104.0008, 1.3611], hours: '24 hours' },
            { id: 't4-art1', type: 'amenity', name: 'Heritage Zone', coordinates: [104.0006, 1.3612], hours: '24 hours', description: 'Immersive cultural display' },
            { id: 't4-art2', type: 'amenity', name: 'Petalclouds', coordinates: [104.0004, 1.3613], hours: '24 hours', description: 'Kinetic sculpture' },
            { id: 't4-food1', type: 'food', name: 'Food Court', coordinates: [104.0002, 1.3614], hours: '24 hours' },
            { id: 't4-retail1', type: 'retail', name: 'Duty Free Shop', coordinates: [104.0000, 1.3615], hours: '24 hours' },
          ]
        }
      ]
    },
  ],
  amenities: [
    { id: 'wifi', type: 'connectivity', name: 'Free WiFi', location: 'All terminals', hours: '24 hours', description: 'Changi Free WiFi' },
    { id: 'garden', type: 'attraction', name: 'Butterfly Garden', location: 'Terminal 3', hours: '24 hours', description: 'Indoor butterfly habitat' },
    { id: 'sunflower', type: 'attraction', name: 'Sunflower Garden', location: 'Terminal 2', hours: '24 hours', description: 'Outdoor garden' },
    { id: 'cinema', type: 'entertainment', name: 'Free Movie Theatre', location: 'Terminals 2 & 3', hours: '24 hours' },
    { id: 'pool', type: 'recreation', name: 'Rooftop Pool', location: 'Terminal 1', hours: '6:00 AM - 12:00 AM' },
    { id: 'spa', type: 'service', name: 'Spa Facilities', location: 'All terminals', hours: '24 hours' },
  ],
  services: [
    { id: 'mrt', type: 'transport', name: 'MRT (Mass Rapid Transit)', provider: 'SMRT', location: 'Terminals 2 & 3', hours: '5:30 AM - 12:00 AM' },
    { id: 'bus', type: 'transport', name: 'Public Bus', provider: 'SBS Transit', location: 'All terminals', hours: '24 hours' },
    { id: 'taxi', type: 'transport', name: 'Taxi', provider: 'ComfortDelGro', location: 'All terminals', hours: '24 hours' },
    { id: 'car', type: 'transport', name: 'Car Rental', provider: 'Multiple', location: 'Arrivals', hours: '24 hours' },
    { id: 'skytrain', type: 'transport', name: 'Skytrain', provider: 'Changi Airport', location: 'Terminals 1, 2, 3', hours: '24 hours' },
    { id: 'shuttle', type: 'transport', name: 'Shuttle Bus to T4', provider: 'Changi Airport', location: 'All terminals', hours: '24 hours' },
  ]
};

// Amsterdam Schiphol Airport (AMS)
const amsterdamAirport: Airport = {
  id: 'ams',
  code: 'AMS',
  name: 'Amsterdam Airport Schiphol',
  city: 'Amsterdam',
  country: 'Netherlands',
  coordinates: [4.7683, 52.3105],
  terminals: [
    {
      id: 'main',
      name: 'Main Terminal',
      gates: [
        // Concourse B
        { id: 'AMS-B1', number: 'B1', coordinates: [4.7670, 52.3110], status: 'boarding' },
        { id: 'AMS-B2', number: 'B2', coordinates: [4.7668, 52.3111], status: 'occupied' },
        { id: 'AMS-B3', number: 'B3', coordinates: [4.7666, 52.3112], status: 'available' },
        { id: 'AMS-B4', number: 'B4', coordinates: [4.7664, 52.3113], status: 'occupied' },
        { id: 'AMS-B5', number: 'B5', coordinates: [4.7662, 52.3114], status: 'available' },
        // Concourse C
        { id: 'AMS-C1', number: 'C1', coordinates: [4.7660, 52.3115], status: 'boarding' },
        { id: 'AMS-C2', number: 'C2', coordinates: [4.7658, 52.3116], status: 'occupied' },
        { id: 'AMS-C3', number: 'C3', coordinates: [4.7656, 52.3117], status: 'available' },
        { id: 'AMS-C4', number: 'C4', coordinates: [4.7654, 52.3118], status: 'occupied' },
        { id: 'AMS-C5', number: 'C5', coordinates: [4.7652, 52.3119], status: 'available' },
        // Concourse D
        { id: 'AMS-D1', number: 'D1', coordinates: [4.7690, 52.3100], status: 'boarding' },
        { id: 'AMS-D2', number: 'D2', coordinates: [4.7688, 52.3101], status: 'occupied' },
        { id: 'AMS-D3', number: 'D3', coordinates: [4.7686, 52.3102], status: 'available' },
        { id: 'AMS-D4', number: 'D4', coordinates: [4.7684, 52.3103], status: 'occupied' },
        { id: 'AMS-D5', number: 'D5', coordinates: [4.7682, 52.3104], status: 'available' },
        // Concourse E
        { id: 'AMS-E1', number: 'E1', coordinates: [4.7700, 52.3090], status: 'boarding' },
        { id: 'AMS-E2', number: 'E2', coordinates: [4.7698, 52.3091], status: 'occupied' },
        { id: 'AMS-E3', number: 'E3', coordinates: [4.7696, 52.3092], status: 'available' },
        { id: 'AMS-E4', number: 'E4', coordinates: [4.7694, 52.3093], status: 'occupied' },
        { id: 'AMS-E5', number: 'E5', coordinates: [4.7692, 52.3094], status: 'available' },
        // Concourse F
        { id: 'AMS-F1', number: 'F1', coordinates: [4.7710, 52.3080], status: 'boarding' },
        { id: 'AMS-F2', number: 'F2', coordinates: [4.7708, 52.3081], status: 'occupied' },
        { id: 'AMS-F3', number: 'F3', coordinates: [4.7706, 52.3082], status: 'available' },
        { id: 'AMS-F4', number: 'F4', coordinates: [4.7704, 52.3083], status: 'occupied' },
        { id: 'AMS-F5', number: 'F5', coordinates: [4.7702, 52.3084], status: 'available' },
        // Concourse G
        { id: 'AMS-G1', number: 'G1', coordinates: [4.7720, 52.3070], status: 'boarding' },
        { id: 'AMS-G2', number: 'G2', coordinates: [4.7718, 52.3071], status: 'occupied' },
        { id: 'AMS-G3', number: 'G3', coordinates: [4.7716, 52.3072], status: 'available' },
        { id: 'AMS-G4', number: 'G4', coordinates: [4.7714, 52.3073], status: 'occupied' },
        { id: 'AMS-G5', number: 'G5', coordinates: [4.7712, 52.3074], status: 'available' },
        // Concourse H
        { id: 'AMS-H1', number: 'H1', coordinates: [4.7730, 52.3060], status: 'boarding' },
        { id: 'AMS-H2', number: 'H2', coordinates: [4.7728, 52.3061], status: 'occupied' },
        { id: 'AMS-H3', number: 'H3', coordinates: [4.7726, 52.3062], status: 'available' },
        { id: 'AMS-H4', number: 'H4', coordinates: [4.7724, 52.3063], status: 'occupied' },
        { id: 'AMS-H5', number: 'H5', coordinates: [4.7722, 52.3064], status: 'available' },
        // Concourse M
        { id: 'AMS-M1', number: 'M1', coordinates: [4.7740, 52.3050], status: 'boarding' },
        { id: 'AMS-M2', number: 'M2', coordinates: [4.7738, 52.3051], status: 'occupied' },
        { id: 'AMS-M3', number: 'M3', coordinates: [4.7736, 52.3052], status: 'available' },
        { id: 'AMS-M4', number: 'M4', coordinates: [4.7734, 52.3053], status: 'occupied' },
        { id: 'AMS-M5', number: 'M5', coordinates: [4.7732, 52.3054], status: 'available' },
      ],
      floors: [
        {
          id: 'main-l1',
          level: 1,
          name: 'Arrivals',
          features: [
            { id: 'ams-bag1', type: 'baggage', name: 'Baggage Claim Hall 1', coordinates: [4.7683, 52.3105], hours: '24 hours' },
            { id: 'ams-bag2', type: 'baggage', name: 'Baggage Claim Hall 2', coordinates: [4.7685, 52.3106], hours: '24 hours' },
            { id: 'ams-bag3', type: 'baggage', name: 'Baggage Claim Hall 3', coordinates: [4.7687, 52.3107], hours: '24 hours' },
            { id: 'ams-customs', type: 'checkpoint', name: 'Customs', coordinates: [4.7689, 52.3108], hours: '24 hours' },
          ]
        },
        {
          id: 'main-l2',
          level: 2,
          name: 'Departures',
          features: [
            { id: 'ams-check1', type: 'checkpoint', name: 'Departure Hall 1', coordinates: [4.7683, 52.3105], hours: '24 hours' },
            { id: 'ams-check2', type: 'checkpoint', name: 'Departure Hall 2', coordinates: [4.7685, 52.3106], hours: '24 hours' },
            { id: 'ams-check3', type: 'checkpoint', name: 'Departure Hall 3', coordinates: [4.7687, 52.3107], hours: '24 hours' },
            { id: 'ams-sec1', type: 'security', name: 'Security Checkpoint', coordinates: [4.7689, 52.3108], hours: '24 hours' },
            { id: 'ams-fast1', type: 'security', name: 'Fast Track Lane', coordinates: [4.7691, 52.3109], hours: '5:00 AM - 10:00 PM' },
            { id: 'ams-passport', type: 'checkpoint', name: 'Passport Control', coordinates: [4.7693, 52.3110], hours: '24 hours' },
          ]
        },
        {
          id: 'main-l3',
          level: 3,
          name: 'Lounges & Shopping',
          features: [
            { id: 'ams-food1', type: 'food', name: 'Burger King', coordinates: [4.7683, 52.3105], hours: '5:00 AM - 11:00 PM' },
            { id: 'ams-food2', type: 'food', name: 'Dutch Kitchen & Bar', coordinates: [4.7685, 52.3106], hours: '6:00 AM - 10:00 PM' },
            { id: 'ams-retail1', type: 'retail', name: 'Gucci', coordinates: [4.7687, 52.3107], hours: '6:00 AM - 10:00 PM' },
            { id: 'ams-retail2', type: 'retail', name: 'H&M', coordinates: [4.7689, 52.3108], hours: '6:00 AM - 10:00 PM' },
            { id: 'ams-lounge1', type: 'lounge', name: 'KLM Crown Lounge', coordinates: [4.7691, 52.3109], hours: '4:30 AM - 11:00 PM' },
            { id: 'ams-lounge2', type: 'lounge', name: 'oneworld Lounge', coordinates: [4.7693, 52.3110], hours: '5:00 AM - 10:00 PM' },
          ]
        }
      ]
    },
  ],
  amenities: [
    { id: 'wifi', type: 'connectivity', name: 'Free WiFi', location: 'All areas', hours: '24 hours', description: 'Schiphol Free WiFi' },
    { id: 'medical', type: 'service', name: 'Medical Centre', location: 'Main Terminal', hours: '24 hours' },
    { id: 'pharmacy', type: 'service', name: 'Pharmacy', location: 'Main Terminal', hours: '6:00 AM - 10:00 PM' },
    { id: 'prayer', type: 'service', name: 'Prayer Room', location: 'Main Terminal', hours: '24 hours' },
    { id: 'shower', type: 'service', name: 'Shower Facilities', location: 'Lounges', hours: '24 hours' },
  ],
  services: [
    { id: 'train', type: 'transport', name: 'NS Dutch Railways', provider: 'NS', location: 'Schiphol Plaza', hours: '24 hours' },
    { id: 'bus', type: 'transport', name: 'Airport Express Bus 397', provider: 'Connexxion', location: 'Schiphol Plaza', hours: '24 hours' },
    { id: 'taxi', type: 'transport', name: 'Taxi', provider: 'Schiphol Taxi', location: 'Outside arrivals', hours: '24 hours' },
    { id: 'car', type: 'transport', name: 'Car Rental', provider: 'Multiple', location: 'Schiphol Plaza', hours: '24 hours' },
    { id: 'currency', type: 'financial', name: 'Currency Exchange', provider: 'GWK Travelex', location: 'All areas', hours: '6:00 AM - 11:00 PM' },
  ]
};

// Frankfurt Airport (FRA)
const frankfurtAirport: Airport = {
  id: 'fra',
  code: 'FRA',
  name: 'Frankfurt Airport',
  city: 'Frankfurt',
  country: 'Germany',
  coordinates: [8.5706, 50.0379],
  terminals: [
    {
      id: 't1',
      name: 'Terminal 1',
      gates: [
        // Concourse A (Schengen)
        { id: 'FRA-A1', number: 'A1', coordinates: [8.5690, 50.0385], status: 'boarding' },
        { id: 'FRA-A2', number: 'A2', coordinates: [8.5688, 50.0386], status: 'occupied' },
        { id: 'FRA-A3', number: 'A3', coordinates: [8.5686, 50.0387], status: 'available' },
        { id: 'FRA-A4', number: 'A4', coordinates: [8.5684, 50.0388], status: 'occupied' },
        { id: 'FRA-A5', number: 'A5', coordinates: [8.5682, 50.0389], status: 'available' },
        // Concourse B (Schengen)
        { id: 'FRA-B1', number: 'B1', coordinates: [8.5680, 50.0390], status: 'boarding' },
        { id: 'FRA-B2', number: 'B2', coordinates: [8.5678, 50.0391], status: 'occupied' },
        { id: 'FRA-B3', number: 'B3', coordinates: [8.5676, 50.0392], status: 'available' },
        { id: 'FRA-B4', number: 'B4', coordinates: [8.5674, 50.0393], status: 'occupied' },
        { id: 'FRA-B5', number: 'B5', coordinates: [8.5672, 50.0394], status: 'available' },
        // Concourse C (Non-Schengen)
        { id: 'FRA-C1', number: 'C1', coordinates: [8.5670, 50.0395], status: 'boarding' },
        { id: 'FRA-C2', number: 'C2', coordinates: [8.5668, 50.0396], status: 'occupied' },
        { id: 'FRA-C3', number: 'C3', coordinates: [8.5666, 50.0397], status: 'available' },
        { id: 'FRA-C4', number: 'C4', coordinates: [8.5664, 50.0398], status: 'occupied' },
        { id: 'FRA-C5', number: 'C5', coordinates: [8.5662, 50.0399], status: 'available' },
        // Concourse Z (Non-Schengen)
        { id: 'FRA-Z1', number: 'Z1', coordinates: [8.5660, 50.0400], status: 'boarding' },
        { id: 'FRA-Z2', number: 'Z2', coordinates: [8.5658, 50.0401], status: 'occupied' },
        { id: 'FRA-Z3', number: 'Z3', coordinates: [8.5656, 50.0402], status: 'available' },
        { id: 'FRA-Z4', number: 'Z4', coordinates: [8.5654, 50.0403], status: 'occupied' },
        { id: 'FRA-Z5', number: 'Z5', coordinates: [8.5652, 50.0404], status: 'available' },
      ],
      floors: [
        {
          id: 't1-l1',
          level: 1,
          name: 'Arrivals',
          features: [
            { id: 'fra-bag1', type: 'baggage', name: 'Baggage Claim', coordinates: [8.5706, 50.0379], hours: '24 hours' },
            { id: 'fra-customs', type: 'checkpoint', name: 'Customs', coordinates: [8.5708, 50.0380], hours: '24 hours' },
          ]
        },
        {
          id: 't1-l2',
          level: 2,
          name: 'Departures',
          features: [
            { id: 'fra-check1', type: 'checkpoint', name: 'Check-in Hall A', coordinates: [8.5690, 50.0385], hours: '24 hours' },
            { id: 'fra-check2', type: 'checkpoint', name: 'Check-in Hall B', coordinates: [8.5680, 50.0390], hours: '24 hours' },
            { id: 'fra-sec1', type: 'security', name: 'Security Checkpoint A', coordinates: [8.5688, 50.0386], hours: '24 hours' },
            { id: 'fra-sec2', type: 'security', name: 'Security Checkpoint B', coordinates: [8.5678, 50.0391], hours: '24 hours' },
            { id: 'fra-sec3', type: 'security', name: 'Security Checkpoint C', coordinates: [8.5668, 50.0396], hours: '24 hours' },
            { id: 'fra-fast1', type: 'security', name: 'Fast Track Lane', coordinates: [8.5706, 50.0379], hours: '5:00 AM - 10:00 PM' },
            { id: 'fra-passport', type: 'checkpoint', name: 'Passport Control', coordinates: [8.5708, 50.0380], hours: '24 hours' },
          ]
        },
        {
          id: 't1-l3',
          level: 3,
          name: 'Lounges & Shopping',
          features: [
            { id: 'fra-food1', type: 'food', name: 'Hans Im Gluck', coordinates: [8.5706, 50.0379], hours: '5:00 AM - 11:00 PM' },
            { id: 'fra-retail1', type: 'retail', name: 'Duty Free Shop', coordinates: [8.5708, 50.0380], hours: '24 hours' },
            { id: 'fra-lounge1', type: 'lounge', name: 'Lufthansa First Class Lounge', coordinates: [8.5710, 50.0381], hours: '5:00 AM - 10:00 PM' },
            { id: 'fra-lounge2', type: 'lounge', name: 'Lufthansa Business Lounge', coordinates: [8.5712, 50.0382], hours: '5:00 AM - 10:00 PM' },
            { id: 'fra-lounge3', type: 'lounge', name: 'Star Alliance Lounge', coordinates: [8.5714, 50.0383], hours: '5:00 AM - 10:00 PM' },
          ]
        }
      ]
    },
    {
      id: 't2',
      name: 'Terminal 2',
      gates: [
        // Concourse D
        { id: 'FRA-D1', number: 'D1', coordinates: [8.5750, 50.0350], status: 'boarding' },
        { id: 'FRA-D2', number: 'D2', coordinates: [8.5748, 50.0351], status: 'occupied' },
        { id: 'FRA-D3', number: 'D3', coordinates: [8.5746, 50.0352], status: 'available' },
        { id: 'FRA-D4', number: 'D4', coordinates: [8.5744, 50.0353], status: 'occupied' },
        { id: 'FRA-D5', number: 'D5', coordinates: [8.5742, 50.0354], status: 'available' },
        // Concourse E
        { id: 'FRA-E1', number: 'E1', coordinates: [8.5740, 50.0355], status: 'boarding' },
        { id: 'FRA-E2', number: 'E2', coordinates: [8.5738, 50.0356], status: 'occupied' },
        { id: 'FRA-E3', number: 'E3', coordinates: [8.5736, 50.0357], status: 'available' },
        { id: 'FRA-E4', number: 'E4', coordinates: [8.5734, 50.0358], status: 'occupied' },
        { id: 'FRA-E5', number: 'E5', coordinates: [8.5732, 50.0359], status: 'available' },
      ],
      floors: [
        {
          id: 't2-l1',
          level: 1,
          name: 'Main Level',
          features: [
            { id: 't2-check1', type: 'checkpoint', name: 'Check-in Hall', coordinates: [8.5750, 50.0350], hours: '24 hours' },
            { id: 't2-sec1', type: 'security', name: 'Security Checkpoint', coordinates: [8.5748, 50.0351], hours: '24 hours' },
            { id: 't2-food1', type: 'food', name: 'Food Court', coordinates: [8.5746, 50.0352], hours: '5:00 AM - 11:00 PM' },
            { id: 't2-retail1', type: 'retail', name: 'Duty Free Shop', coordinates: [8.5744, 50.0353], hours: '24 hours' },
          ]
        }
      ]
    },
  ],
  amenities: [
    { id: 'wifi', type: 'connectivity', name: 'Free WiFi', location: 'All terminals', hours: '24 hours', description: 'FRA Free WiFi' },
    { id: 'medical', type: 'service', name: 'Medical Centre', location: 'Terminal 1', hours: '24 hours' },
    { id: 'pharmacy', type: 'service', name: 'Pharmacy', location: 'Terminal 1', hours: '6:00 AM - 10:00 PM' },
    { id: 'prayer', type: 'service', name: 'Prayer Room', location: 'All terminals', hours: '24 hours' },
    { id: 'shower', type: 'service', name: 'Shower Facilities', location: 'Lounges', hours: '24 hours' },
  ],
  services: [
    { id: 'train', type: 'transport', name: 'S-Bahn / Regional Train', provider: 'DB', location: 'Airport Regional Station', hours: '24 hours' },
    { id: 'ice', type: 'transport', name: 'ICE High-Speed Train', provider: 'DB', location: 'Airport Long-Distance Station', hours: '5:00 AM - 12:00 AM' },
    { id: 'skyline', type: 'transport', name: 'SkyLine People Mover', provider: 'Fraport', location: 'Between T1 and T2', hours: '24 hours' },
    { id: 'bus', type: 'transport', name: 'Public Bus', provider: 'RMV', location: 'Terminal 1', hours: '24 hours' },
    { id: 'taxi', type: 'transport', name: 'Taxi', provider: 'Taxi Frankfurt', location: 'Both terminals', hours: '24 hours' },
    { id: 'car', type: 'transport', name: 'Car Rental', provider: 'Multiple', location: 'Terminal 1', hours: '24 hours' },
    { id: 'currency', type: 'financial', name: 'Currency Exchange', provider: 'ReiseBank', location: 'All terminals', hours: '6:00 AM - 11:00 PM' },
  ]
};

export const airports: Airport[] = [
  atlantaAirport,
  heathrowAirport,
  dubaiAirport,
  singaporeAirport,
  amsterdamAirport,
  frankfurtAirport,
];

export const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find(airport => airport.code === code.toUpperCase());
};

export const getAirportById = (id: string): Airport | undefined => {
  return airports.find(airport => airport.id === id.toLowerCase());
};
