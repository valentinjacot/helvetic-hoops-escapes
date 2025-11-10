import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/config/api";

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

const GamesManager = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const emptyGame: Game = {
    id: "",
    homeTeam: "",
    awayTeam: "",
    date: "",
    time: "",
    venue: "",
    city: "",
    estimatedPrice: "",
    availability: "high",
  };

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
        description: "Failed to load games.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (game: Game) => {
    try {
      const method = game.id ? 'PUT' : 'POST';
      const url = game.id ? `${API_ENDPOINTS.games}/${game.id}` : API_ENDPOINTS.games;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      });

      if (!response.ok) throw new Error('Failed to save game');

      toast({
        title: "Success",
        description: `Game ${game.id ? 'updated' : 'created'} successfully.`,
      });

      fetchGames();
      setIsDialogOpen(false);
      setEditingGame(null);
    } catch (error) {
      console.error('Error saving game:', error);
      toast({
        title: "Error",
        description: "Failed to save game.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (gameId: string) => {
    if (!confirm('Are you sure you want to delete this game?')) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.games}/${gameId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete game');

      toast({
        title: "Success",
        description: "Game deleted successfully.",
      });

      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
      toast({
        title: "Error",
        description: "Failed to delete game.",
        variant: "destructive",
      });
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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Games Management</CardTitle>
            <CardDescription>Add, edit, or remove games from the schedule</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingGame(emptyGame)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Game
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingGame?.id ? 'Edit Game' : 'Add New Game'}</DialogTitle>
                <DialogDescription>Fill in the game details below</DialogDescription>
              </DialogHeader>
              {editingGame && (
                <GameForm game={editingGame} onChange={setEditingGame} onSave={handleSave} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Match</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">
                    {game.homeTeam} vs {game.awayTeam}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(game.date).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">{game.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{game.venue}</div>
                      <div className="text-muted-foreground">{game.city}</div>
                    </div>
                  </TableCell>
                  <TableCell>{game.estimatedPrice}</TableCell>
                  <TableCell>
                    <Badge variant={game.availability === "high" ? "default" : game.availability === "medium" ? "secondary" : "destructive"}>
                      {game.availability}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingGame(game);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(game.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const GameForm = ({ game, onChange, onSave }: { game: Game; onChange: (game: Game) => void; onSave: (game: Game) => void }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Home Team</Label>
          <Input value={game.homeTeam} onChange={(e) => onChange({ ...game, homeTeam: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Away Team</Label>
          <Input value={game.awayTeam} onChange={(e) => onChange({ ...game, awayTeam: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Input type="date" value={game.date} onChange={(e) => onChange({ ...game, date: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <Input type="time" value={game.time} onChange={(e) => onChange({ ...game, time: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Venue</Label>
          <Input value={game.venue} onChange={(e) => onChange({ ...game, venue: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>City</Label>
          <Input value={game.city} onChange={(e) => onChange({ ...game, city: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Estimated Price</Label>
          <Input value={game.estimatedPrice} onChange={(e) => onChange({ ...game, estimatedPrice: e.target.value })} placeholder="CHF 450" />
        </div>
        <div className="space-y-2">
          <Label>Availability</Label>
          <Select value={game.availability} onValueChange={(value: "high" | "medium" | "low") => onChange({ ...game, availability: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={() => onSave(game)}>
          {game.id ? 'Update Game' : 'Create Game'}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default GamesManager;
