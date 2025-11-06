import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero
    "hero.title1": "Experience EuroLeague",
    "hero.title2": "Like Never Before",
    "hero.subtitle": "Premium basketball travel packages from Switzerland to Milan & Munich. We handle everything - you just bring your passion for the game.",
    "hero.viewGames": "View Upcoming Games",
    "hero.howItWorks": "How It Works",
    "hero.transport": "Premium Transport",
    "hero.transportDesc": "First-class train travel",
    "hero.hotels": "Top Hotels",
    "hero.hotelsDesc": "Centrally located accommodations",
    "hero.seats": "Best Seats",
    "hero.seatsDesc": "Premium game tickets",
    
    // Games Section
    "games.title": "Upcoming Games",
    "games.subtitle": "Choose from our selection of premium EuroLeague matches in Milan and Munich",
    "games.high": "Good Availability",
    "games.medium": "Limited Spots",
    "games.low": "Almost Full",
    "games.packageFrom": "Package from",
    "games.estimate": "*Non-binding estimate, final price depends on options",
    "games.requestPackage": "Request Package",
    "games.custom": "Don't see your preferred match? Contact us for custom packages!",
    
    // Booking Form
    "booking.title": "Request Your Package",
    "booking.subtitle": "Fill out the form below for a personalized, non-binding quote",
    "booking.formTitle": "Reservation Request Form",
    "booking.formDesc": "All fields marked with * are required. We'll respond within 24 hours.",
    "booking.name": "Full Name",
    "booking.email": "Email",
    "booking.phone": "Phone Number",
    "booking.selectGame": "Select Game",
    "booking.chooseGame": "Choose a game",
    "booking.packageOptions": "Package Options",
    "booking.roomType": "Room Type",
    "booking.selectRoom": "Select room type",
    "booking.singleRoom": "Single Room (+CHF 150)",
    "booking.doubleRoom": "Double Room (+CHF 100/person)",
    "booking.transportClass": "Transport Class",
    "booking.selectTransport": "Select transport class",
    "booking.secondClass": "2nd Class (+CHF 80)",
    "booking.firstClass": "1st Class (+CHF 150)",
    "booking.seatLevel": "Seat Level",
    "booking.selectSeat": "Select seat level",
    "booking.standard": "Standard (+CHF 120)",
    "booking.premium": "Premium (+CHF 200)",
    "booking.vip": "VIP (+CHF 350)",
    "booking.guests": "Number of Guests",
    "booking.guest": "Guest",
    "booking.guestsPlural": "Guests",
    "booking.calculate": "Calculate Estimate",
    "booking.calculating": "Calculating...",
    "booking.priceEstimate": "Price Estimate",
    "booking.room": "Room:",
    "booking.transport": "Transport:",
    "booking.ticket": "Game Ticket:",
    "booking.totalPerPerson": "Total (per person):",
    "booking.totalGuests": "Total",
    "booking.estimateNote": "*This is a non-binding estimate. Final price may vary based on availability and specific dates.",
    "booking.additionalInfo": "Additional Information",
    "booking.additionalPlaceholder": "Any special requests or questions?",
    "booking.submit": "Submit Reservation Request",
    "booking.disclaimer": "By submitting this form, you're requesting a non-binding quote. No payment is required at this stage.",
    "booking.missingInfo": "Missing Information",
    "booking.fillRequired": "Please fill in all required fields",
    "booking.submitted": "Reservation Request Submitted!",
    "booking.response": "We'll get back to you within 24 hours with a detailed offer.",
    "booking.priceCalc": "Price Calculated!",
    "booking.estimatedTotal": "Estimated total: CHF",
    
    // Footer
    "footer.description": "Premium basketball travel experiences from Switzerland to Europe's finest EuroLeague venues.",
    "footer.quickLinks": "Quick Links",
    "footer.upcomingGames": "Upcoming Games",
    "footer.bookNow": "Book Now",
    "footer.howItWorks": "How It Works",
    "footer.aboutUs": "About Us",
    "footer.contact": "Contact",
    "footer.followUs": "Follow Us",
    "footer.stayUpdated": "Stay updated with the latest packages and exclusive offers!",
    "footer.rights": "HelveticHoops Travel. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookies": "Cookie Policy",
  },
  de: {
    // Hero
    "hero.title1": "Erlebe die EuroLeague",
    "hero.title2": "Wie Nie Zuvor",
    "hero.subtitle": "Premium Basketball-Reisepakete von der Schweiz nach Mailand & München. Wir kümmern uns um alles - Sie bringen nur Ihre Leidenschaft fürs Spiel mit.",
    "hero.viewGames": "Kommende Spiele Ansehen",
    "hero.howItWorks": "So Funktioniert's",
    "hero.transport": "Premium Transport",
    "hero.transportDesc": "Erstklassige Zugfahrt",
    "hero.hotels": "Top Hotels",
    "hero.hotelsDesc": "Zentral gelegene Unterkünfte",
    "hero.seats": "Beste Plätze",
    "hero.seatsDesc": "Premium-Spieltickets",
    
    // Games Section
    "games.title": "Kommende Spiele",
    "games.subtitle": "Wählen Sie aus unserer Auswahl an Premium-EuroLeague-Spielen in Mailand und München",
    "games.high": "Gute Verfügbarkeit",
    "games.medium": "Begrenzte Plätze",
    "games.low": "Fast Ausgebucht",
    "games.packageFrom": "Paket ab",
    "games.estimate": "*Unverbindliche Schätzung, Endpreis abhängig von Optionen",
    "games.requestPackage": "Paket Anfragen",
    "games.custom": "Ihr Wunschspiel ist nicht dabei? Kontaktieren Sie uns für individuelle Pakete!",
    
    // Booking Form
    "booking.title": "Paket Anfragen",
    "booking.subtitle": "Füllen Sie das Formular aus für ein persönliches, unverbindliches Angebot",
    "booking.formTitle": "Reservierungsanfrage",
    "booking.formDesc": "Alle mit * markierten Felder sind erforderlich. Wir antworten innerhalb von 24 Stunden.",
    "booking.name": "Vollständiger Name",
    "booking.email": "E-Mail",
    "booking.phone": "Telefonnummer",
    "booking.selectGame": "Spiel Auswählen",
    "booking.chooseGame": "Wählen Sie ein Spiel",
    "booking.packageOptions": "Paketoptionen",
    "booking.roomType": "Zimmertyp",
    "booking.selectRoom": "Zimmertyp auswählen",
    "booking.singleRoom": "Einzelzimmer (+CHF 150)",
    "booking.doubleRoom": "Doppelzimmer (+CHF 100/Person)",
    "booking.transportClass": "Transportklasse",
    "booking.selectTransport": "Transportklasse auswählen",
    "booking.secondClass": "2. Klasse (+CHF 80)",
    "booking.firstClass": "1. Klasse (+CHF 150)",
    "booking.seatLevel": "Sitzkategorie",
    "booking.selectSeat": "Sitzkategorie auswählen",
    "booking.standard": "Standard (+CHF 120)",
    "booking.premium": "Premium (+CHF 200)",
    "booking.vip": "VIP (+CHF 350)",
    "booking.guests": "Anzahl Gäste",
    "booking.guest": "Gast",
    "booking.guestsPlural": "Gäste",
    "booking.calculate": "Schätzung Berechnen",
    "booking.calculating": "Berechne...",
    "booking.priceEstimate": "Preisschätzung",
    "booking.room": "Zimmer:",
    "booking.transport": "Transport:",
    "booking.ticket": "Spielticket:",
    "booking.totalPerPerson": "Gesamt (pro Person):",
    "booking.totalGuests": "Gesamt",
    "booking.estimateNote": "*Dies ist eine unverbindliche Schätzung. Der Endpreis kann je nach Verfügbarkeit und spezifischen Daten variieren.",
    "booking.additionalInfo": "Zusätzliche Informationen",
    "booking.additionalPlaceholder": "Besondere Wünsche oder Fragen?",
    "booking.submit": "Reservierungsanfrage Senden",
    "booking.disclaimer": "Mit dem Absenden dieses Formulars fordern Sie ein unverbindliches Angebot an. Zu diesem Zeitpunkt ist keine Zahlung erforderlich.",
    "booking.missingInfo": "Fehlende Informationen",
    "booking.fillRequired": "Bitte füllen Sie alle erforderlichen Felder aus",
    "booking.submitted": "Reservierungsanfrage Gesendet!",
    "booking.response": "Wir melden uns innerhalb von 24 Stunden mit einem detaillierten Angebot.",
    "booking.priceCalc": "Preis Berechnet!",
    "booking.estimatedTotal": "Geschätzter Gesamtbetrag: CHF",
    
    // Footer
    "footer.description": "Premium Basketball-Reiseerlebnisse von der Schweiz zu Europas besten EuroLeague-Spielstätten.",
    "footer.quickLinks": "Schnelllinks",
    "footer.upcomingGames": "Kommende Spiele",
    "footer.bookNow": "Jetzt Buchen",
    "footer.howItWorks": "So Funktioniert's",
    "footer.aboutUs": "Über Uns",
    "footer.contact": "Kontakt",
    "footer.followUs": "Folgen Sie Uns",
    "footer.stayUpdated": "Bleiben Sie auf dem Laufenden mit den neuesten Paketen und exklusiven Angeboten!",
    "footer.rights": "HelveticHoops Travel. Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Nutzungsbedingungen",
    "footer.cookies": "Cookie-Richtlinie",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
