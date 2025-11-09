# HelveticHoops Backend

Python Flask backend for the HelveticHoops travel booking platform.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the backend server:
```bash
python backend.py
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Games Management
- `GET /api/games` - Get all games
- `GET /api/games/<game_id>` - Get specific game
- `POST /api/games` - Add new game (admin)
- `PUT /api/games/<game_id>` - Update game (admin)
- `DELETE /api/games/<game_id>` - Delete game (admin)

### Bookings
- `POST /api/booking` - Submit booking request
- `GET /api/bookings` - Get all bookings (admin)

### Pricing
- `POST /api/calculate-price` - Calculate package price
- `GET /api/pricing` - Get pricing configuration
- `PUT /api/pricing` - Update pricing (admin)

## Configuration

Edit the `PRICING` dictionary in `backend.py` to adjust prices:

```python
PRICING = {
    "room": {
        "single": 150,
        "double": 100
    },
    "transport": {
        "economy": 80,
        "first": 150
    },
    "ticket": {
        "standard": 120,
        "premium": 200,
        "vip": 350
    }
}
```

Modify `games_db` list to manage available games and their availability status.

## Deployment

For production deployment:
1. Use a production WSGI server like Gunicorn
2. Replace in-memory storage with a real database (PostgreSQL, MySQL, SQLite)
3. Add authentication for admin endpoints
4. Configure environment variables for sensitive data
5. Set up proper CORS configuration for your domain
