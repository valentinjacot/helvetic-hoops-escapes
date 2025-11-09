import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  estimatedPrice: string;
  availability: "high" | "medium" | "low";
}

const availabilityColors = {
  high: "bg-green-500",
  medium: "bg-yellow-500",
  low: "bg-red-500"
};

const GamesSection = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.games);
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
      toast({
        title: "Error",
        description: "Failed to load games. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const availabilityText = {
    high: t("games.high"),
    medium: t("games.medium"),
    low: t("games.low")
  };
  
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="games" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t("games.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("games.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
            <Card 
              key={game.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-semibold">
                    {game.city}
                  </Badge>
                  <Badge 
                    className={`${availabilityColors[game.availability]} text-white`}
                  >
                    {availabilityText[game.availability]}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-tight">
                  {game.homeTeam} vs {game.awayTeam}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  {new Date(game.date).toLocaleDateString(language === "de" ? 'de-DE' : 'en-GB', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })} • {game.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {game.venue}
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t("games.packageFrom")}</span>
                    <span className="text-2xl font-bold text-primary">{game.estimatedPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("games.estimate")}
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={scrollToBooking}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {t("games.requestPackage")}
                </Button>
              </CardFooter>
            </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {t("games.custom")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
