import { AppDataSource } from "../data-source";
import { User } from "../entities/user";

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const user = this.userRepository.create({ name, email, password, role });
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async updateUser(id: string, name: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      user.name = name;
      return await this.userRepository.save(user);
    }
    return null;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
