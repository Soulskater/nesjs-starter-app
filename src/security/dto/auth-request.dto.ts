import { ApiProperty } from "@nestjs/swagger";

export class AuthRequestDto {
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
}
