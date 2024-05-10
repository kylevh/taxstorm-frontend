import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Get Started": "Get Started",
      "Sign In": "Sign In",
      "Log out": "Log out",
      "Submissions": "Submissions",
      "Results": "Results",
      "View Profile": "View Profile",
      "Help Center": "Help Center",
      "Do your taxes with ease": "Do your taxes with ease",
      "Hero paragraph": "Experience the ease of managing your taxes with TaxStorm. Fast, accurate, and secure tax filing at your fingertips.",
      "Start Your Stress-Free Tax Journey Now!": "Start Your Stress-Free Tax Journey Now!",
      "Doing your taxes have never been easier": "Doing your taxes have never been easier",
      "Our advanced tools guide you through every step of the tax filing process, ensuring you maximize your deductions and credits. Begin your hassle-free tax journey with us today!": "Our advanced tools guide you through every step of the tax filing process, ensuring you maximize your deductions and credits. Begin your hassle-free tax journey with us today!",
      "Create an account or contact us at (800) CALL-TAX to get started.": "Create an account or contact us at (800) CALL-TAX to get started.",
      "Efficient Tax Filing": "Efficient Tax Filing",
      "Utilize": "Utilize our streamlined process to file your taxes quickly and without errors.",
      "Maximize": "Maximize Deductions",
      "Ensure": "Ensure you get the maximum possible deductions with our expert-driven guidance.",
      "24/7 Support": "24/7 Support",
      "Our tax experts are available around the clock to help you with any questions or issues.": "Our tax experts are available around the clock to help you with any questions or issues.",
      "Secure and Private": "Secure and Private",
      "Our platform is secure and private. We ensure your data is safe and your privacy is protected.": "Our platform is secure and private. We ensure your data is safe and your privacy is protected.",
      "Your data is protected with top-notch security measures, ensuring your privacy.": "Your data is protected with top-notch security measures, ensuring your privacy.",
      "Ready to File Your Taxes?": "Ready to File Your Taxes?",
      "Join thousands of satisfied customers who have experienced the ease and security of filing their taxes with TaxStorm. Get started today and feel the difference.": "Join thousands of satisfied customers who have experienced the ease and security of filing their taxes with TaxStorm. Get started today and feel the difference.",
      "File with TaxStorm Now": "File with TaxStorm Now",
      "Return to top": "Return to top",
      "Home": "Home",
      "Dashboard": "Dashboard",
      "Taxes": "Taxes",
      "Settings": "Settings"
    }
  },
  es: {
    translation: {
      "Get Started": "Empezar",
      "Sign In": "Iniciar sesión",
      "Log out": "Cerrar sesión",
      "Submissions": "Envíos",
      "Results": "Resultados",
      "View Profile": "Ver perfil",
      "Help Center": "Centro de ayuda",
      "Do your taxes with ease": "Haz tus impuestos con facilidad",
      "Hero paragraph": "Experimente la facilidad de administrar sus impuestos con TaxStorm. Declaración de impuestos rápida, precisa y segura al alcance de su mano.",
      "Start Your Stress-Free Tax Journey Now!": "¡Comience su viaje de impuestos sin presión!",
      "Doing your taxes have never been easier": "Hacer tus impuestos nunca ha sido más fácil",
      "Our advanced tools guide you through every step of the tax filing process, ensuring you maximize your deductions and credits. Begin your hassle-free tax journey with us today!": "Nuestros herramientas avanzadas le guiarán a través de cada paso del proceso de declaración de impuestos, garantizando que maximicen sus deducciones y créditos. Comience su viaje de impuestos sin presión hoy!",
      "Create an account or contact us at (800) CALL-TAX to get started.": "Cree una cuenta o contacte con nosotros al (800) CALL-TAX para empezar.",
      "Efficient Tax Filing": "Declaración de impuestos eficiente",
      "Utilize": "Utilice nuestro proceso simplificado para presentar sus impuestos rápidamente y sin errores.",
      "Maximize": "Maximizar las deducciones",
      "Ensure": "Asegrese de obtener las máximas deducciones posibles con nuestra orientación impulsada por expertos.",
      "24/7 Support": "Soporte 24/7",
      "Our tax experts are available around the clock to help you with any questions or issues.": "Nuestros expertos de impuestos están disponibles las 24 horas para ayudarte con cualquier pregunta o problema.",
      "Secure and Private": "Seguro y privado",
      "Our platform is secure and private. We ensure your data is safe and your privacy is protected.": "Nuestra plataforma es segura y privada. Garantizamos que su información esté segura y su privacidad esté protegida.",
      "Your data is protected with top-notch security measures, ensuring your privacy.": "Su información está protegida con medidas de seguridad de primera clase, garantizando su privacidad.",
      "Ready to File Your Taxes?": "Listo para presentar sus impuestos?",
      "Join thousands of satisfied customers who have experienced the ease and security of filing their taxes with TaxStorm. Get started today and feel the difference.": "Únase a miles de clientes satisfechos que han experimentado la facilidad y seguridad de presentar sus impuestos con TaxStorm. Comience hoy y disfrute la diferencia.",
      "File with TaxStorm Now": "Presente sus impuestos con TaxStorm Ahora",
      "Return to top": "Volver al inicio",
      "Home": "Inicio",
      "Dashboard": "Tablero",
      "Taxes": "Impuestos",
      "Settings": "Ajustes"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;