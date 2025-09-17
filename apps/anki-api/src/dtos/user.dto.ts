export class UserDto {
  email: string;
  isActivated: boolean;

  constructor(model: any) {
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}
