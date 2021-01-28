import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos


const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./core/feature/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: '**',
        loadChildren: () => import('./core/feature/pages/nopagefound/nopagefound.module').then(m => m.NopagefoundModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        //   PagesRoutingModule,
        //   AuthRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
