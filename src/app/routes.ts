import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./feature/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: '**',
        loadChildren: () => import('./feature/pages/nopagefound/nopagefound.module').then(m => m.NopagefoundModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        // AuthRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
