from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Database simulation - replace with real database later
games_db = [
    {
        "id": "1",
        "homeTeam": "EA7 Emporio Armani Milan",
        "awayTeam": "Real Madrid",
        "date": "2025-12-15",
        "time": "20:30",
        "venue": "Unipol Forum",
        "city": "Milan",
        "estimatedPrice": "From CHF 450",
        "availability": "high"
    },
    {
        "id": "2",
        "homeTeam": "FC Bayern Munich",
        "awayTeam": "Panathinaikos",
        "date": "2025-12-18",
        "time": "20:00",
        "venue": "SAP Garden",
        "city": "Munich",
        "estimatedPrice": "From CHF 420",
        "availability": "high"
    },
    {
        "id": "3",
        "homeTeam": "EA7 Emporio Armani Milan",
        "awayTeam": "Fenerbahce",
        "date": "2026-01-10",
        "time": "20:45",
        "venue": "Unipol Forum",
        "city": "Milan",
        "estimatedPrice": "From CHF 480",
        "availability": "medium"
    },
    {
        "id": "4",
        "homeTeam": "FC Bayern Munich",
        "awayTeam": "Olympiacos",
        "date": "2026-01-22",
        "time": "19:00",
        "venue": "SAP Garden",
        "city": "Munich",
        "estimatedPrice": "From CHF 440",
        "availability": "medium"
    },
    {
        "id": "5",
        "homeTeam": "EA7 Emporio Armani Milan",
        "awayTeam": "Barcelona",
        "date": "2026-02-05",
        "time": "20:30",
        "venue": "Unipol Forum",
        "city": "Milan",
        "estimatedPrice": "From CHF 520",
        "availability": "low"
    },
    {
        "id": "6",
        "homeTeam": "FC Bayern Munich",
        "awayTeam": "Maccabi Tel Aviv",
        "date": "2026-02-12",
        "time": "20:00",
        "venue": "SAP Garden",
        "city": "Munich",
        "estimatedPrice": "From CHF 410",
        "availability": "high"
    }
]

bookings_db = []

# Pricing configuration - ADJUST THESE VALUES AS NEEDED
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

@app.route('/api/games', methods=['GET'])
def get_games():
    """Get all available games"""
    return jsonify(games_db)

@app.route('/api/games/<game_id>', methods=['GET'])
def get_game(game_id):
    """Get a specific game by ID"""
    game = next((g for g in games_db if g['id'] == game_id), None)
    if game:
        return jsonify(game)
    return jsonify({"error": "Game not found"}), 404

@app.route('/api/games', methods=['POST'])
def add_game():
    """Add a new game (admin function)"""
    new_game = request.json
    new_game['id'] = str(len(games_db) + 1)
    games_db.append(new_game)
    return jsonify(new_game), 201

@app.route('/api/games/<game_id>', methods=['PUT'])
def update_game(game_id):
    """Update game details (admin function)"""
    game = next((g for g in games_db if g['id'] == game_id), None)
    if game:
        data = request.json
        game.update(data)
        return jsonify(game)
    return jsonify({"error": "Game not found"}), 404

@app.route('/api/games/<game_id>', methods=['DELETE'])
def delete_game(game_id):
    """Delete a game (admin function)"""
    global games_db
    games_db = [g for g in games_db if g['id'] != game_id]
    return jsonify({"message": "Game deleted"}), 200

@app.route('/api/calculate-price', methods=['POST'])
def calculate_price():
    """Calculate package price based on selections"""
    data = request.json
    
    room_type = data.get('roomType')
    transport_class = data.get('transportClass')
    seat_level = data.get('seatLevel')
    guests = data.get('guests', 1)
    
    # Calculate individual prices
    room_price = PRICING['room'].get(room_type, 0)
    transport_price = PRICING['transport'].get(transport_class, 0)
    ticket_price = PRICING['ticket'].get(seat_level, 0)
    
    # Calculate totals
    per_person = room_price + transport_price + ticket_price
    total = per_person * guests
    
    return jsonify({
        "room": room_price,
        "transport": transport_price,
        "ticket": ticket_price,
        "total": total
    })

@app.route('/api/booking', methods=['POST'])
def create_booking():
    """Submit a booking request"""
    booking_data = request.json
    booking_data['id'] = str(len(bookings_db) + 1)
    booking_data['created_at'] = datetime.now().isoformat()
    booking_data['status'] = 'pending'
    
    bookings_db.append(booking_data)
    
    # Here you could add email notifications, database storage, etc.
    print(f"New booking received: {json.dumps(booking_data, indent=2)}")
    
    return jsonify({
        "message": "Booking received successfully",
        "booking_id": booking_data['id']
    }), 201

@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    """Get all bookings (admin function)"""
    return jsonify(bookings_db)

@app.route('/api/pricing', methods=['GET'])
def get_pricing():
    """Get current pricing configuration"""
    return jsonify(PRICING)

@app.route('/api/pricing', methods=['PUT'])
def update_pricing():
    """Update pricing configuration (admin function)"""
    global PRICING
    PRICING = request.json
    return jsonify(PRICING)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
