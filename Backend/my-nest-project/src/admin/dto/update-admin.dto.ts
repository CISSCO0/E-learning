import { IsString, IsOptional } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional() // Marks as optional for updates
  @IsString()
  username?: string;

  @IsOptional() // Marks as optional for updates
  @IsString()
  password?: string; // Hash password before storing

  @IsOptional() // Marks as optional for updates
  @IsString()
  roleId?: string; // E.g., "superadmin", "editor"
}
