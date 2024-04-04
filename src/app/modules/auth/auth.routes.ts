import { Route } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";

export const AUTH_ROUTES: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
];
