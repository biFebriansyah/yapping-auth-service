class SignInAuthDto {
  readonly username: string;
  readonly password: string;
}

type GetParams = {
  userId?: string;
  username?: string;
};

class SignUpAuthDto {
  readonly email: string;
  readonly username: string;
  readonly password: string;
}

class TokenAuthDto {
  readonly token: string;
}

export { SignInAuthDto, SignUpAuthDto, TokenAuthDto, GetParams };
