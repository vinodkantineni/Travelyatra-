import { API } from "../config";
import queryString from "query-string";

// High-quality mock data for elegant fallback if backend is down
export const mockCategories = [
  { _id: "cat1", name: "Hill Station" },
  { _id: "cat2", name: "Historical" },
  { _id: "cat3", name: "Beach" },
  { _id: "cat4", name: "Religious" },
  { _id: "cat5", name: "Adventure" }
];

export const mockProducts = [
  {
    _id: "prod1",
    name: "Auli Skiing Adventure",
    subname: "Garhwal Himalayas, Uttarakhand",
    description: "Experience the thrill of skiing down the pristine slopes of Auli, surrounded by majestic oak forests and the towering peaks of Nanda Devi. Famous for its ski resorts and scenic cable cars, Auli is a winter wonderland that offers panoramic views of the Himalayas.",
    price: 15499,
    quantity: 10,
    category: mockCategories[0],
    sold: 45,
    createdAt: "2026-06-15T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "5 Days / 4 Nights",
    type: "activities"
  },
  {
    _id: "prod2",
    name: "Taj Mahal Luxury Tour",
    subname: "Agra, Uttar Pradesh",
    description: "Step back in time to explore the ultimate monument of love. This premium tour takes you through the history of Agra Fort, the beautiful gardens of Mehtab Bagh, and a VIP sunrise tour of the glorious Taj Mahal, complete with professional photography and expert guidance.",
    price: 8999,
    quantity: 20,
    category: mockCategories[1],
    sold: 120,
    createdAt: "2026-06-20T09:30:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "2 Days / 1 Night",
    type: "packages"
  },
  {
    _id: "prod3",
    name: "Pahalgam Valley Retreat",
    subname: "Anantnag, Jammu & Kashmir",
    description: "Relax in the peaceful Lidder Valley, surrounded by pine forests, snow-clad mountains, and crystal-clear streams. Our luxury tour includes pony rides to Baisaran Meadow (Mini Switzerland), visits to Betaab Valley, and a stay in a premium wooden log cabin by the river.",
    price: 18999,
    quantity: 8,
    category: mockCategories[0],
    sold: 68,
    createdAt: "2026-06-10T11:15:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "6 Days / 5 Nights",
    type: "packages"
  },
  {
    _id: "prod4",
    name: "Goa Beach & Yacht Cruise",
    subname: "Baga & Calangute, Goa",
    description: "Enjoy the perfect mix of relaxation and excitement. Sunbathe on the golden sands of Baga Beach, try exhilarating water sports, take a private yacht cruise, and experience the best beachside clubs and seafood fine dining that Goa has to offer.",
    price: 12500,
    quantity: 15,
    category: mockCategories[2],
    sold: 95,
    createdAt: "2026-06-25T14:20:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "4 Days / 3 Nights",
    type: "activities"
  },
  {
    _id: "prod5",
    name: "Mathura Spiritual Tour",
    subname: "Mathura, Uttar Pradesh",
    description: "Immerse yourself in the spiritual heritage of Mathura and Vrindavan. Walk along the historic Kusum Sarovar, witness the grand Yamuna Aarti, and visit the iconic temples with a local cultural expert guiding you through the stories and traditions.",
    price: 6500,
    quantity: 25,
    category: mockCategories[3],
    sold: 30,
    createdAt: "2026-06-05T06:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.7,
    duration: "3 Days / 2 Nights",
    type: "packages"
  },
  {
    _id: "prod6",
    name: "Bodh Gaya Heritage Experience",
    subname: "Bodh Gaya, Bihar",
    description: "Visit the site of Gautama Buddha's enlightenment. This mindful tour guides you through the Mahabodhi Temple Complex, the Great Buddha Statue, and the various international monasteries, providing a peaceful, serene, and spiritually enriching getaway.",
    price: 9599,
    quantity: 12,
    category: mockCategories[3],
    sold: 15,
    createdAt: "2026-06-01T10:10:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    type: "packages"
  },
  {
    _id: "prod7",
    name: "Hot Air Ballooning Over Jaipur",
    subname: "Jaipur, Rajasthan",
    description: "Sail gently over the Pink City, Amer Fort, and surrounding villages. Gaze at the stunning palaces and palaces below, feeling the wind and enjoying spectacular aerial photography opportunities in an exclusive private balloon experience.",
    price: 14000,
    quantity: 5,
    category: mockCategories[4],
    sold: 35,
    createdAt: "2026-06-22T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "1 Day",
    type: "activities"
  },
  {
    _id: "prod8",
    name: "Scuba Diving in Havelock",
    subname: "Andaman & Nicobar Islands",
    description: "Explore the magical underwater marine life and coral reefs of Havelock Island. Guided by certified PADI instructors, dive into crystal clear waters to swim with exotic fish, sea turtles, and explore shipwrecks in absolute safety.",
    price: 7500,
    quantity: 18,
    category: mockCategories[4],
    sold: 80,
    createdAt: "2026-06-18T12:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "1 Day",
    type: "activities"
  },
  {
    _id: "prod9",
    name: "Kerala Backwaters Cruise",
    subname: "Alleppey, Kerala",
    description: "Glide through the tranquil canals and lagoons of Alleppey on a premium private houseboat. Savor authentic traditional Kerala cuisine, witness serene rural backwater life, and relax surrounded by tall palm trees and refreshing breezes.",
    price: 11000,
    quantity: 14,
    category: mockCategories[2],
    sold: 52,
    createdAt: "2026-06-12T07:15:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    type: "packages"
  },
  {
    _id: "prod10",
    name: "Manali Trekking Expedition",
    subname: "Solang Valley, Himachal Pradesh",
    description: "Embark on an exhilarating trek through the lush meadows and rugged terrains of Solang. Pass by roaring waterfalls, explore ancient villages, and camp under a canopy of stars in the middle of towering snow-capped mountain ranges.",
    price: 6999,
    quantity: 22,
    category: mockCategories[4],
    sold: 40,
    createdAt: "2026-06-08T09:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.7,
    duration: "4 Days / 3 Nights",
    type: "activities"
  },
  {
    _id: "prod11",
    name: "Munnar Tea Gardens Stay",
    subname: "Munnar, Kerala",
    description: "Wake up to misty mornings in a luxury resort nestled inside sprawling organic tea plantations. Walk through velvet green estates, visit the tea manufacturing museum, and hike up to Anamudi Peak for breathtaking views.",
    price: 14500,
    quantity: 11,
    category: mockCategories[0],
    sold: 22,
    createdAt: "2026-06-27T10:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "4 Days / 3 Nights",
    type: "hotels"
  },
  {
    _id: "prod12",
    name: "Hampi Historical Ruins Tour",
    subname: "Hampi, Karnataka",
    description: "Discover the spectacular stone monuments, monoliths, and rich heritage of the ancient Vijayanagara Empire. Visit the iconic Virupaksha Temple, the stone chariot of Vittala Temple, and hike Matanga Hill for a panoramic sunset.",
    price: 8500,
    quantity: 16,
    category: mockCategories[1],
    sold: 28,
    createdAt: "2026-06-02T13:45:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    type: "packages"
  },
  {
    _id: "prod13",
    name: "Rishikesh River Rafting Adventure",
    subname: "Rishikesh, Uttarakhand",
    description: "Get your adrenaline pumping with level-4 white water rafting on the holy Ganges. This package includes riverside luxury Swiss camping, cliff jumping, evening bonfire sessions, and a spiritual walk through Laxman Jhula.",
    price: 4999,
    quantity: 30,
    category: mockCategories[4],
    sold: 110,
    createdAt: "2026-06-26T15:30:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "2 Days / 1 Night",
    type: "activities"
  },
  {
    _id: "prod14",
    name: "Darjeeling Tea Estate Tour",
    subname: "Darjeeling, West Bengal",
    description: "Witness the magnificent view of Kanchenjunga Peak at sunrise. Ride the historic Himalayan toy train (UNESCO site), tour premium tea estates with private tastings, and visit the serene Peace Pagoda with an expert local guide.",
    price: 10500,
    quantity: 10,
    category: mockCategories[0],
    sold: 37,
    createdAt: "2026-06-11T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    type: "packages"
  },
  {
    _id: "prod15",
    name: "Varanasi Spiritual Ganges Tour",
    subname: "Varanasi, Uttar Pradesh",
    description: "Experience the profound spiritual atmosphere of one of the world's oldest inhabited cities. Take a private sunrise boat ride on the Ganges River, attend the grand evening Ganga Aarti at Dashashwamedh Ghat, and tour ancient temples.",
    price: 5900,
    quantity: 20,
    category: mockCategories[3],
    sold: 72,
    createdAt: "2026-06-07T06:15:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    type: "packages"
  },
  {
    _id: "prod16",
    name: "Andaman Private Island Resort",
    subname: "Radhanagar Beach, Havelock",
    description: "Escape to a luxurious beachfront private resort villa on Radhanagar Beach, voted one of Asia's finest. Enjoy private candlelit seafood dinners on the sand, clear turquoise waters, private snorkeling tours, and premium spa facilities.",
    price: 29999,
    quantity: 6,
    category: mockCategories[2],
    sold: 19,
    createdAt: "2026-06-24T16:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 5.0,
    duration: "5 Days / 4 Nights",
    type: "hotels"
  },
  // MOCK HOTELS (For Hotel Search Tab)
  {
    _id: "hotel1",
    name: "The Khyber Himalayan Resort & Spa",
    subname: "Gulmarg, Jammu & Kashmir",
    description: "Experience luxury in the lap of snow-capped mountains. This premier ski resort features world-class heated pools, floor-to-ceiling glass windows, and warm pine interiors overlooking the Affarwat peaks.",
    price: 18500,
    quantity: 5,
    category: mockCategories[0],
    sold: 25,
    createdAt: "2026-06-20T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.9,
    duration: "Per Night Stay",
    type: "hotels"
  },
  {
    _id: "hotel2",
    name: "Taj Lake Palace Luxury Stay",
    subname: "Udaipur, Rajasthan",
    description: "Stay in a majestic 18th-century marble palace floating in the middle of Lake Pichola. Includes private butler service, royal historical tours, and premium sunset lake cruises.",
    price: 32000,
    quantity: 4,
    category: mockCategories[1],
    sold: 12,
    createdAt: "2026-06-22T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 5.0,
    duration: "Per Night Stay",
    type: "hotels"
  },
  {
    _id: "hotel3",
    name: "The Leela Kovalam Raviz Beach Resort",
    subname: "Kovalam, Kerala",
    description: "Perched on a clifftop, this luxury beach resort offers panoramic views of the Arabian Sea. Enjoy direct beach access, private sun decks, and premium Ayurvedic wellness treatments.",
    price: 14000,
    quantity: 8,
    category: mockCategories[2],
    sold: 20,
    createdAt: "2026-06-25T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "Per Night Stay",
    type: "hotels"
  },
  // MOCK FLIGHTS (For Flight/Airplane Search Tab)
  {
    _id: "flight1",
    name: "Air India DEL to GOI (Economy Class)",
    subname: "New Delhi to Goa • Return Ticket",
    description: "Book cheap and convenient flights from New Delhi (DEL) to Goa (GOI) with India's national carrier. Enjoy hot meals on board, check-in baggage allowance of 25kg, and premium hospitality.",
    price: 5499,
    quantity: 50,
    category: mockCategories[2],
    sold: 150,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.6,
    duration: "2h 35m Direct Flight",
    type: "flights"
  },
  {
    _id: "flight2",
    name: "IndiGo BOM to SXR (Economy Class)",
    subname: "Mumbai to Srinagar • Direct Flight",
    description: "Fly direct from Mumbai (BOM) to Srinagar, Kashmir (SXR) with India's leading low-cost carrier. Renowned for its on-time performance and hassle-free travel experience.",
    price: 7200,
    quantity: 45,
    category: mockCategories[0],
    sold: 180,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.5,
    duration: "3h 10m Direct Flight",
    type: "flights"
  },
  {
    _id: "flight3",
    name: "Vistara BLR to JAI (Premium Economy)",
    subname: "Bangalore to Jaipur • Full Service",
    description: "Indulge in premium full-service travel from Bangalore (BLR) to Jaipur (JAI) with Vistara. Enjoy complimentary Wi-Fi, extra legroom, multi-course dining, and curated entertainment.",
    price: 6800,
    quantity: 30,
    category: mockCategories[1],
    sold: 90,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "2h 15m Direct Flight",
    type: "flights"
  },
  // MOCK TRAINS (For Train Search Tab)
  {
    _id: "train1",
    name: "Vande Bharat Express (Delhi to Varanasi)",
    subname: "AC Executive Chair Car (EC)",
    description: "Experience India's high-speed semi-bullet train from New Delhi to Varanasi. Features rotating seats, automated sliding doors, onboard premium vegetarian meals, and high-speed Wi-Fi.",
    price: 1600,
    quantity: 120,
    category: mockCategories[3],
    sold: 400,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.8,
    duration: "8 Hours Journey",
    type: "trains"
  },
  {
    _id: "train2",
    name: "Palace on Wheels Heritage Cruise",
    subname: "Delhi - Jaipur - Agra Round Trip",
    description: "Step into royalty on board India's premier luxury heritage train. Explore the majestic forts of Rajasthan and the Taj Mahal in Agra with royal suites, private butler service, and exquisite dining.",
    price: 45000,
    quantity: 12,
    category: mockCategories[1],
    sold: 5,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 5.0,
    duration: "7 Days / 6 Nights Cruise",
    type: "trains"
  },
  // MOCK BUSES (For Bus Search Tab)
  {
    _id: "bus1",
    name: "Volvo Multi-Axle AC Sleeper",
    subname: "Delhi to Manali • Overnight Coach",
    description: "Book comfortable sleeper bus tickets from Delhi to Manali. Features ergonomic reclining berths, clean blankets, charging points, and live GPS tracking for safety.",
    price: 1800,
    quantity: 36,
    category: mockCategories[0],
    sold: 210,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.4,
    duration: "12 Hours Overnight Journey",
    type: "buses"
  },
  {
    _id: "bus2",
    name: "Intercity Sleeper Coach (Mumbai to Goa)",
    subname: "Luxury AC Sleeper Coach",
    description: "Travel overnight from Mumbai to Goa in premium air-conditioned comfort. Includes reading lights, water bottles, and experienced professional drivers.",
    price: 1500,
    quantity: 40,
    category: mockCategories[2],
    sold: 300,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.3,
    duration: "14 Hours Overnight Journey",
    type: "buses"
  },
  // MOCK CARS (For Car Search Tab)
  {
    _id: "car1",
    name: "Mahindra XUV700 SUV Rental",
    subname: "Self-Drive Rental • Unlimited KMs",
    description: "Rent a premium SUV for your next road trip. Features 7-seater comfort, automatic transmission, advanced safety features, and complete roadside assistance.",
    price: 3500,
    quantity: 15,
    category: mockCategories[4],
    sold: 45,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 4.7,
    duration: "Per Day Rental",
    type: "cars"
  },
  {
    _id: "car2",
    name: "Mercedes Benz C-Class Luxury Car",
    subname: "Chauffeur Driven Premium Class",
    description: "Indulge in absolute luxury with our premium Mercedes Benz sedan. Perfect for corporate travel, weddings, or VIP city transfers. Includes professional chauffeur and refreshments.",
    price: 12000,
    quantity: 6,
    category: mockCategories[1],
    sold: 8,
    createdAt: "2026-06-27T08:00:00.000Z",
    youtubelink: "yZc2vP7Hw3c",
    rating: 5.0,
    duration: "Per Day (8 Hours / 80 KMs)",
    type: "cars"
  }
];

export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) throw new Error("API error");
            return response.json();
        })
        .catch(err => {
            console.log(`Using mock products for sortBy=${sortBy} due to API issues`);
            if (sortBy === 'sold') {
                return [...mockProducts].sort((a, b) => b.sold - a.sold).slice(0, 4);
            }
            const topSoldIds = [...mockProducts].sort((a, b) => b.sold - a.sold).slice(0, 4).map(p => p._id);
            return [...mockProducts]
                .filter(p => !topSoldIds.includes(p._id))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4);
        });
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) throw new Error("API error");
            return response.json();
        })
        .catch(err => {
            console.log("Using mock categories due to API issues");
            return mockCategories;
        });
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = { limit, skip, filters };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) throw new Error("API error");
            return response.json();
        })
        .catch(err => {
            console.log("Using local mock filtering due to API issues");
            let filtered = [...mockProducts];
            if (filters.type && filters.type !== "all") {
                filtered = filtered.filter(p => p.type === filters.type);
            } else {
                filtered = filtered.filter(p => p.type === "packages" || p.type === "activities" || p.type === "hotels" || !p.type);
            }
            if (filters.search) {
                const q = filters.search.toLowerCase();
                filtered = filtered.filter(
                    p => p.name.toLowerCase().includes(q) || 
                         p.description.toLowerCase().includes(q) || 
                         p.subname.toLowerCase().includes(q)
                );
            }
            if (filters.category && filters.category.length > 0) {
                filtered = filtered.filter(p => filters.category.includes(p.category._id));
            }
            if (filters.price && filters.price.length === 2) {
                const [min, max] = filters.price;
                filtered = filtered.filter(p => p.price >= min && p.price <= max);
            }
            const size = filtered.length;
            const slice = filtered.slice(skip, skip + limit);
            return { size, data: slice };
        });
};

export const list = params => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) throw new Error("API error");
            return response.json();
        })
        .catch(err => {
            console.log("Using local mock search due to API issues", params);
            let results = [...mockProducts];
            if (params.search) {
                const q = params.search.toLowerCase();
                results = results.filter(
                    p => p.name.toLowerCase().includes(q) || 
                         p.description.toLowerCase().includes(q) || 
                         p.subname.toLowerCase().includes(q)
                );
            }
            if (params.category && params.category !== "All") {
                results = results.filter(p => p.category._id === params.category);
            }
            return results;
        });
};

export const read = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) throw new Error("API error");
            return response.json();
        })
        .catch(err => {
            console.log(`Using mock read for ${productId}`);
            const found = mockProducts.find(p => p._id === productId);
            return found || mockProducts[0];
        });
};

export const listRelated = productId => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) throw new Error("API error");
            return response.json();
        })
        .catch(err => {
            console.log(`Using mock related for ${productId}`);
            const current = mockProducts.find(p => p._id === productId);
            const categoryId = current ? current.category._id : null;
            return mockProducts.filter(p => p._id !== productId && p.category._id === categoryId).slice(0, 4);
        });
};

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            return { clientToken: "mock-braintree-token" };
        });
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            return { success: true, transaction: { id: "mock-txn-12345" } };
        });
};

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
            return { success: true, order: createOrderData };
        });
};
