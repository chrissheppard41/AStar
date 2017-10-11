import React, { Component } from 'react';
import './Grid.css';
import Astar from '../Astar/Astar';

class Grid extends Component {
    constructor(props) {
        super(props);

        this.width = 16;
        this.height = 16;
        this.grid = this.createGrid();
    }

    createGrid() {
        let x = new Array(this.width);
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(this.height);
            for(let j = 0; j < x[i].length; j++) {

                let state = 0;
                /*if(i === 1 && j === 1) {
                    state = 1;
                }*/

                x[i][j] = {state: state, position: {x:i,y:j}, checked: false};
            }
        }

        return x;
    }

    drawGrid() {
        const astar_algor = new Astar(this.grid);
        astar_algor.startPosition(0,0);
        astar_algor.endPosition(0,1);
        astar_algor.find();

        const path = astar_algor.getPath();
        let path_count = 0;
        return this.grid.map((item, key) => {
            let output = <div key={key} className="col">
                {item.map((item_2, key_2) => {
                    let colour = " black";
                    if(item_2.checked) {
                        colour = " searched";
                    }
                    if(path[path_count] !== undefined) {
                        if(item_2.position.x === path[path_count].x
                            && item_2.position.y === path[path_count].y) {
                            path_count++;
                            colour = " green";
                        }

                    }
                    return <div key={key_2} className={"row" + colour}>{item_2.state}</div>
                })}
                </div>;

            return output;
        });
    }

    render() {
        //this.startPosition();
        //this.endPosition();

        return (
            <div className="Grid">
                {this.drawGrid()}
            </div>
        );
    }
}

export default Grid;
