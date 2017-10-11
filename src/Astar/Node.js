class Node {
    constructor(parent, grid_location, end_node) {
        this.parent = parent;
        this.x = grid_location.x;
        this.y = grid_location.y;
        this.value = grid_location.x + (grid_location.y * 16);
        this.from_start = 0;
        this.to_end = 0;
    }

    setFromStartDistance(start_node) {
        this.from_start = start_node.from_start + this.manhattan(start_node);
    }
    setFromEndDistance(end_node) {
        this.to_end = this.from_start + this.manhattan(end_node);
    }

    manhattan(node) {
        //distance between this and the end point
        return Math.abs(this.x - node.x) + Math.abs(this.y - node.y);
    }
}
export default Node;