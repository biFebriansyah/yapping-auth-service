class SignInAuthDto {
  readonly username: string;
  readonly password: string;
}

type GetParams = {
  userId?: string;
  username?: string;
};

class SignUpAuthDto {
  readonly username: string;
  readonly fullname: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
}

class TokenAuthDto {
  readonly token: string;
}

export { SignInAuthDto, SignUpAuthDto, TokenAuthDto, GetParams };
