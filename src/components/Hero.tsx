import { Button } from "@/components/ui/button";
import { Plane, Trophy, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Hero = () => {
  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-accent">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <img 
            src={logo} 
            alt="HelveticHoops Travel" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
          />
          
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Experience EuroLeague<br />Like Never Before
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Premium basketball travel packages from Switzerland to Milan & Munich. 
              We handle everything - you just bring your passion for the game.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={scrollToGames}
              className="bg-background text-foreground hover:bg-background/90 shadow-xl text-lg px-8 py-6 group"
            >
              View Upcoming Games
              <Trophy className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
            >
              How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl w-full">
            <div className="flex flex-col items-center space-y-2 text-primary-foreground/90">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Premium Transport</h3>
              <p className="text-sm">First-class train travel</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-primary-foreground/90">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Top Hotels</h3>
              <p className="text-sm">Centrally located accommodations</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-primary-foreground/90">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Best Seats</h3>
              <p className="text-sm">Premium game tickets</p>
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