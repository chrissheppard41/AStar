import Node from './EndNode';

/**
 * The a* algorithm
 */
class Astar {
    constructor(grid) {
        this.grid = grid;
        this.checkedList = [];
        this.start = null;
        this.end = null;
        this.closed = [];
        this.open = [];
        this.path = [];
        this.count = 0;
        this.monitor_time = true;

        this.world_size = (grid.length * grid[0].length);
    }

    /**
     * Set up the start position
     * @param x location
     * @param y location
     */
    startPosition(x, y) {
        this.start = new Node(null,{
            x: x,
            y: y
        },
        this.grid.length);

    }

    /**
     * Set up the end position
     * @param x location
     * @param y location
     */
    endPosition(x, y) {
        this.end = new Node(null,{
            x: x,
            y: y
        },
        this.grid.length);
    }

    reset() {
        this.checkedList = [];
        this.start = null;
        this.end = null;
        this.closed = [];
        this.open = [];
        this.count = 0;
    }

    /**
     * return the finished path
     * @returns {Array|*}
     */
    getPath() {
        return this.path;
    }

    /**
     * starts the execution for finding a path through the 2d multidimensional array map.
     * first it will check to see if a start and end location has been set, that'll return an error if not
     * then it will push the start node to the open array to start the pathing checks
     * makes sure the start and end locations are passable
     * then executes the start of ceil checking
     * once done it will reset the data and return the path
     * @returns {Array|*}
     */
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
                this.path = this.gridCeil();
            } else {
                throw new Error("The start and/or end locations are blocked, do nothing");
            }
        } catch(error) {
            console.log("Error caught :: " + error);
        }
        if(this.monitor_time) execution_time = (Date.now() - execution_time) / 1000;

        this.reset();
        console.log("Path:", this.path, execution_time + "s");

        return this.path;
    }

    /**
     * whether or not the grid location for this node is passable, used for start and end locations, if either are
     * blocked then the path can't be rendered
     * @param node in the grid
     * @returns {boolean}
     */
    okToGo(node) {
        return this.grid[node.x][node.y].state < 2;
    }

    /**
     * The main algorithm that finds a path through the map
     * add to the count, will stop any stack over flow
     *
     * gets the node with shortest distance to the end node, the first node will always be 0, world size is just the max
     * distance it could be
     * there are 2 code bits here, one that's commented out, that one checks the max distance from start to end,
     *  typically that will find all the nodes until it reaches the end node were the other code is outlined above
     * get that node and take it out of the open list
     * checks to see if the node has reached the end node, if so return the path from the start node to end node
     * else find the neighbours for this node and add those to the open list
     * mark that grid location as checked (it's important that the grid is a multidimensional array)
     * put each of the neighbours into the open list so that they can be checked
     * as this current node has been checked and we don't want it being checked again, put it into the closed list, this
     *  will be used when finding the path
     * @returns {*}
     */
    gridCeil() {
        this.count++;
        if(this.count === this.world_size) {
            throw new Error("The path could not be rendered within the world size map limitation, path failed");
        }

        // this check monitors the distance from the start, takes the shortest distance
        /*let max = this.world_size;
        let min = -1;
        for(let i = 0; i < this.open.length; i++) {
            if(this.open[i].from_start < max) {
                max = this.open[i].from_start;
                min = i;
            }
        }*/

        // this check monitors the distance to the end, takes the shortest distance
        let max = this.world_size;
        let min = -1;
        for(let i = 0; i < this.open.length; i++) {
            if(this.open[i].to_end < max) {
                max = this.open[i].to_end;
                min = i;
            }
        }

        const node = this.open.splice(min, 1)[0];

        if(this.end.x === node.x && this.end.y === node.y) {
            this.closed.push(node);
            let path = this.closed[this.closed.length - 1];
            return this.mapFinishedPath(path, node);
        } else {
            const neighbours = this.neighbourNodes(node);

            neighbours.forEach((item) => {
                if (!this.checkedList[item.value]) {
                    this.open.push(item);
                    this.checkedList[item.value] = true;
                }
            });
            this.closed.push(node);
        }

        return this.gridCeil();
    }

    /**
     * once the path has been found, traverse back from the found point to the start
     * @param path the last found closed path
     * @param node the current node it's on which will be the end location
     * @returns {Array.<*>}
     */
    mapFinishedPath(path, node) {console.log(path);
        let finishPath = [];
        let stopCounter = 0;
        finishPath.push({x:node.x, y:node.y});
        // eslint-disable-next-line
        while(path = path.parent) {
            stopCounter++;
            finishPath.push({x: path.x, y: path.y});
            if(stopCounter === this.world_size) {
                throw new Error("The path couldn't render within the world size ceil count, this is wrong.");
            }
        }
        return finishPath.reverse();
    }

    /**
     * finds around the current node it's siblings ceil to check if it's passable then generates a distance to the end
     * node. used to find the next node to traverse to
     * it will check the nodes arounds the main nodes
     * it wont check itself, it'll continue
     * it will check to see if the ceil is accessible and not blocked
     * will generate the start distance
     * then it will generated the distance to the end
     * it will push that to an array (for each neighbour node)
     * then it will return that array
     * @param ceil_position
     * @returns {Array}
     */
    neighbourNodes(ceil_position) {
        let search_x = ceil_position.x - 1;
        let search_y = ceil_position.y - 1;

        let map_next_path = [];

        for(let i = search_x; i < (search_x + 3); i++) {
            for(let j = search_y; j < (search_y + 3); j++) {
                if(i === (search_x + 1) && j === (search_y + 1)) continue;

                if(this.acceptableCeil(i, j)) {
                    let ceil = new Node(ceil_position, {x: i, y: j}, this.grid.length);
                    ceil.setFromStartDistance(ceil_position);
                    ceil.setFromEndDistance(this.end);
                    map_next_path.push(ceil);
                }

            }
        }

        return map_next_path;
    }

    /**
     * whether or not this ceil is passable, in this case, is it outside the map bounds or is there an obstacle in the
     * way
     * @param x
     * @param y
     * @returns {boolean}
     */
    acceptableCeil(x, y) {
        return (
            (x >= 0 && x < this.grid.length)
            && (y >= 0 && y < this.grid[0].length)
        ) && this.grid[x][y].state < 2;
    }

}
export default Astar;