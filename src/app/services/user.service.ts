import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../config/api.config";

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private readonly storageKey = 'user_data';
    private http = inject(HttpClient);

    getBddUser(): Observable<User> {
        return this.http.get<User>(API_ENDPOINTS.user.profile);
    }

    removeUser(): Observable<User> {
        return this.http.delete<User>(API_ENDPOINTS.user.deleteUser);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(API_ENDPOINTS.user.updateProfile, user);
    }
}