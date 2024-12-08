import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  role: string;

  @Prop({ type: String })
  pfp: string;

  @Prop({ type: Date, default: Date.now })
  createtime: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
