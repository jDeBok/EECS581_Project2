//This File Contains the Ship Class, Ship Segment Class and The Coord Class

const Orientation = Object.freeze({
    // Enum for orientation of the ship, i.e. which direction the ship is facing.
    Up: 'Up',   // Note: Board stored in (row, column) format, moving 'up' decrements the value of Y coords.
    Down: 'Down',
    Left: 'Left',
    Right: 'right'
});

class Coord {  // Class representing Coordinates, (row, column)
    constructor(x_val, y_val) {
        this.x_val = x_val;   // X Coord.
        this.y_val = y_val;   // Y Coord.
    }
}

class Ship {   // Class representing player ships
    constructor(size, coord, orientation, segments) {
        this.size = size;                // Length of ship
        this.origin = coord;             // Origin coordinate position
        this.orientation = orientation;  // Orientation Enum
        this.segments = [];              // Array storing ship segment objects
        this.liveSegments = size;        // All segments start 'live'
    }
    segmentHit() {  // Method to decrement live segments on hit
        if (this.liveSegments > 0) {
            this.liveSegments -= 1;
        }
    }
    isSunk() {  // Method to check status of ship
        return this.liveSegments === 0;
    }
}

class ShipSegment {  // Class representing ship segments
    constructor(coord, ship) {
        this.position = coord;     // Coordinate position of ship segment
        this.parent = ship;        // Which ship the segment comprises
        this.isAlive = true;       // Status of segment
    }

    reportHit() { // notify the ship that this segment has been hit
        if (this.isAlive) {
            this.isAlive = false;
            this.parent.segmentHit(); 
        }
    }

    isParentDead() {
        return this.parent.liveSegments === 0; //check if parent ship has live segments-- returns true if no live segments
    }
}
