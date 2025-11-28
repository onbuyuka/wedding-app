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
      time: "6:30 PM",
      whereLabel: "Where",
      scheduleTitle: "The Day",
      viewMap: "View Map",
      more: "and more...",
      schedule: [
        { time: "6:30 PM", activity: "Welcome Cocktail" },
        { time: "7:30 PM", activity: "Ceremony at Sunset" },
        { time: "8:30 PM", activity: "Dinner & Celebration" },
        { time: "11:00 PM", activity: "After Party" },
        { time: "12:00 AM", activity: "Midnight Soup" },
      ]
    },
    menu: {
      title: "The Menu",
      dietaryNote: "* Please let us know of any dietary restrictions in your RSVP.",
      sections: [
        {
          category: "Welcome",
          items: ["Aegean Meze Platter", "Fresh Urla Artichoke Hearts", "Local Olive Oil Tasting"],
        },
        {
          category: "Main Course",
          items: [
            "Grilled Sea Bass with Lemon & Herbs",
            "Slow-Cooked Lamb Shank with Purée",
            "Wild Mushroom Risotto (Vegetarian)",
          ],
        },
        {
          category: "Dessert",
          items: ["Wedding Cake", "Traditional Turkish Sweets", "Fresh Summer Fruits"],
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
      description: "We'd love to see the day through your eyes! Please upload your favorite moments from the wedding. Photos will be securely saved to our Google Drive album.",
      dragDrop: "Drag & Drop photos here",
      browse: "or click to browse",
      uploading: "Uploading...",
      recent: "Recently Uploaded",
      driveNote: "Uploaded to Drive"
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
      subtitle: "Sizinle kutlamak için sabırsızlanıyoruz",
      whenLabel: "Ne Zaman",
      date: "20 Haziran 2026",
      time: "18:30",
      whereLabel: "Nerede",
      scheduleTitle: "Program",
      viewMap: "Haritayı Gör",
      more: "ve dahası...",
      schedule: [
        { time: "18:30", activity: "Hoşgeldin Kokteyli" },
        { time: "19:30", activity: "Gün Batımında Nikah" },
        { time: "20:30", activity: "Yemek & Eğlence" },
        { time: "23:00", activity: "After Party" },
        { time: "00:00", activity: "Gece Çorbası" },
      ]
    },
    menu: {
      title: "Menü",
      dietaryNote: "* Lütfen alerji veya diyet tercihlerinizi LCV formunda belirtin.",
      sections: [
        {
          category: "Başlangıç",
          items: ["Ege Meze Tabağı", "Taze Urla Enginar Kalbi", "Yerel Zeytinyağı Tadımı"],
        },
        {
          category: "Ana Yemek",
          items: [
            "Limonlu & Otlu Izgara Levrek",
            "Ağır Ateşte Pişmiş Kuzu İncik & Püre",
            "Yabani Mantarlı Risotto (Vejetaryen)",
          ],
        },
        {
          category: "Tatlı",
          items: ["Düğün Pastası", "Geleneksel Türk Tatlıları", "Taze Yaz Meyveleri"],
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
      description: "Günü sizin gözünüzden görmek isteriz! Lütfen çektiğiniz en güzel anları buraya yükleyin. Fotoğraflar güvenli bir şekilde Google Drive albümümüze eklenecektir.",
      dragDrop: "Fotoğrafları buraya sürükleyin",
      browse: "veya seçmek için tıklayın",
      uploading: "Yükleniyor...",
      recent: "Son Yüklenenler",
      driveNote: "Drive'a yüklendi"
    },
  },
};