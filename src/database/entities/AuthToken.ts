import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
} from "typeorm";
import type { Relation } from "typeorm";
import type { User } from "./User.js";

export enum TokenType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

@Entity({ name: "auth_tokens" })
@Index(["token"])
export class AuthToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true })
  token!: string;

  @Column({
    type: "enum",
    enum: TokenType,
  })
  tokenType!: TokenType;

  @Column({ type: "timestamptz" })
  expiresAt!: Date;

  @Column({ default: false })
  isRevoked!: boolean;

  @Column({ nullable: true })
  deviceId?: string;

  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ nullable: true })
  userAgent?: string;

  /**
   * ✅ SAFE relation (no runtime circular dependency)
   */
  @ManyToOne("User", "tokens", {
    onDelete: "CASCADE",
  })
  user!: Relation<User>;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
