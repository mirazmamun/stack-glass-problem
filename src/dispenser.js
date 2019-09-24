/**
 * Representative of node item in the stack
 */
class Dispenser {
  /**
   * 
   * @param {array} selfIdx 
   * @param {array} childrenIdcs 
   * @param {int} fill 
   * @param {int} source 
   */
  constructor (selfIdx = [], childrenIdcs = [], fill = 0, source = 0) {
    this.selfNode = selfIdx;
    this.children = childrenIdcs;
    this.fill = Number(fill) || 0;
    this.source = Number(source) || 0;
  }
}

module.exports = Dispenser;