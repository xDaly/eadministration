import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptorService } from "./LoaderInterceptorService";
import { TokenInterceptor } from "./TokenInterceptor";

export const httpInterceptorProviders = [
    /*{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },*/
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
]
