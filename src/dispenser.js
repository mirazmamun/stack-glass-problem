/**
 * Representative of node item in the stack
 */
class Dispenser {
  /**
   * 
   * @param {array} selfIdx 
   * @param {array} childrenIdcs 
   * @param {number} fill 
   * @param {number} source 
   */
  constructor (selfIdx = [], childrenIdcs = [], fill = 0, source = 0) {
    this.selfNode = selfIdx;
    this.children = childrenIdcs;
    this.fill = Number(fill) || Number(0);
    this.source = Number(source) || Number(0);
  }
}

module.exports = Dispenser;