class Node {
    constructor(parent, grid_location) {
        this.parent = parent;
        this.x = grid_location.x;
        this.y = grid_location.y;
        this.value = grid_location.x + (grid_location.y * 16);
        this.f = 0;
        this.g = 0;
    }

    /*setFromStartDistance(start_node) {
        this.start_distance = this.manhattan(start_node);
    }
    setFromEndDistance(end_node) {
        this.end_distance = this.manhattan(end_node);
    }

    getEndDistance() {
        return this.end_distance;
    }
    getStartDistance() {
        return this.start_distance;
    }*/

    manhattan(node) {
        //distance between this and the end point
        /*const d1 = Math.abs (this.x - node.x);
        const d2 = Math.abs (this.y - node.y);
        return d1 + d2;*/
        return Math.abs(this.x - node.x) + Math.abs(this.y - node.y);
    }

    ManhattanDistance(Point, Goal)
    {	// linear movement - no diagonals - just cardinal directions (NSEW)
        return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
    }
}
export default Node;