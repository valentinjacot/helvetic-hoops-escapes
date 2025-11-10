import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/config/api";

interface Pricing {
  room: {
    single: number;
    double: number;
  };
  transport: {
    economy: number;
    first: number;
  };
  ticket: {
    standard: number;
    premium: number;
    vip: number;
  };
}

const PricingManager = () => {
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.booking.replace('/booking', '/pricing')}`);
      if (!response.ok) throw new Error('Failed to fetch pricing');
      const data = await response.json();
      setPricing(data);
    } catch (error) {
      console.error('Error fetching pricing:', error);
      toast({
        title: "Error",
        description: "Failed to load pricing configuration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pricing) return;
    
    setSaving(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.booking.replace('/booking', '/pricing')}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing),
      });

      if (!response.ok) throw new Error('Failed to update pricing');

      toast({
        title: "Success",
        description: "Pricing configuration updated successfully.",
      });
    } catch (error) {
      console.error('Error updating pricing:', error);
      toast({
        title: "Error",
        description: "Failed to update pricing configuration.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pricing) {
    return <div className="text-center py-20 text-muted-foreground">Failed to load pricing</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Room Pricing (per night)</CardTitle>
          <CardDescription>Set prices for different room types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Single Room (CHF)</Label>
              <Input
                type="number"
                value={pricing.room.single}
                onChange={(e) => setPricing({
                  ...pricing,
                  room: { ...pricing.room, single: Number(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Double Room (CHF)</Label>
              <Input
                type="number"
                value={pricing.room.double}
                onChange={(e) => setPricing({
                  ...pricing,
                  room: { ...pricing.room, double: Number(e.target.value) }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transport Pricing</CardTitle>
          <CardDescription>Set prices for different transport classes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Economy Class (CHF)</Label>
              <Input
                type="number"
                value={pricing.transport.economy}
                onChange={(e) => setPricing({
                  ...pricing,
                  transport: { ...pricing.transport, economy: Number(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>First Class (CHF)</Label>
              <Input
                type="number"
                value={pricing.transport.first}
                onChange={(e) => setPricing({
                  ...pricing,
                  transport: { ...pricing.transport, first: Number(e.target.value) }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Pricing</CardTitle>
          <CardDescription>Set prices for different seat levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Standard Seats (CHF)</Label>
              <Input
                type="number"
                value={pricing.ticket.standard}
                onChange={(e) => setPricing({
                  ...pricing,
                  ticket: { ...pricing.ticket, standard: Number(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Premium Seats (CHF)</Label>
              <Input
                type="number"
                value={pricing.ticket.premium}
                onChange={(e) => setPricing({
                  ...pricing,
                  ticket: { ...pricing.ticket, premium: Number(e.target.value) }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>VIP Seats (CHF)</Label>
              <Input
                type="number"
                value={pricing.ticket.vip}
                onChange={(e) => setPricing({
                  ...pricing,
                  ticket: { ...pricing.ticket, vip: Number(e.target.value) }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Pricing Configuration'}
        </Button>
      </div>
    </div>
  );
};

export default PricingManager;
