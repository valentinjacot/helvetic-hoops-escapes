import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Trophy } from "lucide-react";
import BookingsTable from "@/components/admin/BookingsTable";
import GamesManager from "@/components/admin/GamesManager";
import PricingManager from "@/components/admin/PricingManager";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage bookings, games, and pricing</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Games
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <BookingsTable />
          </TabsContent>

          <TabsContent value="games" className="mt-6">
            <GamesManager />
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <PricingManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
