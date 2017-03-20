const tourData = [
   {
      "country":"india",
      "region":"east india",
      "title":"In the land of tigers",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2016/11/12088-tiger-resting-1680x1050-animal-wallpaper-640x348.jpg",
      "days":11,
      "cost":2000,
      "popular":true,
      "description":"This wild encounter takes you deep into classic Rudyard Kipling territory where you can unwind in exquisite safari lodges and experience the best tiger safaris at…"
   },
   {
      "country":"india",
      "region":"south india",
      "title":"North and South Special",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2016/01/Alleppy-Spice-Coast-1600-640x348.jpg",
      "days":7,
      "cost":3000,
      "popular":true,
      "description":"Discover the very best of North and South India with this exclusively enchanting itinerary, which includes stays in old palaces, rural villages and amidst spice plantations."
   },
   {
      "country":"india",
      "region":"north india",
      "title":"Himalayan Heights",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/05/nepal-kathmandu-1-640x348.jpg",
      "days":21,
      "cost":10000,
      "popular":false,
      "description":"Travel to the Himalayas and be enchanted by beautiful natural landscapes. With so many cultural treasures to discover during this India and Nepal tour, complete…"
   },
   {
      "country":"india",
      "region":"south india",
      "title":"South India's hidden jewel",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/05/Hampi-640x348.jpg",
      "days":14,
      "cost":4578,
      "popular":true,
      "description":"From the lost civilizations of Hampi and the tranquil coffee plantations of the Western Ghats to the temples and caves of Badami, this trip is…"
   },
   {
      "country":"india",
      "region":"south india",
      "title":"Backwaters of kerala",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/05/alleppey-1-640x348.jpg",
      "days":10,
      "cost":20000,
      "popular":false,
      "description":"From gorgeous tea and spice plantations to palm-lined backwaters, your private Kerala tour offers a glimpse into God’s Own Country, where there’s always a fresh…"
   },
   {
      "country":"india",
      "region":"south india",
      "title":"Spotlight of south india",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/10/English-Guest-Sharon-and-Kate-Manera-Alleppey-India-Enchanting-Travels-640x348.jpg",
      "days":5,
      "cost":2050,
      "popular":false,
      "description":"This South India tour is brimming with variety and many extraordinary gems for you to enjoy. Relax on the beach, wander colonial streets or simply…"
   },
   {
      "country":"india",
      "region":"north india",
      "title":"Spritual north india",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/05/varanasi-2-640x348.jpg",
      "days":14,
      "cost":3750,
      "popular":true,
      "description":"Let your India holiday take you on a spiritual journey to holy cities and sublime works of art. From pristine Rishikesh to the Aarti light…"
   },
   {
      "country":"india",
      "region":"north india",
      "title":"Golden triangle Ladakh",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/06/leh-1-640x348.jpg",
      "days":21,
      "cost":4750,
      "popular":true,
      "description":"Taking in the crisp colors of Himalayan scenery, Ladakh tours are arguably the most mesmerizing in India! You will be delighted by the majestic mountains,…"
   },
   {
      "country":"india",
      "region":"east india",
      "title":"Golden triangle of India",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/06/golden-triangle-india-640x348.jpg",
      "days":8,
      "cost":1700,
      "popular":false,
      "description":"Explore India’s bustling cities and visit the breathtaking Taj Mahal on this classic Golden Triangle tour, brimming with color and culture! This is an ideal…"
   },
   {
      "country":"africa",
      "region":"kenya",
      "title":"Kenya - Untouched Wilderness",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2016/06/cheetah-savanna-africa-savannah-cheetah-predator-look-640x348.jpg",
      "days":11,
      "cost":9250,
      "popular":false,
      "description":"Experience the true wild in Ruaha, enjoy exciting bush walks and boat safaris in Africa’s largest game reserve and discover hidden gems at Selous. In Ras Kutani, your perfect…"
   },
   {
      "country":"africa",
      "region":"tanzania",
      "title":"Tanzania - Untouched Wilderness & Wildlife",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/04/Africa-Tanzania-Rubondo-Island-Tourism-640x348.jpg",
      "days":10,
      "cost":10100,
      "popular":false,
      "description":"Wonder at the vast magnificence of Lake Victoria, get up close and personal with the wildlife in Serengeti and let Rubondo Island National Park take…"
   },
   {
      "country":"africa",
      "region":"tanzania",
      "title":"Tanzania - Untouched Wilderness & Wildlife",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/04/Africa-Tanzania-Rubondo-Island-Tourism-640x348.jpg",
      "days":10,
      "cost":10100,
      "popular":true,
      "description":"Wonder at the vast magnificence of Lake Victoria, get up close and personal with the wildlife in Serengeti and let Rubondo Island National Park take…"
   },
   {
      "country":"africa",
      "region":"kenya",
      "title":"Kenya- Wear few tread",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/05/kenya-nairobi-1-640x348.jpg",
      "days":11,
      "cost":7100,
      "popular":false,
      "description":"Discover nature’s raw beauty with this unique walking safari in Kenya! This carefully curated private trip allows you to tread off-the-beaten-path. Witness rare species of…"
   },
   {
      "country":"africa",
      "region":"kenya",
      "title":"Kenya- Walking Safari and beach",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2016/04/Mara-Fly-Camping-640x348.jpg",
      "days":12,
      "cost":7300,
      "popular":true,
      "description":"This unique Kenya itinerary perfectly combines the main Masai Mara Game Reserve with a more exclusive conservancy in Naboisho, where you can head out on…"
   },
   {
      "country":"africa",
      "region":"namibia",
      "title":"Classic tour of Namibia",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2016/01/Namibia-Sossuvlei-1600-640x348.jpg",
      "days":13,
      "cost":3600,
      "popular":false,
      "description":"Experience the diverse beauty with this classic tour of Namibia, from witnessing nature in the national parks of Waterberg and Etosha and discovering rugged landscapes to…"
   },
   {
      "country":"africa",
      "region":"south africa",
      "title":"Grand tour of south africa",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/05/africa-south-africa-port-elizabeth-addo-elephants-640x348.jpg",
      "days":24,
      "cost":6400,
      "popular":true,
      "description":"You’ll be amazed by the variety when you travel Southern Africa! This unique grand tour takes in the best of the region, where you can…"
   },
   {
      "country":"africa",
      "region":"south africa",
      "title":"South African Highlights",
      "image":"http://www.enchantingtravels.com/wp-content/uploads/2015/05/Zambia-VictoriaFalls-1-640x348.jpg",
      "days":16,
      "cost":7400,
      "popular":true,
      "description":"Discover the Cape Winelands, Africa’s most famous wine growing region, delve into the stunning African wilderness on an exciting safari, and experience the impressive Victoria…"
   }
];
export default tourData;