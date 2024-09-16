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
    // Note: Board stored in (row, column) format, moving 'up' decrements the value of Y coords.
    Up: 'Up',   //orientation of the ship is up from origin 
    Down: 'Down', //orintation of the ship is down from the origin 
    Left: 'Left', //orientation of the ship is left from the origin 
    Right: 'Right' //orientation of the ship is right from the origin 
});

class Coord {
    constructor(row, col) {
        this.row = row;  // Row coordinate
        this.col = col;  // Column coordinate
    }

    equals(otherCoord) { //compares with another coord 
        return this.row === otherCoord.row && this.col === otherCoord.col; // Check if two coordinates are the same
    }
}

class Ship { //ship class
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
        if (this.liveSegments > 0) { //if this ship still has live segments 
            this.liveSegments -= 1; //subtract one from the total of live segements
        }
    }

    // Check if the ship is sunk
    isSunk() {
        return this.liveSegments === 0; //return true if the number of live segments is 0 
    }

    // Check if a coordinate is within this ship
    contains(coord) {
        return this.segments.some(segment => segment.position.equals(coord)); //returns true if the coordinate is in the ship 
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
        if (this.isAlive) { //if segemnt is alive
            this.isAlive = false; //change isalive to false 
            this.parent.segmentHit(); //report the hit to the parent 
        }
    }

    // Check if the parent ship is sunk
    isParentDead() {
        return this.parent.isSunk(); //returns true if the parent ship is sunk 
    }
}

class GameCell { //gamecell class 
    constructor() {
        this.content = null; //initialize variables
        this.isShotAt = false;
        this.isHit = false;
    }
}