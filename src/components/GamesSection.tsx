import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

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

const upcomingGames: Game[] = [
  {
    id: "1",
    homeTeam: "EA7 Emporio Armani Milan",
    awayTeam: "Real Madrid",
    date: "2025-12-15",
    time: "20:30",
    venue: "Unipol Forum",
    city: "Milan",
    estimatedPrice: "From CHF 450",
    availability: "high"
  },
  {
    id: "2",
    homeTeam: "FC Bayern Munich",
    awayTeam: "Panathinaikos",
    date: "2025-12-18",
    time: "20:00",
    venue: "SAP Garden",
    city: "Munich",
    estimatedPrice: "From CHF 420",
    availability: "high"
  },
  {
    id: "3",
    homeTeam: "EA7 Emporio Armani Milan",
    awayTeam: "Fenerbahce",
    date: "2026-01-10",
    time: "20:45",
    venue: "Unipol Forum",
    city: "Milan",
    estimatedPrice: "From CHF 480",
    availability: "medium"
  },
  {
    id: "4",
    homeTeam: "FC Bayern Munich",
    awayTeam: "Olympiacos",
    date: "2026-01-22",
    time: "19:00",
    venue: "SAP Garden",
    city: "Munich",
    estimatedPrice: "From CHF 440",
    availability: "medium"
  },
  {
    id: "5",
    homeTeam: "EA7 Emporio Armani Milan",
    awayTeam: "Barcelona",
    date: "2026-02-05",
    time: "20:30",
    venue: "Unipol Forum",
    city: "Milan",
    estimatedPrice: "From CHF 520",
    availability: "low"
  },
  {
    id: "6",
    homeTeam: "FC Bayern Munich",
    awayTeam: "Maccabi Tel Aviv",
    date: "2026-02-12",
    time: "20:00",
    venue: "SAP Garden",
    city: "Munich",
    estimatedPrice: "From CHF 410",
    availability: "high"
  }
];

const availabilityColors = {
  high: "bg-green-500",
  medium: "bg-yellow-500",
  low: "bg-red-500"
};

const availabilityText = {
  high: "Good Availability",
  medium: "Limited Spots",
  low: "Almost Full"
};

const GamesSection = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="games" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Upcoming Games
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of premium EuroLeague matches in Milan and Munich
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingGames.map((game) => (
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
                  {new Date(game.date).toLocaleDateString('en-GB', { 
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
                    <span className="text-sm text-muted-foreground">Package from</span>
                    <span className="text-2xl font-bold text-primary">{game.estimatedPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    *Non-binding estimate, final price depends on options
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={scrollToBooking}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Request Package
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Don't see your preferred match? Contact us for custom packages!
          </p>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;