import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export class ErrorInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).catch(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                localStorage.removeItem('access_token')
                location.reload(true);
            }
    
            const error = err.error.message || err.statusText;
            return throwError(error);
        });
    }
}
