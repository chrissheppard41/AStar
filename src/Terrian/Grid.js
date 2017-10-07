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
                x[i][j] = 0;
            }
        }

        return x;
    }

    startPosition() {
        this.grid[0][0] = "s";
    }

    endPosition() {
        this.grid[15][15] = "e";
    }

    drawGrid() {
        const astar_algor = new Astar(this.grid);
        astar_algor.startPosition(0,0);
        astar_algor.endPosition(15,15);
        astar_algor.find();


        return this.grid.map((item, key) => {
            let output = <div key={key}className="col">{item.map((item_2, key_2) => <div key={key_2} className="row">{item_2}</div>)}</div>;

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
