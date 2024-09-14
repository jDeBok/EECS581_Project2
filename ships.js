/* 
 * Program Name:
 * Ships module
 * 
 * Description:
 * This File Contains the Ship Class, Ship Segment Class and The Coord Class
 * 
 * Inputs:
 * - Information regarding ship and ship segment state
 * 
 * Outputs:
 * - Get methods for status of ships and ship segments
 * 
 * Code sources:
 * Self, MDN web docs, a couple of Stack overflow answers
 * - Stack Overflow code has a comment preceding it linking the source
 * 
 * Author:
 * Code: Jake Bernard, Alex Doehring, Mark Maloney
 * Documentation: Drew Meyer
 * 
 * Creation Date:
 * 2024-09-08
 * 
 */

const Orientation = Object.freeze({
    // Enum for orientation of the ship, i.e. which direction the ship is facing.
    Up: 'Up',       // -Y direction
    Down: 'Down',   // +Y direction
    Left: 'Left',   // -X direction
    Right: 'right'  // +X direction
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
