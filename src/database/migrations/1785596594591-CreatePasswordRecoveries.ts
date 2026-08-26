import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePasswordRecoveries1785596594591 implements MigrationInterface {
  name = 'CreatePasswordRecoveries1785596594591';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "password_recoveries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "code_hash" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "attempts" integer NOT NULL DEFAULT '0', "verified_at" TIMESTAMP WITH TIME ZONE, "used_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b854e1e8b1d99bf7ecf0008bc1f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee493797f4c3e9715d9b6fc8c8" ON "password_recoveries"  ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "password_recoveries" ADD CONSTRAINT "FK_ee493797f4c3e9715d9b6fc8c82" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_recoveries" DROP CONSTRAINT "FK_ee493797f4c3e9715d9b6fc8c82"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee493797f4c3e9715d9b6fc8c8"`,
    );
    await queryRunner.query(`DROP TABLE "password_recoveries"`);
  }
}
