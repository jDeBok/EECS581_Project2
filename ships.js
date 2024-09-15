//This File Contains the Ship Class, Ship Segment Class and The Coord Class

const Orientation = Object.freeze({
    // Enum for orientation of the ship, i.e. which direction the ship is facing.
    Up: 'Up',   // Note: Board stored in (row, column) format, moving 'up' decrements the value of Y coords.
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
});

class Coord {
    constructor(row, col) {
        this.row = row;  // Row coordinate
        this.col = col;  // Column coordinate
    }

    equals(otherCoord) {
        return this.row === otherCoord.row && this.col === otherCoord.col; // Check if two coordinates are the same
    }
}

class Ship {
    constructor(size, origin, orientation) {
        this.size = size;                // Length of ship
        this.origin = origin;            // Origin coordinate position
        this.orientation = orientation;  // Orientation Enum
        this.segments = [];              // Array to store ShipSegment objects
        this.liveSegments = size;        // All segments start 'live'
        this.initializeSegments();
    }

    // Initialize ship segments based on size and orientation
    initializeSegments() {
        let row = this.origin.row; //gets starting row from the origin
        let col = this.origin.col; //gets starting col ftom the origin

        for (let i = 0; i < this.size; i++) { //iterates through ship segments
            let segmentCoord = new Coord(row, col); //create a coordinate object for the current segment
            this.segments.push(new ShipSegment(segmentCoord, this)); //creates ship segment and adds it to segments array 

            // Move to the next segment based on orientation
            switch (this.orientation) {
                case Orientation.Up:
                    row--; //move up a row 
                    break;
                case Orientation.Down:
                    row++; //move down a row 
                    break;
                case Orientation.Left:
                    col--; //Move left a column 
                    break;
                case Orientation.Right:
                    col++; //move right a column 
                    break;
            }
        }
    }

    // Handle a segment being hit
    segmentHit() {
        if (this.liveSegments > 0) {
            this.liveSegments -= 1;
        }
    }

    // Check if the ship is sunk
    isSunk() {
        return this.liveSegments === 0;
    }

    // Check if a coordinate is within this ship
    contains(coord) {
        return this.segments.some(segment => segment.position.equals(coord));
    }
}

class ShipSegment {
    constructor(coord, ship) {
        this.position = coord;     // Coordinate position of ship segment
        this.parent = ship;        // Reference to the Ship object
        this.isAlive = true;       // Status of segment
    }

    // Notify the ship that this segment has been hit
    reportHit() {
        if (this.isAlive) {
            this.isAlive = false;
            this.parent.segmentHit();
        }
    }

    // Check if the parent ship is sunk
    isParentDead() {
        return this.parent.isSunk();
    }
}

class GameCell {
    constructor() {
        this.content = null;
        this.isShotat = false;
    }
}