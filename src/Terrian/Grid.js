import React, { Component } from 'react';
import './Grid.css';
import Astar from '../Astar/Astar';

class Grid extends Component {
    constructor(props) {
        super(props);

        this.width = 32;
        this.height = 32;
        this.grid = this.createGrid();
    }

    createGrid() {
        let x = new Array(this.width);
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(this.height);
            for(let j = 0; j < x[i].length; j++) {

                let state = 0;
                let random = Math.random();
                if (random < 0.2) {
                    state = 2;
                }

                x[i][j] = {state: state, position: {x:i,y:j}};
            }
        }

        return x;
    }

    drawGrid() {
        const astar_algor = new Astar(this.grid);

        const start = {
            x: Math.floor((Math.random() * this.width)),
            y: Math.floor((Math.random() * this.height))
        };
        const end = {
            x: Math.floor((Math.random() * this.width)),
            y: Math.floor((Math.random() * this.height))
        };

        astar_algor.startPosition(start.x,start.y);
        astar_algor.endPosition(end.x,end.y);
        astar_algor.find();

        const path = astar_algor.getPath();
        return <div>{this.grid.map((item, key) => {
            let output = <div key={key} className="col">
                {item.map((item_2, key_2) => {
                    let colour = " black";
                    let font = "";

                    //for debugging purposes, it's used to see what nodes are checked on the grid, needs reset to be turned off in A*
                    /*if(astar_algor.checkedList[(item_2.position.x + (item_2.position.y * this.width))]) {
                        colour = " searched";
                    }*/
                    if(this.displayFoundPath(path, item_2.position.x, item_2.position.y)) {
                        colour = " green";
                    }

                    if(item_2.position.x === end.x
                        && item_2.position.y === end.y) {
                        font = " bold";
                    }

                    if(item_2.position.x === start.x
                        && item_2.position.y === start.y) {
                        font = " italic";
                    }
                    return <div key={key_2} className={"row" + colour + font}>{item_2.state}</div>
                })}
                </div>;

            return output;
        })}{astar_algor.reset()}
            <div className="info">
                <div>Start location: x: {start.x}, y: {start.y}</div>
                <div>End location: x: {end.x}, y: {end.y}</div>
                <div>If the Start and/or End points are blocked the path wont render</div>
            </div>
        </div>;
    }
    displayFoundPath(path, x, y) {
        let colour = false;
        path.forEach(item => {
            if(item.x === x && item.y === y) {
                colour = true;
            }
        });

        return colour;
    }

    render() {
        return (
            <div className="Grid">
                {this.drawGrid()}
            </div>
        );
    }
}

export default Grid;
