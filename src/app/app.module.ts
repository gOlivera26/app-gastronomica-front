import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeUsuariosComponent } from './home-usuarios/home-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatMenuModule} from '@angular/material/menu';
import { AuthInterceptor } from '../services/interceptor/interceptor';
import { VerDetallesUsuarioComponent } from './ver-detalles-usuario/ver-detalles-usuario.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { MatTooltip } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUsuariosComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerificationCodeComponent,
    VerDetallesUsuarioComponent,
    ListadoUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatMenuModule,
    MatTooltip
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
