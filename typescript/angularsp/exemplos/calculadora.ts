export class Calculadora {

  private n1: number;
  private n2: number;

  constructor(
    n1: number,
    n2: number,
  ) {
    this.n1 = n1;
    this.n2 = n2;
  }

  public subtrair(): number {
    return this.n1 - this.n2;
  }

}
