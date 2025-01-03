import { Observable } from 'rxjs';

type CreateUserDto = {
  readonly email: string;
  readonly username: string;
  readonly password: string;
};
type UpdateUserDto = {
  readonly userId: string;
  readonly name: string;
  readonly gender: string;
  readonly birthday: string;
  readonly picture: string;
  readonly horoscope: string;
  readonly zodiac: string;
  readonly height: number;
  readonly weight: number;
  readonly email: string;
};

type GetUserDto = {
  readonly _id: any;
  readonly name: string;
  readonly gender: string;
  readonly picture: string;
  readonly birthday: Date;
  readonly horoscope: string;
  readonly zodiac: string;
  readonly height: number;
  readonly weight: number;
  readonly email: string;
  readonly username: string;
};

type GetParams = {
  userId?: string;
  username?: string;
};

export interface UserService {
  FindByUsername(params: GetParams): Observable<GetUserDto>;
  FindById(params: GetParams): Observable<GetUserDto>;
  FetchAll(): Observable<{ users: GetUserDto[] }>;
  CreateData(body: CreateUserDto): Observable<any>;
  UpdateData(body: UpdateUserDto): Observable<any>;
}
