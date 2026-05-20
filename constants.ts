export const HERO_IMAGE_URL = "/IMG_9203.JPEG";

const COMMON_DETAILS = {
  couple: {
    partner1: "Defne",
    partner2: "Onat",
  },
  location: {
    venue: "Vual Urla",
    address: "İskele Mahallesi, 2018/9 Sokak, No: 4, Urla/İzmir, Türkiye",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Vual+Urla+Izmir",
  },
};

const mapSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

// Placeholder until real photos are dropped in. Keep the `keywords` argument
// (kept as a hint for which photo to source later) but return an empty string so
// the GuideRow component renders an elegant styled placeholder instead.
// To use a real photo, replace `flickr("...")` with the photo URL directly.
const flickr = (_keywords: string) => "";

// Build a stable URL to a Wikimedia Commons image at a given width.
// Uses Special:FilePath which 302-redirects to the appropriate /thumb/ URL.
// Example: commons("Library_of_Celsus_side_view.jpg") -> a ~900px JPG of the
// Library of Celsus. All images sourced this way are CC-licensed; see the
// Commons file page for attribution.
const commons = (filename: string, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;

// Stable random placeholder photo, keyed by `slug`. Each slug always renders
// the same image, so the layout doesn't shuffle on refresh.
//
// To bring your own photo for a given entry:
//   1. Drop a file at `public/images/<slug>.jpg` (or `.webp`/`.png`).
//   2. Replace `foodImage("bizim-lokanta")` with `"/images/bizim-lokanta.jpg"`.
// The slug is also used as the filename hint, so search the meta arrays below
// for the matching slug.
const foodImage = (slug: string) =>
  `https://picsum.photos/seed/food-${slug}/900/600`;
const placeImage = (slug: string) =>
  `https://picsum.photos/seed/place-${slug}/900/600`;
const dayTripImage = (slug: string) =>
  `https://picsum.photos/seed/daytrip-${slug}/900/600`;

// Language-independent metadata for each Izmir guide item.
// EN and TR sections below provide the localized name/description in matching order.
// Ordered by proximity to Konak/Kemeraltı, moving outward through Alsancak,
// across the bay to Karsıyaka/Bostanlı, then east to Bornova, and finally the
// Urla peninsula. Coords and mapLinks resolved from actual Google Maps profiles.
const IZMIR_FOOD_META = [
  // --- Kemeraltı / Konak ---
  { whereName: "Kemeraltı", coords: [38.4181058, 27.1296162] as [number, number], mapLink: "https://maps.app.goo.gl/mSYHiZ8gywt9FsJy7", image: "/images/can-doner-1981.jpg", imageAlt: "Can Döner 1981 — İskender" },
  { whereName: "Kemeraltı", coords: [38.416811, 27.1311] as [number, number], mapLink: "https://maps.app.goo.gl/FXg2ppXKdcrHAMwS9", image: "/images/deger-sogus.jpg", imageAlt: "Değer Söğüş — kelle söğüş" },
  { whereName: "Kemeraltı", coords: [38.4191801, 27.1328546] as [number, number], mapLink: "https://maps.app.goo.gl/LyMH8PQCQCUQBTrM8", image: "/images/doyuran-manisa-kebap.jpg", imageAlt: "Doyuran — Manisa kebap" },
  { whereName: "Kemeraltı", coords: [38.4215451, 27.1316678] as [number, number], mapLink: "https://maps.app.goo.gl/Q8JvgfecXL6HHRwU6", image: "/images/kumrucu-apo.jpg", imageAlt: "Kumrucu Apo — kumru sandwich" },
  { whereName: "Kemeraltı", coords: [38.4213087, 27.1340115] as [number, number], mapLink: "https://maps.app.goo.gl/Dfw5jruEZ3k6NqH56", image: "/images/kahveci-necco.webp", imageAlt: "Kahveci Necco — Turkish coffee" },
  { whereName: "Kemeraltı", coords: [38.4218664, 27.1331221] as [number, number], mapLink: "https://maps.app.goo.gl/XvcxD5QoGhYcJZUT6", image: "/images/hisaronu-sambalicisi.jpeg", imageAlt: "Meshur Hisarönü Sambalicisi — sambali" },
  { whereName: "Kemeraltı", coords: [38.4221186, 27.1334561] as [number, number], mapLink: "https://maps.app.goo.gl/dKsFwChHk6TyZtLY8", image: "/images/hisaronu-sut-tatlilari.jpg", imageAlt: "Hisarönü Süt Tatlıları — kazandibi" },
  { whereName: "Kemeraltı", coords: [38.4210278, 27.1362016] as [number, number], mapLink: "https://maps.app.goo.gl/hRcDqmicfX6UG9St9", image: "/images/oztat-kardesler.jpg", imageAlt: "Öztat Kardesler — lokma" },
  // --- Kordon / Alsancak ---
  { whereName: "Kordon", coords: [38.4337554, 27.1383666] as [number, number], mapLink: "https://maps.app.goo.gl/UGN2eY1Qnf58QGSb7", image: "/images/birinci-kordon-balik.webp", imageAlt: "Birinci Kordon Balık — fish" },
  { whereName: "Alsancak", coords: [38.4328265, 27.1415692] as [number, number], mapLink: "https://maps.app.goo.gl/xNEYNVfTKhtT1nKz5", image: "/images/balmumu-lokanta.jpg", imageAlt: "Balmumu Dükkan Lokanta — Turkish home cooking" },
  { whereName: "Alsancak", coords: [38.43453, 27.14458] as [number, number], mapLink: "https://maps.app.goo.gl/pQN6Qx9itdyJ1NsVA", image: "/images/kasap-fuat.jpg", imageAlt: "Kasap Fuat — steakhouse" },
  { whereName: "Alsancak", coords: [38.4384435, 27.1450734] as [number, number], mapLink: "https://maps.app.goo.gl/cfa6azYzoUi9PM6R6", image: "/images/zeynel-ergin-boyoz.webp", imageAlt: "Zeynel Ergin Gevrek Fırını — boyoz" },
  { whereName: "Alsancak", coords: [38.4406279, 27.142689] as [number, number], mapLink: "https://maps.app.goo.gl/fxwT9w6uVKCEB75K7", image: "/images/tavaci-recep-usta.jpg", imageAlt: "Tavacı Recep Usta — kaburga dolması" },
  { whereName: "Alsancak", coords: [38.4411988, 27.1440192] as [number, number], mapLink: "https://maps.app.goo.gl/1B5uwhxBrFse3Vj3A", image: "/images/celebi-unlu-mamuller.webp", imageAlt: "Çelebi Unlu Mamuller — İzmir Bomba" },
  // --- Karsıyaka / Bostanlı (across the bay) ---
  { whereName: "Karsıyaka", coords: [38.4544565, 27.1061566] as [number, number], mapLink: "https://maps.app.goo.gl/dUNkGZ7VcsAAVB6o6", image: "/images/im-bread.png", imageAlt: "I'm Bread — sourdough" },
  { whereName: "Bostanlı", coords: [38.4561026, 27.1006055] as [number, number], mapLink: "https://maps.app.goo.gl/ppqmYFd55XCyw5sp7", image: "/images/morisi.jpg", imageAlt: "Morisi Kahvaltı — serpme breakfast" },
  { whereName: "Bostanlı", coords: [38.459128, 27.097748] as [number, number], mapLink: "https://maps.app.goo.gl/36CR1vXz3Krh6joD9", image: "/images/filozof-bostanli.webp", imageAlt: "Filozof Bostanlı — serpme breakfast" },
  // --- Bornova (east) ---
  { whereName: "Bornova", coords: [38.4323306, 27.1808698] as [number, number], mapLink: "https://maps.app.goo.gl/ef96y3PgMRyv8jqV7", image: "/images/zaim-usta.webp", imageAlt: "Zaim Usta — home-style stews" },
  { whereName: "Bornova", coords: [38.441197, 27.185813] as [number, number], mapLink: "https://maps.app.goo.gl/iPPkh8MQfCDnoFnE8", image: "/images/kofteci-tamer.png", imageAlt: "Köfteci Tamer — köfte" },
  { whereName: "Bornova", coords: [38.4408593, 27.1991461] as [number, number], mapLink: "https://maps.app.goo.gl/JVZyG2AF3e5syVPMA", image: "/images/kokorecci-asim-usta.jpg", imageAlt: "Kokoreççi Asım Usta — kokoreç" },
  { whereName: "Bornova", coords: [38.4507696, 27.2019164] as [number, number], mapLink: "https://maps.app.goo.gl/5bd4t8nnA2HHBmaD9", image: "/images/pod-coffee.jpg", imageAlt: "Pod Coffee & Eatery — third wave" },
  // --- Urla peninsula (west) ---
  { whereName: "Urla", coords: [38.3447305, 26.7610126] as [number, number], mapLink: "https://maps.app.goo.gl/kfErA1HRCfUfcC9n9", image: "/images/od-urla.jpg", imageAlt: "OD Urla — Michelin star" },
  { whereName: "Urla", coords: [38.3221421, 26.7669469] as [number, number], mapLink: "https://maps.app.goo.gl/98zX9DEnyitimYDo8", image: "/images/begendik-abi.jpeg", imageAlt: "Beğendik Abi Urla — esnaf lokantası" },
  { whereName: "Urla", coords: [38.300939, 26.7511389] as [number, number], mapLink: "https://maps.app.goo.gl/tzk7zmvXC8P1koWY7", image: "/images/levan-urla.jpg", imageAlt: "Levan — modern Turkish" },
  { whereName: "Urla", coords: [38.2810156, 26.7468237] as [number, number], mapLink: "https://maps.app.goo.gl/v3oNnJ5crSHBR86Z6", image: "/images/vino-locale.jpg", imageAlt: "Urla Vino Locale — two Michelin stars" },
  { whereName: "Urla", coords: [38.2517765, 26.7388844] as [number, number], mapLink: "https://maps.app.goo.gl/QA6XJkQeZhYzsUw27", image: "/images/teruar-urla.jpg", imageAlt: "TERUAR URLA — Michelin star" },
];

const IZMIR_PLACES_META = [
  { whereName: "Kemeraltı Çarsısı", coords: [38.4178, 27.1293] as [number, number], mapLink: mapSearch("Kemeraltı Çarsısı İzmir"), image: commons("Hisar_Camii.jpg"), imageAlt: "Kemeraltı bazaar" },
  { whereName: "Tarihi Asansör", coords: [38.4109, 27.1283] as [number, number], mapLink: mapSearch("Tarihi Asansör Karatas İzmir"), image: commons("Asansor_From_Ground_Level_Izmir_Turkey.jpg"), imageAlt: "Historic Karatas Elevator" },
  { whereName: "Saat Kulesi & Konak Meydanı", coords: [38.4189, 27.1287] as [number, number], mapLink: mapSearch("İzmir Saat Kulesi Konak Meydanı"), image: commons("TR_Izmir_asv2020-02_img31_Konak_Square.jpg"), imageAlt: "Izmir Clock Tower" },
  { whereName: "Kordon", coords: [38.4290, 27.1400] as [number, number], mapLink: mapSearch("Kordon Alsancak İzmir"), image: commons("Alsancak_Pier.jpg"), imageAlt: "Kordon seafront" },
  { whereName: "Agora Ören Yeri", coords: [38.4185, 27.1370] as [number, number], mapLink: mapSearch("Agora Ören Yeri İzmir"), image: commons("Agora_of_Smyrna,_built_during_the_Hellenistic_era_at_the_base_of_Pagos_Hill_and_totally_rebuilt_under_Marcus_Aurelius_after_the_destructive_178_AD_earthquake,_Izmir,_Turkey_(18699693425).jpg"), imageAlt: "Ancient Smyrna Agora" },
  { whereName: "Alsancak", coords: [38.4380, 27.1430] as [number, number], mapLink: mapSearch("Alsancak İzmir"), image: commons("Alsancak.jpg"), imageAlt: "Alsancak streets" },
  { whereName: "Karsıyaka Çarsı", coords: [38.4595, 27.1095] as [number, number], mapLink: mapSearch("Karsıyaka Çarsı İzmir"), image: commons("TR_Izmir_asv2020-02_img37_Karşıyaka_monument.jpg"), imageAlt: "Karsıyaka bazaar" },
];

const IZMIR_DAYTRIPS_META = [
  { whereName: "Sirince", coords: [37.9494, 27.4172] as [number, number], mapLink: mapSearch("Sirince Selçuk İzmir"), image: commons("Şirince_(5).jpg"), imageAlt: "Sirince village" },
  { whereName: "Alaçatı", coords: [38.2725, 26.3722] as [number, number], mapLink: mapSearch("Alaçatı Çesme İzmir"), image: commons("Alaçatı_Yel_Değirmeni_4.jpg"), imageAlt: "Alaçatı stone village" },
  { whereName: "Çesme", coords: [38.3236, 26.3047] as [number, number], mapLink: mapSearch("Çesme İzmir"), image: commons("A_photo_from_Çeşme,_Turkey.jpg"), imageAlt: "Çesme harbour" },
  { whereName: "Efes Antik Kenti (Ephesus)", coords: [37.9395, 27.3417] as [number, number], mapLink: mapSearch("Efes Antik Kenti Selçuk"), image: commons("Library_of_Celsus_side_view.jpg"), imageAlt: "Library of Celsus, Ephesus" },
  { whereName: "Urla Bag Rotası", coords: [38.3225, 26.7660] as [number, number], mapLink: mapSearch("Urla Bag Rotası İzmir"), image: commons("Urla_Deniz_2021.png"), imageAlt: "Urla vineyards" },
];

type GuideText = { name: string; description: string };

const mergeGuide = (meta: typeof IZMIR_FOOD_META, texts: GuideText[]) =>
  meta.map((m, i) => ({ ...m, name: texts[i].name, description: texts[i].description }));

export const CONTENT = {
  en: {
    ...COMMON_DETAILS,
    nav: {
      details: "DETAILS",
      rsvp: "RSVP",
      upload: "Upload Photos",
      guide: "IZMIR GUIDE",
    },
    hero: {
      intro: "WE ARE GETTING MARRIED",
      date: "June 20, 2026",
      cta: "RSVP Now",
    },
    info: {
      title: "The Details",
      subtitle: "We can't wait to celebrate with you",
      whenLabel: "When",
      date: "June 20, 2026",
      time: "7:00 PM",
      whereLabel: "Where",
      scheduleTitle: "The Day",
      viewMap: "View Map",
      more: "and more...",
      schedule: [
        { time: "7:00 PM", activity: "Welcome Cocktail" },
        { time: "8:00 PM", activity: "Ceremony at Sunset" },
        { time: "9:00 PM", activity: "Dinner & Celebration" }
      ]
    },
    menu: {
      title: "The Menu",
      dietaryNote: "* Menu subject to change. Please let us know of any dietary restrictions in your RSVP.",
      sections: [
        {
          category: "Starter",
          items: ["Charcuterie Board"],
        },
        {
          category: "Cold Dishes",
          items: [
            "Mütebbal with Pistachios",
            "Stuffed Vine Leaves with Sour Cherry Sauce",
            "Cretan-Style Zucchini Scrape",
            "Apple-Beetroot Salad",
            "Vual's Love",
          ],
        },
        {
          category: "Hot Dishes",
          items: [
            "Sautéed Liver",
            "Spinach Muska Börek",
            "Sea Beans on a Bed of Artichoke",
          ],
        },
        {
          category: "Fruit",
          items: ["Seasonal Fruit Platter"],
        },
      ]
    },
    gallery: {
      title: "Our Moments",
    },
    rsvp: {
      title: "R.S.V.P.",
      deadline: "Kindly respond by May 20, 2026",
      fields: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        attending: "Will you be attending?",
        accept: "Joyfully Accepts",
        decline: "Regretfully Declines",
        guest: "Bringing a guest? (+1)",
        guestName: "Guest Full Name",
        diet: "Dietary Restrictions",
        message: "Message to the Couple",
        submit: "Send RSVP",
        submitting: "Sending...",
      },
      placeholders: {
        name: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "(555) 123-4567",
        guestName: "Guest Name",
        diet: "e.g. Vegetarian, Nut Allergy",
        message: "Share your best wishes..."
      },
      success: {
        title: "Thank You!",
        message: "Your RSVP has been received. We look forward to seeing you!",
        reset: "Send another RSVP"
      },
      error: "Something went wrong. Please try again."
    },
    upload: {
      title: "Share Your Photos",
      description: "We'd love to see the day through your eyes! Upload your favorite moments from the wedding.",
      button: "Upload Photos",
      success: "{count} photo(s) uploaded successfully!"
    },
    guide: {
      title: "Izmir, A Love Letter",
      subtitle: "A little guide for our guests — what to eat, where to wander, and where to escape for the day.",
      backToWedding: "← BACK TO WEDDING",
      ctaTitle: "Visiting Izmir?",
      ctaText: "We put together a guide of our favourite places to eat and visit. Use it as your starting point.",
      ctaButton: "Explore the Izmir Guide",
      sinceLabel: "Since",
      whereLabel: "WHERE TO FIND IT",
      openInMaps: "OPEN IN GOOGLE MAPS",
      mapHint: "TAP A PIN FOR DETAILS. DRAG TO EXPLORE.",
      food: {
        title: "Where to Eat",
        subtitle: "Twenty-six places we love — and exactly what to order at each.",
        items: mergeGuide(IZMIR_FOOD_META, [
          // --- Kemeraltı / Konak ---
          { name: "Can Döner 1981", description: "Order the İskender — slow-roasted lamb sliced thin over cubes of pide bread, drenched in tomato sauce, sizzling butter and a dollop of yoghurt. A Kemeraltı institution doing one thing perfectly since 1981." },
          { name: "Değer Söğüş", description: "Order the kelle söğüş — slow-boiled lamb head (cheek, tongue, brain) sliced cold, dressed with cumin, sumac and parsley, wrapped in flatbread. Not for the squeamish, unforgettable for everyone else." },
          { name: "Doyuran Manisa Kebap", description: "Order the Manisa kebab — smoky beef köfte over pita with yogurt, tomato sauce, browned butter and sumac. The original, from a shop that's been running half a century." },
          { name: "Kumrucu Apo", description: "Order the kumru — Izmir's signature charcoal-grilled sandwich layered with sucuk and 18-month-aged cheese. A three-generation institution tucked inside Kemeraltı." },
          { name: "Kahveci Necco", description: "Order a Turkish coffee with lemon-dusted lokum on the side. A cosy old-school çay shop and the perfect break between bites." },
          { name: "Meşhur Hisarönü Şambalicisi", description: "Order the şambali — a moist semolina-and-chestnut cake blanketed in kaymak and shredded coconut. The Hisarönü classic, going since 1942." },
          { name: "Hisarönü Süt Tatlıları", description: "Order the kazandibi — caramelised milk pudding, gooey and lightly burnt on top. Optionally crowned with crushed pistachio, or order it plain." },
          { name: "Öztat Kardeşler", description: "Order the lokma — syrup-soaked fried dough served the same way for over ninety years. Pair it with semolina halva or a cold scoop of aşure." },
          // --- Kordon / Alsancak ---
          { name: "Birinci Kordon Balık", description: "Order the catch of the day — sea bass, sea bream, whatever's freshest, simply grilled. Sit on the Kordon and watch the bay turn pink at sunset." },
          { name: "Balmumu Dükkan Lokanta", description: "Order whatever's bubbling in the glass case — slow-cooked stews, dolmas, zeytinyağlı vegetables. A polished Alsancak take on the classic Turkish lokanta." },
          { name: "Kasap Fuat", description: "Order the dry-aged ribeye or the antrikot — a butcher-shop-turned-steakhouse where you pick your cut from the case before they fire it up." },
          { name: "Zeynel Ergin Gevrek Fırını", description: "Order the boyoz with a boiled egg and a gevrek (İzmir's sesame-crusted simit) on the side, washed down with a glass of tea — the city's iconic flaky, oily spiral pastry paired with its other beloved bread, the full traditional İzmir breakfast in one stop, from the city's most famous bakery." },
          { name: "Tavacı Recep Usta", description: "Order the kaburga dolması — lamb ribs stuffed with spiced rice, slow-roasted until the meat falls off the bone and the rice soaks up every drop of fat. A southeastern speciality done as well as anywhere in İzmir." },
          { name: "Çelebi Unlu Mamuller", description: "Order the İzmir Bomba — the original chocolate-filled 'bomb' pastry, actually invented at this very bakery. Try the classic chocolate first, then white-choc, peanut and pistachio." },
          // --- Karsıyaka / Bostanlı (across the bay) ---
          { name: "I'm Bread", description: "Order the sourdough breakfast plate — fresh-milled grain bread with seasonal jams, cheese and butter. The city's best loaf, full stop." },
          { name: "Morisi Kahvaltı", description: "Order the serpme kahvaltı — same idea as Filozof, slightly different vibe. A long, lazy breakfast by the bay." },
          { name: "Filozof Bostanlı", description: "Order the serpme kahvaltı — the full Turkish breakfast spread of cheeses, jams, eggs, olives and warm bread. Bring a friend (or three)." },
          // --- Bornova (east) ---
          { name: "Zaim Usta", description: "Order the kokoreç stew with potatoes, Ankara tava (lamb with orzo) or the beef-tomato stew. A neighbourhood lokanta serving slow-cooked Izmir dishes that taste like someone's grandmother made them." },
          { name: "Köfteci Tamer", description: "Order the köfte — beef-and-lamb meatballs with cumin grilled over coals, served with chilli, onion, sumac and grilled bread. End the meal with the clay-pot sütlaç." },
          { name: "Kokoreççi Asım Usta", description: "Order the kokoreç sandwich — cumin, chilli, crispy outside, creamy inside. The Bornova favourite for this Izmir classic." },
          { name: "Pod Coffee & Eatery", description: "Order the filter coffee and a flaky bake — a third-wave coffee shop with seriously good beans and a calm corner to read." },
          // --- Urla peninsula (west) ---
          { name: "OD Urla ★", description: "Order the tasting menu — Aegean produce cooked over fire by Osman Sezener. One Michelin star, and an unforgettable garden setting." },
          { name: "Beğendik Abi", description: "A proper Urla esnaf lokantası — walk up to the steam-table display case and point at whatever looks best that day. Home-style stews, vegetable dishes, pilavs and braises change daily; trust the abi and order what's in the vitrin." },
          { name: "Levan", description: "Order from the seasonal Turkish menu — refined Aegean ingredients, modern plating, but the soul stays unmistakably Turkish." },
          { name: "Urla Vino Locale ★★", description: "Order the chef's tasting menu — two Michelin stars, a destination dinner in Urla's wine country. Book ahead." },
          { name: "Teruar Urla ★", description: "Order the tasting menu — Aegean wine country on a plate. One Michelin star." },
        ]),
      },
      places: {
        title: "Where to Wander",
        subtitle: "Seven corners of the city that we love.",
        items: mergeGuide(IZMIR_PLACES_META, [
          { name: "Kemeraltı Bazaar", description: "Izmir's centuries-old labyrinth bazaar — cheese, spices, antiques, coffeehouses and hidden mosques. Plan to get lost here for half a day." },
          { name: "The Historic Elevator", description: "A 1907 elevator built into a cliff to connect the Karatas neighbourhood with the seafront above. Take it for the view, stay for the rooftop restaurant." },
          { name: "Clock Tower & Konak Square", description: "The Ottoman-era clock tower on Konak Meydanı is the postcard image of Izmir — best at golden hour, with simit in hand and seagulls overhead." },
          { name: "Kordon", description: "The seaside promenade where locals walk, cycle and watch sunsets over the bay. Grab a beer at one of the cafés and join them." },
          { name: "Smyrna Agora", description: "The reconstructed Roman agora of ancient Smyrna, hidden among the Kemeraltı backstreets. Quiet, atmospheric and rarely crowded." },
          { name: "Alsancak", description: "Izmir's trendy quarter — leafy stone-paved streets, restored Levantine houses, third-wave coffee and the city's best dinner scene." },
          { name: "Karsıyaka Bazaar", description: "The lively pedestrian shopping street across the bay. Catch the ferry from Konak for the 20-minute ride — half the fun is on the water." },
        ]),
      },
      dayTrips: {
        title: "Day Trips",
        subtitle: "All within easy reach of Izmir if you have an extra day or two.",
        items: mergeGuide(IZMIR_DAYTRIPS_META, [
          { name: "Sirince", description: "A hillside Greek village turned wine-and-olive-oil hamlet, an hour south of Izmir. Cobbled lanes, terracotta roofs and tiny tasting rooms tucked into stone houses." },
          { name: "Alaçatı", description: "Whitewashed Aegean village famous for stone houses, bougainvillea, boutique hotels and a world-class windsurfing bay. Perfect for a slow lunch." },
          { name: "Çesme", description: "Beach town at the tip of the peninsula — turquoise water, a Genoese castle on the harbour and the original birthplace of Çesme kumru." },
          { name: "Ephesus", description: "One of the largest Greco-Roman ruin sites in the world — the Library of Celsus alone is worth the day. About 75 minutes from Izmir." },
          { name: "Urla Wine Route", description: "The wine route through Urla's coastal vineyards (yes, where we're getting married). Several boutique wineries open for tastings and farm-to-table lunches." },
        ]),
      },
    },
  },
  tr: {
    ...COMMON_DETAILS,
    nav: {
      details: "Detaylar",
      rsvp: "LCV",
      upload: "Fotograf Yükle",
      guide: "İzmir Rehberi",
    },
    hero: {
      intro: "EVLENIYORUZ",
      date: "20 Haziran 2026",
      cta: "LCV Bildir",
    },
    info: {
      title: "Detaylar",
      subtitle: "Birlikte kutlamak için sabırsızlanıyoruz",
      whenLabel: "Ne Zaman",
      date: "20 Haziran 2026",
      time: "19:00",
      whereLabel: "Nerede",
      scheduleTitle: "Program",
      viewMap: "Haritayı Gör",
      more: "ve dahası...",
      schedule: [
        { time: "19:00", activity: "Hosgeldin Kokteyli" },
        { time: "20:00", activity: "Gün Batımında Nikah" },
        { time: "21:00", activity: "Yemek & Eglence" }
      ]
    },
    menu: {
      title: "Menü",
      dietaryNote: "* Menü degisiklige tabidir. Lütfen alerji veya diyet tercihlerinizi LCV formunda belirtin.",
      sections: [
        {
          category: "Baslangıç",
          items: ["Sarküteri Tabagı"],
        },
        {
          category: "Soguklar",
          items: [
            "Antep Fıstıklı Mütebbel",
            "Visne Soslu Yaprak Sarma",
            "Girit Usulü Kabak Sıyırma",
            "Elmalı Pancar Salatası",
            "Vual Askı",
          ],
        },
        {
          category: "Sıcaklar",
          items: [
            "Yaprak Ciger",
            "Ispanaklı Muska Böregi",
            "Enginar Yatagında Deniz Börülcesi",
          ],
        },
        {
          category: "Meyve",
          items: ["Mevsim Meyveleri Tabagı"],
        },
      ]
    },
    gallery: {
      title: "Anılarımız",
    },
    rsvp: {
      title: "L.C.V.",
      deadline: "Lütfen 20 Mayıs 2026 tarihine kadar yanıt verin",
      fields: {
        firstName: "Ad",
        lastName: "Soyad",
        email: "E-posta",
        phone: "Telefon",
        attending: "Katılıyor musunuz?",
        accept: "Memnuniyetle Kabul Ediyorum",
        decline: "Maalesef Katılamıyorum",
        guest: "Misafiriniz var mı? (+1)",
        guestName: "Misafirin Adı Soyadı",
        diet: "Beslenme Tercihleri / Alerjiler",
        message: "Çifte Mesajınız",
        submit: "Gönder",
        submitting: "Gönderiliyor...",
      },
      placeholders: {
        name: "Ayse",
        lastName: "Yılmaz",
        email: "ayse@ornek.com",
        phone: "0555 123 45 67",
        guestName: "Misafir Adı",
        diet: "örn. Vejetaryen, Fıstık Alerjisi",
        message: "İyi dileklerinizi iletin..."
      },
      success: {
        title: "Tesekkürler!",
        message: "Yanıtınız alındı. Sizi aramızda görmek için sabırsızlanıyoruz!",
        reset: "Baska bir yanıt gönder"
      },
      error: "Bir sorun olustu. Lütfen tekrar deneyin."
    },
    upload: {
      title: "Fotograflarınızı Paylasın",
      description: "Günü sizin gözünüzden görmek isteriz! En güzel anlarınızı yükleyin.",
      button: "Fotograf Yükle",
      success: "{count} fotograf basarıyla yüklendi!"
    },
    guide: {
      title: "İzmir, Bir Ask Mektubu",
      subtitle: "Misafirlerimiz için küçük bir rehber — ne yenir, nereler gezilir, ve bir günlügüne nereye kaçılır.",
      backToWedding: "← Dügüne dön",
      ctaTitle: "İzmir'e mi geliyorsunuz?",
      ctaText: "En sevdigimiz yeme-içme ve gezi noktalarını küçük bir rehberde topladık. Baslangıç noktanız olsun.",
      ctaButton: "İzmir Rehberini Kesfet",
      sinceLabel: "Kurulus",
      whereLabel: "Nerede bulunur",
      openInMaps: "Google Haritalar'da aç",
      mapHint: "Ayrıntılar için pine dokun. Kesfetmek için kaydır.",
      food: {
        title: "Nerede Yenir",
        subtitle: "Sevdigimiz yirmi altı mekân — ve her birinde tam olarak ne sipariş edilmeli.",
        items: mergeGuide(IZMIR_FOOD_META, [
          // --- Kemeraltı / Konak ---
          { name: "Can Döner 1981", description: "İskender söyleyin — ince ince kesilmis kuzu döneri, pide küpleri üzerinde, domates sosu, cızırdayan tereyağı ve bir kaşık yoğurtla. 1981'den beri Kemeraltı'nda aynı yerde, aynı lezzet." },
          { name: "Değer Söğüş", description: "Kelle söğüş söyleyin — haslanmıs kuzu bası (yanak, dil, beyin) soguk dilimlenir, kimyon-sumak-maydanozla harmanlanır, lavasa sarılır. Cesaret isteyene, unutulmaz bir lezzet." },
          { name: "Doyuran Manisa Kebap", description: "Manisa kebabı söyleyin — pidenin üstünde dumanlı dana köfte, yogurt, domates sosu, eritilmis tereyagı ve sumak. Yarım asırdır aynı lezzet." },
          { name: "Kumrucu Apo", description: "Kumru söyleyin — sucuklu ve 18 ay dinlendirilmis kasarlı, kömür atesinde ızgaralanmıs meshur İzmir sandviçi. Kemeraltı'nda üç kusaktır aynı yerde." },
          { name: "Kahveci Necco", description: "Yanında limon tozlu lokumla Türk kahvesi söyleyin. Eski usul, sıcacık bir kahvehane — yemekler arasında mükemmel mola." },
          { name: "Meşhur Hisarönü Şambalicisi", description: "Şambali söyleyin — irmik-kestane kekinin üzerinde kaymak ve hindistan cevizi. 1942'den beri Hisarönü'nün sambalicisi." },
          { name: "Hisarönü Süt Tatlıları", description: "Kazandibi söyleyin — üzeri karamelize, hafifçe yanmıs sütlü tatlı. İsterseniz üzerine kıyılmıs fıstık ekletin, ya da sade söyleyin." },
          { name: "Öztat Kardeşler", description: "Lokma söyleyin — 90 yılı askın süredir aynı sekilde yapılan serbetli lokma. Yanında irmik helvası veya soguk asure deneyin." },
          // --- Kordon / Alsancak ---
          { name: "Birinci Kordon Balık", description: "Günün balıgını söyleyin — levrek, çipura, ne taze geldiyse, sade ızgara. Kordon'da oturun, körfezi seyredin." },
          { name: "Balmumu Dükkan Lokanta", description: "Tezgâhta ne pisiyorsa onu söyleyin — yavas pisen yahniler, dolmalar, zeytinyaglılar. Alsancak'ta klasik lokanta geleneginin sık bir yorumu." },
          { name: "Kasap Fuat", description: "Dry-aged ribeye ya da antrikot söyleyin — kasap dükkânından steakhouse'a dönen bir mekân; tezgâhtan etinizi siz seçiyorsunuz." },
          { name: "Zeynel Ergin Gevrek Fırını", description: "Boyoz söyleyin — yanında haşlanmış yumurta, bir gevrek (İzmir simidi) ve çayla. İzmir'in geleneksel kahvaltısının tamamını tek mekânda sunan, şehrin en meşhur fırını." },
          { name: "Tavacı Recep Usta", description: "Kaburga dolması söyleyin — baharatlı pilavla doldurulmuş kuzu kaburga, et kemikten ayrılana ve pilav her damla yağı emene kadar ağır ateşte pişiriliyor. Güneydoğu klasiğinin İzmir'deki en iyi adreslerinden." },
          { name: "Çelebi Unlu Mamuller", description: "İzmir Bombası söyleyin — bombanın icat edildigi fırın. Klasik çikolatadan baslayıp beyaz çikolata, fıstıklı ve fındıklıyı da deneyin." },
          // --- Karsıyaka / Bostanlı (körfez karsısı) ---
          { name: "I'm Bread", description: "Eksi mayalı kahvaltı tabagını söyleyin — taze ögütülmüs tahıllı ekmek, mevsim reçelleri, peynir, tereyagı. Sehrin en iyi ekmegi, tartısmasız." },
          { name: "Morisi Kahvaltı", description: "Serpme kahvaltı söyleyin — Filozof ile aynı fikir, biraz farklı atmosfer. Körfez kenarında uzun, tembel bir kahvaltı." },
          { name: "Filozof Bostanlı", description: "Serpme kahvaltı söyleyin — peynirler, reçeller, yumurta, zeytin ve sıcak ekmekle tam Türk kahvaltısı sofrası. Yanınıza bir arkadas (ya da üç) getirin." },
          // --- Bornova (doğu) ---
          { name: "Zaim Usta", description: "Patatesli atom kokoreç güveci, Ankara tava ya da domatesli et yahnisi söyleyin. Mahalleye sinmis bir lokanta — insana büyükannesini hatırlatan yavas yemekler." },
          { name: "Köfteci Tamer", description: "Köfte söyleyin — kömürde pisen kimyonlu dana-kuzu köfte; sogan, sumak, biber ve ızgara ekmekle. Sonunda kil tencerede sütlaç ısmarlayın." },
          { name: "Kokoreççi Asım Usta", description: "Kokoreç söyleyin — kimyonlu, acılı; dısı çıtır, içi krema kıvamında. Bornova'nın kokoreç adresi." },
          { name: "Pod Coffee & Eatery", description: "Filtre kahve ve bir hamur isi söyleyin — üçüncü dalga kahveci; ciddi bir çekirdek ve sakin bir köse." },
          // --- Urla yarımadası (batı) ---
          { name: "OD Urla ★", description: "Tadım menüsünü söyleyin — Osman Sezener'in ates üstünde pisirdigi Ege ürünleri. Bir Michelin yıldızı, unutulmaz bir bahçe atmosferi." },
          { name: "Beğendik Abi", description: "Tam bir Urla esnaf lokantası — vitrine gidin, o gün ne güzel görünüyorsa onu söyleyin. Ev yemeği tarzı sulu yemekler, sebzeli yemekler, pilavlar ve böreğimsi türleri her gün değişir; abiye güvenin, vitrinde ne varsa o yenir." },
          { name: "Levan", description: "Mevsim menüsünden seçin — modern sunum, rafine Ege malzemeleri, ama ruhu hâlâ Türk." },
          { name: "Urla Vino Locale ★★", description: "Sef'in tadım menüsünü söyleyin — iki Michelin yıldızı; Urla bag bölgesinde özel bir aksam yemegi. Önceden rezervasyon sart." },
          { name: "Teruar Urla ★", description: "Tadım menüsünü söyleyin — tabakta Ege bag bölgesi. Bir Michelin yıldızı." },
        ]),
      },
      places: {
        title: "Nereler Gezilir",
        subtitle: "Sehrin sevdigimiz yedi kösesi.",
        items: mergeGuide(IZMIR_PLACES_META, [
          { name: "Kemeraltı Çarsısı", description: "Yüzyıllık labirent çarsı — peynirciler, baharatçılar, antikacılar, kahvehaneler ve saklı camiler. Yarım gününüzü kaybetmeye hazır olun." },
          { name: "Tarihi Asansör", description: "1907'de Karatas'ı yukarıdaki yamaca baglamak için insa edilen tarihi asansör. Manzaraya çıkın, üst kattaki restoranda kalın." },
          { name: "Saat Kulesi & Konak Meydanı", description: "Konak Meydanı'ndaki Osmanlı saat kulesi İzmir'in vesikalık fotografı — gün batımında simit ve martılarla en güzel." },
          { name: "Kordon", description: "Yerli halkın yürüdügü, bisiklet sürdügü, gün batımını izledigi sahil yürüyüsü. Bir kafede bir bira alın, onlara katılın." },
          { name: "Agora Ören Yeri", description: "Antik Smyrna'nın restore edilmis Roma agorası, Kemeraltı arka sokaklarına saklı. Sessiz, atmosferik, nadiren kalabalık." },
          { name: "Alsancak", description: "İzmir'in trend mahallesi — agaçlıklı tas sokaklar, restore edilmis Levanten evler, üçüncü nesil kahve ve sehrin en iyi yemek sahnesi." },
          { name: "Karsıyaka Çarsı", description: "Körfezin karsı yakasındaki canlı yaya çarsısı. Konak'tan vapurla 20 dakika — gezinin yarısı denizin üzerinde." },
        ]),
      },
      dayTrips: {
        title: "Günlük Kaçamaklar",
        subtitle: "Bir-iki gününüz daha varsa, hepsi İzmir'e çok yakın.",
        items: mergeGuide(IZMIR_DAYTRIPS_META, [
          { name: "Sirince", description: "Yamaçın üzerinde, eski bir Rum köyünden sarap-zeytinyagı kasabasına dönüsmüs yer. İzmir'den bir saat güneyde; arnavut tası sokaklar, kiremit çatılar ve tas evlerin içine saklanmıs tadım odaları." },
          { name: "Alaçatı", description: "Tas evleri, begonvilleri, butik otelleri ve dünya çapında rüzgâr sörfü koyu ile ünlü beyaz badanalı Ege köyü. Uzun bir ögle yemegi için mükemmel." },
          { name: "Çesme", description: "Yarımadanın ucundaki sahil kasabası — turkuaz deniz, limanın üstündeki Cenova kalesi ve Çesme kumrusunun gerçek yurdu." },
          { name: "Efes Antik Kenti", description: "Dünyanın en büyük Greko-Romen antik kentlerinden biri — sadece Celsus Kütüphanesi bile bir günü hak ediyor. İzmir'e yaklasık 75 dakika." },
          { name: "Urla Bag Rotası", description: "Urla'nın sahil bagları arasından geçen sarap rotası (evet, evlenecegimiz yer). Birçok butik sarap evi tadım ve çiftlikten-sofraya ögle yemekleri için açık." },
        ]),
      },
    },
  },
};