//This File Contains the Ship Class, Ship Segment Class and The Coord Class

const Orientation = Object.freeze({   //Enum for orientation of the ship 
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'right'
});

class Coord { //class to store the x,y values of coordinates
    constructor(x_val, y_val) {
        this.x_val = x_val;
        this.y_val = y_val;
    }
}

class Ship {
    constructor(size, coord, orientation, segments) {
        this.size = size;
        this.origin = coord;
        this.orientation = orientation;
        this.segments = [];
        this.liveSegments = size; // All segments start live
    }
    segmentHit() {
        if (this.liveSegments > 0) {
            this.liveSegments -= 1;
        }
    }
    isSunk() {
        return this.liveSegments === 0;
    }
}

class ShipSegment {
    constructor(coord, ship) {
        this.position = coord;
        this.parent = ship;
        this.isAlive = true;
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
