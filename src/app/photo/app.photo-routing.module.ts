import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { CreateComponent } from './create/create.component'
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component'

const routes: Routes = [
    {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthActivate],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login'
        }
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        canActivate: [AuthActivate],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login'
        }
    },
    {

        path: 'edit/:id',
        component: EditComponent,
        canActivate: [AuthActivate],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
