class StartNode {
    constructor(parent, grid_location, world_width) {
        this.parent = parent;
        this.x = grid_location.x;
        this.y = grid_location.y;
        this.from_start = 0;
        this.to_end = 0;
        this.value = grid_location.x + (grid_location.y * world_width);
    }

    /**
     * the distance from the start
     * @param start_node
     */
    setFromStartDistance(start_node) {
        this.from_start = start_node.from_start + this.manhattan(start_node);
    }
    /**
     * the distance to the end node
     * @param end_node
     */
    setFromEndDistance(end_node) {
        this.to_end = this.from_start + this.manhattan(end_node);
    }

    /**
     * used to find the distance between node A and node B
     * @param node it wishes to be checked against
     * @returns {number}
     */
    manhattan(node) {
        //distance between this and the end point
        return Math.abs(this.x - node.x) + Math.abs(this.y - node.y);
    }
}
export default StartNode;