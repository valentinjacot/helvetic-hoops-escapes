import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_ENDPOINTS } from "@/config/api";

interface PriceEstimate {
  room: number;
  transport: number;
  ticket: number;
  total: number;
}

const BookingForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
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

  const calculatePrice = async () => {
    setCalculating(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.calculatePrice, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: formData.roomType,
          transportClass: formData.transportClass,
          seatLevel: formData.seatLevel,
          guests: parseInt(formData.guests),
        }),
      });

      if (!response.ok) throw new Error('Failed to calculate price');
      
      const data = await response.json();
      setPriceEstimate(data);
      
      toast({
        title: t("booking.priceCalc"),
        description: `${t("booking.estimatedTotal")} CHF ${data.total}`,
      });
    } catch (error) {
      console.error('Error calculating price:', error);
      toast({
        title: "Error",
        description: "Failed to calculate price. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCalculating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.game) {
      toast({
        title: t("booking.missingInfo"),
        description: t("booking.fillRequired"),
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.booking, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit booking');

      toast({
        title: t("booking.submitted"),
        description: t("booking.response"),
      });
      
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
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t("booking.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("booking.subtitle")}
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>{t("booking.formTitle")}</CardTitle>
              <CardDescription>
                {t("booking.formDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("booking.name")} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("booking.email")} *</Label>
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
                    <Label htmlFor="phone">{t("booking.phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 79 123 45 67"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="game">{t("booking.selectGame")} *</Label>
                    <Select value={formData.game} onValueChange={(value) => setFormData({ ...formData, game: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("booking.chooseGame")} />
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
                  <h3 className="text-lg font-semibold mb-4">{t("booking.packageOptions")}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="roomType">{t("booking.roomType")}</Label>
                      <Select value={formData.roomType} onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("booking.selectRoom")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">{t("booking.singleRoom")}</SelectItem>
                          <SelectItem value="double">{t("booking.doubleRoom")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transportClass">{t("booking.transportClass")}</Label>
                      <Select value={formData.transportClass} onValueChange={(value) => setFormData({ ...formData, transportClass: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("booking.selectTransport")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">{t("booking.secondClass")}</SelectItem>
                          <SelectItem value="first">{t("booking.firstClass")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seatLevel">{t("booking.seatLevel")}</Label>
                      <Select value={formData.seatLevel} onValueChange={(value) => setFormData({ ...formData, seatLevel: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("booking.selectSeat")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">{t("booking.standard")}</SelectItem>
                          <SelectItem value="premium">{t("booking.premium")}</SelectItem>
                          <SelectItem value="vip">{t("booking.vip")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="guests">{t("booking.guests")}</Label>
                      <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? t("booking.guest") : t("booking.guestsPlural")}
                            </SelectItem>
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
                        {calculating ? t("booking.calculating") : t("booking.calculate")}
                      </Button>
                    </div>
                  )}

                  {priceEstimate && (
                    <Card className="mt-6 bg-primary/5 border-primary">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-lg mb-3">{t("booking.priceEstimate")}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>{t("booking.room")}</span>
                            <span className="font-medium">CHF {priceEstimate.room}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t("booking.transport")}</span>
                            <span className="font-medium">CHF {priceEstimate.transport}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t("booking.ticket")}</span>
                            <span className="font-medium">CHF {priceEstimate.ticket}</span>
                          </div>
                          <div className="border-t border-primary/20 pt-2 mt-2 flex justify-between text-lg font-bold text-primary">
                            <span>{t("booking.totalPerPerson")}</span>
                            <span>CHF {priceEstimate.total / parseInt(formData.guests)}</span>
                          </div>
                          <div className="flex justify-between text-base font-semibold">
                            <span>{t("booking.totalGuests")} ({formData.guests} {parseInt(formData.guests) === 1 ? t("booking.guest") : t("booking.guestsPlural")}):</span>
                            <span>CHF {priceEstimate.total}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          {t("booking.estimateNote")}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("booking.additionalInfo")}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("booking.additionalPlaceholder")}
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Send className="mr-2 h-5 w-5" />
                  {t("booking.submit")}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  {t("booking.disclaimer")}
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
