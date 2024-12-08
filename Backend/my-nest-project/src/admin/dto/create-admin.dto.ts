import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string; // Ensure this password is hashed before storing

  @IsString()
  @IsNotEmpty()
  roleId: string; // E.g., "superadmin", "editor"
}
