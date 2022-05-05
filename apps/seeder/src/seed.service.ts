import { Injectable, Logger } from '@nestjs/common';
import { Connection, getManager } from 'typeorm';
import { AttendancesSeederService } from './services/attendances.service';
import { AuthUsersSeederService } from './services/auth-users.service';
import { UsersSeederService } from './services/users.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly logger: Logger,
    private readonly connection: Connection,
    private readonly authUsersService: AuthUsersSeederService,
    private readonly usersService: UsersSeederService,
    private readonly attendancesService: AttendancesSeederService
  ) {}

  // ========================
  // === MAIN SEED METHOD ===
  async seed() {
    // Clear database
    await this.resetDatabase();

    // Seed the entities
    await this.seedAuthUsers();
    await this.seedUsers();
    await this.seedAttendances();
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

      if (dbType === 'mysql') {
        // Can't delete from nor truncate multiple tables at once
        // Can't truncate due to foreign key constraints
        for (const table of tables) {
          const query = `DELETE FROM ` + table.replaceAll(`"`, ``) + ';';
          await manager.query(query);
          console.log(`${table} has perished`);
        }
      }

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

  // ====================================
  // === ENTITY SEEDING METHODS ====
  async seedAuthUsers() {
    try {
      const response = await Promise.all(this.authUsersService.create());
      this.logger.debug(`✅ Auth Users created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Auth users failed to seed`);
      this.logger.error(error);
    }
  }

  async seedUsers() {
    try {
      const response = await Promise.all(this.usersService.create());
      this.logger.debug(`✅ Users created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Users failed to seed`);
      this.logger.error(error);
    }
  }

  async seedAttendances() {
    try {
      const response = await Promise.all(this.attendancesService.create());
      this.logger.debug(`✅ Attendances created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Attendances failed to seed`);
      this.logger.error(error);
    }
  }
}
