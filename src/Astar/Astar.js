class Astar {
    constructor(grid) {
        this.grid = grid;
        this.start = {
            x: null,
            y: null
        };
        this.end = {
            x: null,
            y: null
        };
    }

    startPosition(x, y) {
        this.start.x = x;
        this.start.y = y;

    }
    endPosition(x, y) {
        this.end.x = x;
        this.end.y = y;
    }

    find() {
        if (this.start.x === null
            || this.start.y === null
            || this.end.y === null
            || this.end.y === null) {
            throw new Error("Please set start or/and end coordinates");
        }

        this.gridCeil(this.start.x, this.start.y);
    }

    gridCeil(x, y) {
        const ceil_position = {x: x, y: y};

        console.log(this.connectedCeils(ceil_position));
    }

    connectedCeils(ceil_position) {
        let search_x = ceil_position.x - 1;
        let search_y = ceil_position.y - 1;

        let map_next_path = [];

        for(let i = search_x; i < (search_x + 3); i++) {
            for(let j = search_y; j < (search_y + 3); j++) {
                if(this.acceptableCeil(i, j)) {
                    const ceil = {
                        x: i,
                        y: j,
                        distance: this.manhattan({x: i, y: j}, this.end)
                    };

                    map_next_path.push(ceil);
                }

            }
        }

        return map_next_path;
    }

    manhattan(pos0, pos1) {
        //distance between this and the end point
        const d1 = Math.abs (pos1.x - pos0.x);
        const d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
    }

    acceptableCeil(x, y) {
        console.log(x, y);
        console.log(this.grid.length);
        console.log(this.grid[0].length);

        return (
            (x >= 0 && x <= this.grid.length)
            && (y >= 0 && y <= this.grid[0].length)
        ) && this.grid[x][y] === 0;
    }

}
export default Astar;