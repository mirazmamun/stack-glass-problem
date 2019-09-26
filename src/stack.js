const Dispenser = require('./dispenser');
//node capacity in ml
const DISPENSER_CAPACITY_ML = 250;
const MAX_DIMENSION = 100;
const MAX_FLOAT_PRECISION = 10;


class Stack {
  /**
   * @param {number} dim The dimension of the stack
   * @param {number} dispenserCapacityMl capacity of each node to hold the liquid
   * @param {number} totalDumpLtr    amount to be poured from top initially
   * @throws {Error}      When passed in wrong argument
   */
  constructor(dim = 1, dispenserCapacityMl = null, totalDumpLtr = null, floatPrecision = 2) {
    // TODO: validate the inputs and types passed
    if (dim > MAX_DIMENSION || dispenserCapacityMl < 0 || floatPrecision > MAX_FLOAT_PRECISION) {
      throw new Error(`Invalid argument. Expected 0 < dim < ${MAX_DIMENSION}, dispenserCapacity > 0, floatPrecision <= ${MAX_FLOAT_PRECISION}`);
    }
    this.dim = dim;
    this.stackNest = [];
    this.dispenserCapacity = Number(dispenserCapacityMl || DISPENSER_CAPACITY_ML);
    this.totalDump = Number(totalDumpLtr) * 1000;
    this.floatPrecision = parseInt(floatPrecision || 2, 10);
  }

  /**
   * Initialize the stack with positions filled with Dispenser object
   * to indicate the position and children
   * 
   * @returns {Stack} Current Stack instance
   */
  init() {
    this.rowCount = this.dim;
    this.colCount = this.dim;
    for (let i = 0; i < this.rowCount - 1; i++) {
      this.stackNest[i] = [];
      for (let j = 0; j < i + 1; j++) {
        this.stackNest[i][j] = new Dispenser([i, j], [[i + 1, j], [i + 1, j + 1]]);
      }
    }

    // last row are just self rows
    this.stackNest[this.rowCount - 1] = [];
    for (let j = 0; j < this.colCount; j++) {
      this.stackNest[this.rowCount - 1][j] = new Dispenser([this.rowCount - 1, j]);
    }
    return this;
  }

  /**
   * Get the spacing between printing items
   * 
   * @access private
   * @returns {number}
   */
  _getPrintItemSpacing () {
    return this.dispenserCapacity.toString().length + this.floatPrecision;
  }

  /**
   * Pretty print
   * 
   * @param {boolean} fill Whether to fill the pyramid graph with fill values of the nodes or just
   *                     '+' string
   * 
   * @returns {Stack}   current Stack instance
   */
  print(fill = false) {
    const singleSpacing = ' '.repeat(this._getPrintItemSpacing());
    const firstSpacing = Math.floor(this.colCount / 2) * 2 + 1;
    for (let i = 0; i < this.stackNest.length; i++) {
      // first line will be shifted to center
      let curLineFirstSpacing = firstSpacing - 2 * i;
      let linePrint = '';
      let offset = '';
      let capacityPrint = '';
      while (curLineFirstSpacing >= 0) {
        offset += `${singleSpacing}`;
        --curLineFirstSpacing;
      }
      //add the offset to the current line
      linePrint += `${offset}`;
      for (let j = 0; j < this.stackNest[i].length; j++) {
        if (typeof this.stackNest[i][j] !== undefined) {
          capacityPrint += `${singleSpacing}${fill ? String(this.stackNest[i][j].fill).padEnd(this._getPrintItemSpacing()) : `+`}${singleSpacing}`;
        }
      }
      //the final string
      linePrint = offset + capacityPrint;
      console.log(linePrint);
      //print the lower bar
      console.log(`${offset}${'-'.repeat(capacityPrint.length)}`)
    }
    return this;
  }

  /**
   * Calculate the fills as liquid passes down
   * 
   * @returns {Stack}
   */
  calculate() {
    //start with source fill
    this.stackNest[0][0].source = this.totalDump;
    for (let i = 0; i < this.stackNest.length; i++) {
      for (let j = 0; j < this.stackNest[i].length; j++) {
        if (typeof this.stackNest[i][j] !== undefined) {
          let curDispenser = this.stackNest[i][j];
          //we have less liquid left than capacity
          if (curDispenser.source <= this.dispenserCapacity) {
            curDispenser.fill = curDispenser.source;
            //we have more to fill and overflow
          } else {
            this.stackNest[i][j].fill = this.dispenserCapacity;
            let overflowCapacity = curDispenser.source - this.dispenserCapacity;
            //fill in the children nodes
            curDispenser.children.forEach(item => {
              this.stackNest[item[0]][item[1]].source += Number((overflowCapacity / 2).toFixed(this.floatPrecision));
            });
          }
        }
      }
    }
    return this;
  }

  /**
   * Return an item from the filled stack
   * 
   * @param {number} row The row index
   * @param {number} column The column index
   * @param {boolean} returnFill  Whether to return the item Dispenser object or the fill property of the object
   * 
   * @returns {any}   Either of Dispenser or Number depending on returnFill 
   */
  getItem(row = 0, column = 0, returnFill = false) {
    //validate the arguments
    row = Number(row);
    column = Number(column);
    if (row > this.rowCount - 1 || column > row) {
      throw new Error(`Row and/or column value must be within range of the dimension`)
    }
    return returnFill ? this.stackNest[row][column].fill : this.stackNest[row][column];
  }
}

module.exports = Stack;
