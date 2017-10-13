import Node from './Node';

class Astar {
    constructor(grid) {
        this.grid = grid;
        this.start = null;
        this.end = null;
        this.closed = [];
        this.open = [];
        this.path = [];
        this.count = 0;
        this.monitor_time = true;

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

        let execution_time = 0;
        if(this.monitor_time) execution_time = Date.now();
        this.open.push(this.start);
        try {
            const startOk = this.okToGo(this.start);
            const endOk = this.okToGo(this.end);

            if(startOk && endOk) {
                this.gridCeil();
            } else {
                console.log("The start and/or end locations are blocked, do nothing");
            }
        } catch(error) {
            console.log(error);
        }
        if(this.monitor_time) execution_time = (Date.now() - execution_time) / 1000;

        console.log("Path:", this.path, execution_time + "s");
    }

    okToGo(node) {
        if(this.grid[node.x][node.y].state === 0) {
            return false;
        }
        const neighbours = this.neighbourNodes(node);
        let count = neighbours.length;
        neighbours.map((item) => {
            if(this.grid[item.x][item.y].state === 0) {
                count--;
            }
        });

        return (count !== neighbours.length);
    }

    gridCeil() {

        let max = this.world_size;
        let min = -1;
        for(let i = 0; i < this.open.length; i++) {
            // this check monitors the distance from the start, takes the shortest distance
            /*if(this.open[i].from_start < max) {
                max = this.open[i].from_start;
                min = i;
            }*/
            // this check monitors the distance to the end, takes the shortest distance
            if(this.open[i].to_end > max) {
                max = this.open[i].to_end;
                min = i;
            }
        }

        const node = this.open.splice(min, 1)[0];
this.count++;

if(this.count === this.world_size) {
    throw new Error("Done");
}



//console.log(this.end, node);

        if(this.end.value === node.value) {
            console.log("found path", node);
            this.closed.push(node);

            let path = this.closed[this.closed.length - 1];
            this.path.push({x:node.x, y:node.y});
            while(path = path.parent) {
                this.count++;

                this.path.push({x: path.x, y: path.y});

//console.log("here");




                if(this.count === this.world_size * 2) {
                    throw new Error("Done");
                }
            }

            return this.path.reverse();
        } else {
            const neighbours = this.neighbourNodes(node);

            neighbours.forEach((item) => {
                //let myPath = new Node(node, item);
                if (!this.grid[item.x][item.y].checked) {

                    //console.log("--->", item);


                    this.open.push(item);

                    this.grid[item.x][item.y].checked = true;
                }
            });
            this.closed.push(node);
        }



        /*console.log("Node", node);
        console.log("Neighbours for this node", neighbours);
        console.log("Open", this.open);
        console.log("Closed", this.closed);
        console.log("Grid", this.grid);*/


        //return this.open.map((new_node, its_key) => this.gridCeil(new_node, its_key));
        return this.gridCeil();
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
                    let ceil = new Node(ceil_position, {x: i, y: j});
                    ceil.setFromStartDistance(ceil_position);
                    ceil.setFromEndDistance(this.end);
                    map_next_path.push(ceil);
                }

            }
        }

        return map_next_path;
    }

    acceptableCeil(x, y) {
        return (
            (x >= 0 && x < this.grid.length)
            && (y >= 0 && y < this.grid[0].length)
        ) && this.grid[x][y].state === 0;
    }

}
export default Astar;