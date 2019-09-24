const NODE_CAPACITY = 250;

class Stack {
  /**
   * @param {int} dim The dimension of the stack
   * @param {int} nodeCapacity capacity of each node to hold the liquid
   * @param {int} 
   */
  constructor(dim = 1, nodeCapacity = null, totalDumpLtr = null) {
    //TODO: validate the inputs and types passed
    this.dim = dim;
    this.stackNest = [];
    this.nodeCapacity = nodeCapacity || NODE_CAPACITY;
    this.totalDump = totalDumpLtr * 1000;
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
        this.stackNest[i][j] = {
          selfNode: [i, j],
          children: [[i + 1, j], [i + 1, j]],
          fill: null
        };
      }
    }
    //last row are just self rows
    this.stackNest[this.rowCount - 1] = []
    for (let j = 0; j < this.colCount; j++) {
      this.stackNest[this.rowCount - 1][j] = {
        selfNode: [this.rowCount -1, j],
        children: [],
        fill: null
      }
    }
  }

  /**
   * Pretty print
   */
  print () {
    let singleSpacing = ' ';
    let firstSpacing = Math.floor(this.colCount/2) * 2 + 1;
    for (let i=0; i<this.stackNest.length;i++) {
      //first line will be shifted to center
      let curLineFirstSpacing = firstSpacing - (2 * i);
      let linePrint = '';
      while (curLineFirstSpacing >= 0) {
        linePrint += `${singleSpacing}`;
        -- curLineFirstSpacing;
      }
      for (let j=0;j<this.stackNest[i].length;j++) {
        if (typeof this.stackNest[i][j] !== undefined) {
          linePrint += `${singleSpacing}+${singleSpacing}`;
        }
      }
      console.log(linePrint);
    }
  }
  /**
   * Calculate 
   */
  calculate () {
    //TODO; calculate if the node will fill
    for (let i=0; i<this.stackNest.length;i++) {
      for (let j=0;j<this.stackNest[i].length;j++) {
        if (typeof this.stackNest[i][j] !== undefined) {

          linePrint += `${singleSpacing}+${singleSpacing}`;
        }
      }
      console.log(linePrint);
    }
  }
}

module.exports = Stack;