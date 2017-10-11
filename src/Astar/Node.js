class Node {
    constructor(parent, grid_location) {
        this.parent = parent;
        this.x = grid_location.x;
        this.y = grid_location.y;
        this.value = grid_location.x + (grid_location.y * 16);
        this.f = 0;
        this.g = 0;
    }

    setFromStartDistance(start_node) {
        console.log();
        this.f = this.manhattan(start_node);
    }
    setFromEndDistance(end_node) {
        this.g = this.manhattan(end_node);
    }

    /*getEndDistance() {
        return this.end_distance;
    }
    getStartDistance() {
        return this.start_distance;
    }*/

    manhattan(node) {
        //distance between this and the end point
        return Math.abs(this.x - node.x) + Math.abs(this.y - node.y);
    }
}
export default Node;