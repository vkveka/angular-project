import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface User {
    id: number;
    username: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private readonly storageKey = 'user_data';
    private userSubject = new BehaviorSubject<User | null>(this.getUser());

    user$ = this.userSubject.asObservable();

    setUser(user: User): void {
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.userSubject.next(user);
    }

    getUser(): User | null {
        const userData = localStorage.getItem(this.storageKey);
        return userData ? JSON.parse(userData) as User : null;
    }

    clearUser(): void {
        localStorage.removeItem(this.storageKey);
        this.userSubject.next(null);
    }
}