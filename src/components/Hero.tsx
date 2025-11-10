import { Button } from "@/components/ui/button";
import { Plane, Trophy, MapPin, Languages, Settings } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-accent">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Language Toggle & Admin Link */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <Link to="/admin">
          <Button
            variant="outline"
            size="sm"
            className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Settings className="mr-2 h-4 w-4" />
            Admin
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "de" : "en")}
          className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
        >
          <Languages className="mr-2 h-4 w-4" />
          {language === "en" ? "DE" : "EN"}
        </Button>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="HelveticHoops Travel" 
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-2xl"
            />
          </div>
          
          {/* Content on the right */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                {t("hero.title1")}<br />{t("hero.title2")}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl">
                {t("hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToGames}
                className="bg-background text-foreground hover:bg-background/90 shadow-xl text-base px-6 py-6 group"
              >
                {t("hero.viewGames")}
                <Trophy className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base px-6 py-6"
              >
                {t("hero.howItWorks")}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 w-full">
              <div className="flex flex-col items-center lg:items-start space-y-2 text-primary-foreground/90">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Plane className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-base">{t("hero.transport")}</h3>
                <p className="text-sm">{t("hero.transportDesc")}</p>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-2 text-primary-foreground/90">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-base">{t("hero.hotels")}</h3>
                <p className="text-sm">{t("hero.hotelsDesc")}</p>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-2 text-primary-foreground/90">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-base">{t("hero.seats")}</h3>
                <p className="text-sm">{t("hero.seatsDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;