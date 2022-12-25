import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        AppRoutingModule,
        NgbModule,
        CoreModule.forRoot(),
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('access_token');
                }
            }
        })
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
