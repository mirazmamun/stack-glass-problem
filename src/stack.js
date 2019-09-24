const Dispenser = require('./dispenser');
//node capacity in ml
const NODE_CAPACITY_ML = 250;

class Stack {
  /**
   * @param {int} dim The dimension of the stack
   * @param {int} nodeCapacityMl capacity of each node to hold the liquid
   * @param {int} totalDumpLtr    amount to be poured from top initially
   */
  constructor(dim = 1, nodeCapacityMl = null, totalDumpLtr = null) {
    // TODO: validate the inputs and types passed
    this.dim = dim;
    this.stackNest = [];
    this.nodeCapacity = Number(nodeCapacityMl) || NODE_CAPACITY;
    this.totalDump = Number(totalDumpLtr) * 1000;
  }

  /**
   * Initialize the stack with positions to fill
   */
  init() {
    this.rowCount = this.dim;
    this.colCount = this.dim;
    for (let i = 0; i < this.rowCount - 1; i++) {
      this.stackNest[i] = [];
      for (let j = 0; j < i + 1; j++) {
        this.stackNest[i][j] = new Dispenser([i, j], [[i + 1, j], [i + 1, j + 1]]);
        // this.stackNest[i][j] = {
        //   selfNode: [i, j],
        //   children: [[i + 1, j], [i + 1, j + 1]],
        //   fill: 0,
        //   source: 0
        // };
      }
    }

    // last row are just self rows
    this.stackNest[this.rowCount - 1] = [];
    for (let j = 0; j < this.colCount; j++) {
      this.stackNest[this.rowCount - 1][j] = new Dispenser([this.rowCount - 1, j]);
      // this.stackNest[this.rowCount - 1][j] = {
      //   selfNode: [this.rowCount - 1, j],
      //   children: [],
      //   fill: 0,
      //   source: 0
      // };
    }
  }

  /**
   * Pretty print
   */
  print(fill = false) {
    const singleSpacing = ' ';
    const firstSpacing = Math.floor(this.colCount / 2) * 2 + 1;
    for (let i = 0; i < this.stackNest.length; i++) {
      // first line will be shifted to center
      let curLineFirstSpacing = firstSpacing - 2 * i;
      let linePrint = '';
      while (curLineFirstSpacing >= 0) {
        linePrint += `${singleSpacing}`;
        --curLineFirstSpacing;
      }

      for (let j = 0; j < this.stackNest[i].length; j++) {
        if (typeof this.stackNest[i][j] !== undefined) {
          linePrint += `${singleSpacing}${fill ? String(this.stackNest[i][j].fill): `+`}${singleSpacing}`;
        }
      }

      console.log(linePrint);
    }
  }

  /**
   * Calculate
   */
  calculate() {
    // TODO; calculate if the node will fill
    let stopIteration = false;
    //start with source fill
    this.stackNest[0][0].source = this.totalDump;
    for (let i = 0; i < this.stackNest.length; i++) {
      if (stopIteration) break;
      for (let j = 0; j < this.stackNest[i].length; j++) {
        if (typeof this.stackNest[i][j] !== undefined) {
          let curDispenser = this.stackNest[i][j];
          //we have less liquid left than capacity
          if (curDispenser.source <= this.nodeCapacity) {
            curDispenser.fill = curDispenser.source;
            stopIteration = true;
            //we have more to fill and overflow
          } else {
            this.stackNest[i][j].fill = this.nodeCapacity;
            let overflowCapacity = curDispenser.source - this.nodeCapacity;
            //fill in the children nodes
            curDispenser.children.forEach(item => {
              this.stackNest[item[0]][item[1]].source = Math.ceil(overflowCapacity / 2);
            });
          }
        }
      }
    }
  }

  /**
   * Return an item from the filled stack
   */
  getItem (row = 0, column = 0) {
    //validate the arguments
  }
}

module.exports = Stack;
