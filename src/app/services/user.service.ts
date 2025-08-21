import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { API_BASE_URL, API_ENDPOINTS } from "../config/api.config";

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
    // private userSubject = new BehaviorSubject<User | null>(this.getUser());
    private http = inject(HttpClient);

    // user$ = this.userSubject.asObservable();

    // setUser(user: User): void {
    //     localStorage.setItem(this.storageKey, JSON.stringify(user));
    //     this.userSubject.next(user);
    // }

    // getUser(): User | null {
    //     const userData = localStorage.getItem(this.storageKey);
    //     return userData ? JSON.parse(userData) as User : null;
    // }

    getBddUser(): Observable<User> {
        return this.http.get<User>(API_ENDPOINTS.user.profile);
    }


    removeUser(): Observable<User> {
        return this.http.delete<User>(API_ENDPOINTS.user.deleteUser);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(API_ENDPOINTS.user.updateProfile, user);
    }


    // clearUser(): void {
    //     localStorage.removeItem(this.storageKey);
    //     this.userSubject.next(null);
    // }
}