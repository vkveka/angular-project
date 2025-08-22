import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../config/api.config";

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string; // Optional for update operations
}

export interface UpdateUserPayload {
    name?: string;
    email?: string;
    password?: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private http = inject(HttpClient);

    getBddUser(): Observable<User> {
        return this.http.get<User>(API_ENDPOINTS.user.profile);
    }

    updateUser(payload: UpdateUserPayload): Observable<User> {
        return this.http.put<User>(API_ENDPOINTS.user.profile, payload);
    }

    removeUser() {
        return this.http.delete<User>(API_ENDPOINTS.user.profile);
    }

    // updateUser(user: User): Observable<User> {
    //     return this.http.put<User>(API_ENDPOINTS.user.profile, user);
    // }
}


