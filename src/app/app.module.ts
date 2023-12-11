import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DarkModeComponent } from './Components/dark-mode/dark-mode.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PackagesModule } from "./Components/packages/packages.module"
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component'
import { LogoutComponent } from './Components/logout/logout.component';
import { MainComponent } from './Components/main/main.component'


@NgModule({
  declarations: [
    AppComponent,
    DarkModeComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SideNavComponent,
    NotFoundComponent,
    LoginComponent,
    LogoutComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PackagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
