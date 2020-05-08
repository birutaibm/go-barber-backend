import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterAppointmentsFields1587308004205
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // change id type to uuid
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
    // remove wrong collumn
    await queryRunner.dropColumn('appointments', 'provider');
    // add new collumns
    await queryRunner.addColumns('appointments', [
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
    // especify the foreign key
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // remove foreing key
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    // remove collumns
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.dropColumn('appointments', 'created_at');
    await queryRunner.dropColumn('appointments', 'updated_at');
    // add wrong collumn
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
    // change id type to varchar
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
    await queryRunner.changeColumn(
      'appointments',
      'id',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
  }
}
