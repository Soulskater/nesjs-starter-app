import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from "../enums/user-role";
import { baseSchemaOptions } from "../../shared/utils/base-schema-options";

export type UserDocument = User & Document;

@Schema({ autoIndex: true, versionKey: false, ...baseSchemaOptions })
export class User {
  public static collectionName = 'users';

  id: string;
  @Prop()
  roles: UserRole[];
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
