import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsInt } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string; 

  @IsEmail()
  email: string; 

  @IsNotEmpty()
  @MinLength(3)
  password: string;

 // @IsNotEmpty()
  //@IsInt()
  role_id: number; 

  @IsOptional()
  @IsString()
  pfp?: string; 

  @IsOptional() // Optional field for `hash_pass`, as it’s generated later
  @IsString()
  hash_pass?: string;

  @IsNotEmpty()
  @IsString()
  role: string; // Add this if 'role' is required
}
