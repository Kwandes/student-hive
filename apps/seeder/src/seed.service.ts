import { Injectable, Logger } from '@nestjs/common';
import { Connection, getManager } from 'typeorm';
import { AuthUsersSeederService } from './services/auth-users.service';
import { UsersSeederService } from './services/users.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly logger: Logger,
    private readonly connection: Connection,
    private readonly authUsersService: AuthUsersSeederService,
    private readonly usersService: UsersSeederService
  ) {}

  // ========================
  // === MAIN SEED METHOD ===
  async seed() {
    // Clear database
    await this.resetDatabase();

    // Seed the entities
    await this.seedAuthUsers();
    await this.seedUsers();
  }

  // ====================================
  // === DATABASE MANAGEMENT METHODS ====

  async getEntities() {
    const entities = [];
    try {
      this.connection.entityMetadatas.forEach((entity) =>
        entities.push({
          name: entity.name,
          tableName: entity.tableName,
        })
      );
      return entities;
    } catch (error) {
      this.logger.error(error, 'Unable to retrieve database metadata');
      return [];
    }
  }

  /**
   * Cleans all the entities
   * Removes all data from database
   */
  private async cleanAll(entities) {
    try {
      const dbType = this.connection.options.type;

      const manager = getManager();
      const tables = entities.map((entity) => '"' + entity.tableName + '"');

      if (dbType === 'postgres') {
        const truncateSql = `TRUNCATE TABLE ${tables.join(
          ','
        )} RESTART IDENTITY CASCADE;`;
        await manager.query(truncateSql);
      }

      if (dbType === 'sqlite') {
        // There is no SQLite specific TRUNCATE TABLE command
        // Setting in typeorm config `dropSchema: true` clears database
      }
    } catch (error) {
      this.logger.error(error, 'Unable to clean database');
    }
  }

  /**
   * Reset the database, truncate all tables (remove all data)
   */
  async resetDatabase() {
    this.logger.debug('RESETTING DATABASE');

    const entities = await this.getEntities();
    await this.cleanAll(entities);

    this.logger.debug('✅ DATABASE RESET SUCCESSFUL');
  }

  // ===========================
  // === AUTH USER SEED METHODS ===
  async seedAuthUsers() {
    try {
      const users = await Promise.all(this.authUsersService.create());

      this.logger.debug('✅ Auth users created');
      return users;
    } catch (error) {
      this.logger.error(error);
    }
  }

  // ===========================
  // === USER SEED METHODS ===
  async seedUsers() {
    try {
      const users = await Promise.all(this.usersService.create());

      this.logger.debug('✅ Users created');
      return users;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
