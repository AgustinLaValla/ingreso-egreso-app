import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

const SharedComponents = [FooterComponent, NavbarComponent, SidebarComponent]

@NgModule({
    declarations: [SharedComponents],
    imports: [ CommonModule, RouterModule ],
    exports: [SharedComponents],
    providers: [],
})
export class SharedModule {}