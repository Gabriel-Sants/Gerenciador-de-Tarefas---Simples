export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public active: boolean,
    public readonly createdAt: Date
  ) {}

  deactivate() {
    this.active = false
  }

  activate() {
    this.active = true
  }
}
