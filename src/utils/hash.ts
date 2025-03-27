import * as bcrypt from 'bcrypt';

export class Hash {
  static make(text: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(text, salt);
  }

  static compare(text: string, hash: string) {
    return bcrypt.compareSync(text, hash);
  }
}
