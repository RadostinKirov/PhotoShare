import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './app.user-routing,module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { ConfirmEqualValidatorDirective } from '../shared/confirm-equal-valiator.directive';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [

    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  providers: [
    CookieService,
    UserService
  ] 
})
export class UserModule { }
