import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useStorage } from '@/hooks/useStorage'; // Adjust import path as needed

// Access the `get` method from `useStorage` hook
const { get } = useStorage();

const resources = {
    en: {
      translation: {
        greeting: "Effortless access control, right at your fingertips.",
        description: "Manage entry permissions, monitor issues, and stay informed—all from a single, intuitive app.",
        signIn: "Sign In",
        signOut: "Sign Out",
        continueWithoutSignIn: "Continue without Sign In",
        shortcut: "Shortcut",
        keys: "Keys",
        scan: "Scan",
        history: "History",
        recentIssue: "Recent Issue",
        statistics: {
          title: "Statistics",
          description: "Summary of your key issues",
          pending: "Pending issue",
          success: "Success issue",
          failed: "Failed issue"
        },
        createdAt: "Created At",
        updatedAt: "Updated At",
        home: "Home",
        
        profile: "Profile",
        permissionRequired: "Permission Required",
        permissionMessage: "We need your permission to show the camera to scan QR Code",
        allow: "Allow",

        scanQR: "Scan QR",
        ensureQRCode: "Ensure the QR code is placed within the box below.",
        general : "General",
        account: "Account",
        language: "Language",
        currentLanguage: "Current language: English",
   
      }
    },
    de: {
      translation: {
        greeting: "Mühelose Zugangskontrolle, direkt an Ihren Fingerspitzen.",
        description: "Verwalten Sie Zutrittsberechtigungen, überwachen Sie Probleme und bleiben Sie informiert – alles in einer einzigen, intuitiven App.",
        signIn: "Anmelden",
        signOut: "Abmelden",
        continueWithoutSignIn: "Weiter ohne Anmeldung",
        shortcut: "Verknüpfung",
        keys: "Tasten",
        scan: "Scannen",
        history: "Verlauf",
        recentIssue: "Kürzliche Probleme",
        statistics: {
          title: "Statistik",
          description: "Zusammenfassung Ihrer wichtigsten Themen",
          pending: "Offene Probleme",
          success: "Erfolgreiche Probleme",
          failed: "Fehlgeschlagene Probleme"
        },
        createdAt: "Erstellt am",
        updatedAt: "Aktualisiert am",
        home: "Startseite",
    
        profile: "Profil",
    
     
        currentLanguage: "Aktuelle Sprache: Deutsch",
        permissionRequired: "Berechtigung erforderlich",
        permissionMessage: "Wir benötigen Ihre Erlaubnis, um die Kamera zum Scannen des QR-Codes anzuzeigen",
        allow: "Erlauben",
        scanQR: "QR scannen",
        ensureQRCode: "Stellen Sie sicher, dass der QR-Code in der Box unten platziert wird.",
        general : "Allgemein",
        account: "Benutzerkonto",
        language: "Sprache",
  
      }
    }
  };
  
// Asynchronous function to get language from storage
const getLanguageFromStorage = async () => {
  const language = await get('language'); // Fetch the saved language from storage
  return language || 'en'; // If no language found, default to 'en'
};

// Initialize i18next asynchronously
const initI18n = async () => {
  const language = await getLanguageFromStorage(); // Wait for language to be fetched from storage

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language, // Set language from storage or fallback to 'en'
      fallbackLng: 'en', // Default language if not found
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n(); // Initialize i18n after loading the language from storage

export default i18n;
