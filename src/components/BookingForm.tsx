import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Send } from "lucide-react";

interface PriceEstimate {
  room: number;
  transport: number;
  ticket: number;
  total: number;
}

const BookingForm = () => {
  const { toast } = useToast();
  const [calculating, setCalculating] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    game: "",
    roomType: "",
    transportClass: "",
    seatLevel: "",
    guests: "1",
    message: ""
  });

  const calculatePrice = () => {
    setCalculating(true);
    
    // Simulate price calculation
    setTimeout(() => {
      const roomPrices = { single: 150, double: 100 };
      const transportPrices = { economy: 80, first: 150 };
      const ticketPrices = { standard: 120, premium: 200, vip: 350 };
      
      const room = roomPrices[formData.roomType as keyof typeof roomPrices] || 0;
      const transport = transportPrices[formData.transportClass as keyof typeof transportPrices] || 0;
      const ticket = ticketPrices[formData.seatLevel as keyof typeof ticketPrices] || 0;
      
      const guests = parseInt(formData.guests) || 1;
      const total = (room + transport + ticket) * guests;
      
      setPriceEstimate({ room, transport, ticket, total });
      setCalculating(false);
      
      toast({
        title: "Price Calculated!",
        description: `Estimated total: CHF ${total}`,
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.game) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reservation Request Submitted!",
      description: "We'll get back to you within 24 hours with a detailed offer.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      game: "",
      roomType: "",
      transportClass: "",
      seatLevel: "",
      guests: "1",
      message: ""
    });
    setPriceEstimate(null);
  };

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Request Your Package
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below for a personalized, non-binding quote
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Reservation Request Form</CardTitle>
              <CardDescription>
                All fields marked with * are required. We'll respond within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 79 123 45 67"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="game">Select Game *</Label>
                    <Select value={formData.game} onValueChange={(value) => setFormData({ ...formData, game: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a game" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="milan-real">Milan vs Real Madrid (Dec 15)</SelectItem>
                        <SelectItem value="munich-pana">Munich vs Panathinaikos (Dec 18)</SelectItem>
                        <SelectItem value="milan-fener">Milan vs Fenerbahce (Jan 10)</SelectItem>
                        <SelectItem value="munich-oly">Munich vs Olympiacos (Jan 22)</SelectItem>
                        <SelectItem value="milan-barca">Milan vs Barcelona (Feb 5)</SelectItem>
                        <SelectItem value="munich-macabi">Munich vs Maccabi (Feb 12)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4">Package Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select value={formData.roomType} onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Room (+CHF 150)</SelectItem>
                          <SelectItem value="double">Double Room (+CHF 100/person)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transportClass">Transport Class</Label>
                      <Select value={formData.transportClass} onValueChange={(value) => setFormData({ ...formData, transportClass: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transport class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">2nd Class (+CHF 80)</SelectItem>
                          <SelectItem value="first">1st Class (+CHF 150)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seatLevel">Seat Level</Label>
                      <Select value={formData.seatLevel} onValueChange={(value) => setFormData({ ...formData, seatLevel: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seat level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (+CHF 120)</SelectItem>
                          <SelectItem value="premium">Premium (+CHF 200)</SelectItem>
                          <SelectItem value="vip">VIP (+CHF 350)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Guest' : 'Guests'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.roomType && formData.transportClass && formData.seatLevel && (
                    <div className="mt-6">
                      <Button
                        type="button"
                        onClick={calculatePrice}
                        disabled={calculating}
                        variant="outline"
                        className="w-full md:w-auto"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        {calculating ? "Calculating..." : "Calculate Estimate"}
                      </Button>
                    </div>
                  )}

                  {priceEstimate && (
                    <Card className="mt-6 bg-primary/5 border-primary">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-lg mb-3">Price Estimate</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Room:</span>
                            <span className="font-medium">CHF {priceEstimate.room}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Transport:</span>
                            <span className="font-medium">CHF {priceEstimate.transport}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Game Ticket:</span>
                            <span className="font-medium">CHF {priceEstimate.ticket}</span>
                          </div>
                          <div className="border-t border-primary/20 pt-2 mt-2 flex justify-between text-lg font-bold text-primary">
                            <span>Total (per person):</span>
                            <span>CHF {priceEstimate.total / parseInt(formData.guests)}</span>
                          </div>
                          <div className="flex justify-between text-base font-semibold">
                            <span>Total ({formData.guests} {parseInt(formData.guests) === 1 ? 'guest' : 'guests'}):</span>
                            <span>CHF {priceEstimate.total}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          *This is a non-binding estimate. Final price may vary based on availability and specific dates.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any special requests or questions?"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Reservation Request
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you're requesting a non-binding quote. No payment is required at this stage.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;