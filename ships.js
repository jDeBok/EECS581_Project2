//This File Contains the Ship Class, Ship Segment Class and The Coord Class

const Orientation = Object.freeze({   //Enum for orientation of the ship 
    Vertical: 'Vertical',
    Horizontal: 'Horizontal'
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
        this.segments = segments;
        this.live_segments = size; // All segments start live
    }
    segmentHit() {
        if (this.live_segments > 0) {
            this.live_segments -= 1;
        }
    }
    isSunk() {
        return this.live_segments === 0;
    }
}

class ShipSegment {
    constructor(coord, ship) {
        this.position = coord;
        this.parent = ship;
        this.is_alive = true;
    }

    reportHit() { // notify the ship that this segment has been hit
        if (this.is_alive) {
            this.is_alive = false;
            this.parent.segmentHit(); 
        }
    }

    checkParent() {
        return this.parent.live_segments === 0; //check if parent ship has live segments-- returns true if no live segments
    }
}

