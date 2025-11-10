import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/config/api";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  game: string;
  roomType: string;
  transportClass: string;
  seatLevel: string;
  guests: number;
  message: string;
  timestamp: string;
}

const BookingsTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.booking}s`);
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Requests</CardTitle>
        <CardDescription>View all customer booking requests</CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No bookings yet</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{booking.email}</div>
                        {booking.phone && <div className="text-muted-foreground">{booking.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell>{booking.game}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {booking.roomType && <Badge variant="outline">{booking.roomType}</Badge>}
                        {booking.transportClass && <Badge variant="outline">{booking.transportClass}</Badge>}
                        {booking.seatLevel && <Badge variant="outline">{booking.seatLevel}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(booking.timestamp).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsTable;
