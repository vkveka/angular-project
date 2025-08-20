import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "../services/token.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(TokenService).getToken();
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
}