import { Observable } from "rxjs";
import { RefreshTokenI } from "./refresh-token.interface";

export interface SessionI {

    access_token: Observable<string>;

    refresh_token: Observable<RefreshTokenI>

}