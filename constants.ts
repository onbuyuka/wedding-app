export const HERO_IMAGE_URL = "/wedding-app/IMG_9203.JPEG";

const COMMON_DETAILS = {
  couple: {
    partner1: "Defne",
    partner2: "Onat",
  },
  location: {
    venue: "Vual Urla",
    address: "Rüstem, 35430 Urla/İzmir, Türkiye",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Vual+Urla+Izmir",
  },
};

export const CONTENT = {
  en: {
    ...COMMON_DETAILS,
    nav: {
      details: "DETAILS",
      rsvp: "RSVP",
      upload: "Upload Photos",
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
      time: "6:00 PM",
      whereLabel: "Where",
      scheduleTitle: "The Day",
      viewMap: "View Map",
      more: "and more...",
      schedule: [
        { time: "6:00 PM", activity: "Welcome Cocktail" },
        { time: "7:30 PM", activity: "Ceremony at Sunset" },
        { time: "8:30 PM", activity: "Dinner & Celebration" }
      ]
    },
    menu: {
      title: "The Menu",
      dietaryNote: "* Please let us know of any dietary restrictions in your RSVP.",
      sections: [
        {
          category: "Starter",
          items: ["Charcuterie Board"],
        },
        {
          category: "Cold Dishes",
          items: [
            "Artichoke Salad with Avocado",
            "Mütebbal with Pistachios",
            "Beetroot Hummus",
            "Vual's Love",
            "Cretan-Style Zucchini Scrape",
          ],
        },
        {
          category: "Hot Dishes",
          items: [
            "Hot Herb Plate",
            "Sautéed Liver",
            "Pacanga Börek",
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
      description: "We'd love to see the day through your eyes! Upload your favorite moments from the wedding and they'll be added to our shared album.",
      button: "Upload Photos",
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf3ntW0jOZksKsy9k5Xg1fF2o9VzqRukJJPDoeRTKGTcDvULg/viewform"
    },
  },
  tr: {
    ...COMMON_DETAILS,
    nav: {
      details: "Detaylar",
      rsvp: "LCV",
      upload: "Fotograf Yükle",
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
      time: "18:00",
      whereLabel: "Nerede",
      scheduleTitle: "Program",
      viewMap: "Haritayı Gör",
      more: "ve dahası...",
      schedule: [
        { time: "18:00", activity: "Hoşgeldin Kokteyli" },
        { time: "19:30", activity: "Gün Batımında Nikah" },
        { time: "20:30", activity: "Yemek & Eğlence" }
      ]
    },
    menu: {
      title: "Menü",
      dietaryNote: "* Lütfen alerji veya diyet tercihlerinizi LCV formunda belirtin.",
      sections: [
        {
          category: "Başlangıç",
          items: ["Şarküteri Tabağı"],
        },
        {
          category: "Soğuklar",
          items: [
            "Avokadolu Enginar Salatası",
            "Antep Fıstıklı Mütebbel",
            "Pancarlı Humus",
            "Vual Aşkı",
            "Girit Usulü Kabak Sıyırma",
          ],
        },
        {
          category: "Sıcaklar",
          items: [
            "Sıcak Ot Tabağı",
            "Yaprak Ciğer",
            "Pacanga Böreği",
          ],
        },
        {
          category: "Meyve",
          items: ["Mevsim Meyveleri Tabağı"],
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
        name: "Ayşe",
        lastName: "Yılmaz",
        email: "ayse@ornek.com",
        phone: "0555 123 45 67",
        guestName: "Misafir Adı",
        diet: "örn. Vejetaryen, Fıstık Alerjisi",
        message: "İyi dileklerinizi iletin..."
      },
      success: {
        title: "Teşekkürler!",
        message: "Yanıtınız alındı. Sizi aramızda görmek için sabırsızlanıyoruz!",
        reset: "Başka bir yanıt gönder"
      },
      error: "Bir sorun oluştu. Lütfen tekrar deneyin."
    },
    upload: {
      title: "Fotoğraflarınızı Paylaşın",
      description: "Günü sizin gözünüzden görmek isteriz! Çektiğiniz en güzel anları yükleyin, paylaşılan albümümüze eklenecektir.",
      button: "Fotoğraf Yükle",
      formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf3ntW0jOZksKsy9k5Xg1fF2o9VzqRukJJPDoeRTKGTcDvULg/viewform"
    },
  },
};