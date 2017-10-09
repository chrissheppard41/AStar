import Node from './Node';

class Astar {
    constructor(grid) {
        this.grid = grid;
        this.start = null;
        this.end = null
        this.closed = [];
        this.open = [];
        this.path = [];
        this.count = 0;

        this.world_size = (grid.length * grid[0].length);
    }

    startPosition(x, y) {
        this.start = new Node(null,{
            x: x,
            y: y
        });

    }
    endPosition(x, y) {
        this.end = new Node(null,{
            x: x,
            y: y
        });
    }
    getPath() {
        return this.path;
    }

    find() {
        if (this.start.x === null
            || this.start.y === null
            || this.end.y === null
            || this.end.y === null) {
            throw new Error("Please set start or/and end coordinates");
        }


        this.open.push(this.start);
        /*let length;
        while(length = this.open.length) {
            this.gridCeil(this.open);
        }*/

        this.gridCeil(this.open[0], 0);

        console.log("Path:", this.path);
    }

    gridCeil(node, key) {
        this.open.splice(key);
this.count++;

if(this.count === 4) {
    return false;
}
        const neighbours = this.neighbourNodes(node);

        neighbours.forEach((item) => {
            let myPath = new Node(node, item);
            if (!this.grid[myPath.x][myPath.y].checked) {

                //myPath.end_distance = (node.getEndDistance() + item.getEndDistance());
                //myPath.g = myNode.g + distanceFunction(item, myNode);


                //myPath.start_distance = (myPath.getEndDistance() + item.getEndDistance());
                //myPath.f = myPath.g + distanceFunction(item, mypathEnd);


                console.log("--->", myPath);


                this.open.push(myPath);

                this.grid[myPath.x][myPath.y].checked = true;
            }
        });
        this.closed.push(node);



        /*console.log("Node", node);
        console.log("Neighbours for this node", neighbours);
        console.log("Open", this.open);
        console.log("Closed", this.closed);
        console.log("Grid", this.grid);*/


        return this.open.map((new_node, its_key) => this.gridCeil(new_node, its_key));

    }

    getMinValue(results) {
        //get the closest value
        return results.reduce((min, p) => p.getEndDistance() < min.getEndDistance() ? p : min, results[0]);
    }

    neighbourNodes(ceil_position) {
        let search_x = ceil_position.x - 1;
        let search_y = ceil_position.y - 1;

        let map_next_path = [];

        for(let i = search_x; i < (search_x + 3); i++) {
            for(let j = search_y; j < (search_y + 3); j++) {
                if(i === (search_x + 1) && j === (search_y + 1)) continue;

                if(this.acceptableCeil(i, j)) {
                    const ceil = new Node(ceil_position, {x: i, y: j});
                    //ceil.setFromStartDistance(ceil_position);
                    //ceil.setFromEndDistance(this.end);
                    map_next_path.push(ceil);
                }

            }
        }

        return map_next_path;
    }

    acceptableCeil(x, y) {
        return (
            (x >= 0 && x <= this.grid.length)
            && (y >= 0 && y <= this.grid[0].length)
        ) && this.grid[x][y].state === 0;
    }

}
export default Astar;