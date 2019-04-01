import { AuthorizatedGuard } from 'src/app/componentes/authorizated.guard';
export const routes = [

    {
        path: '',
        //component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'admin', loadChildren: './componentes/administrador/administrador.module#AdministradorModule', canActivate:[ AuthorizatedGuard ] },
            { path: 'inicio', loadChildren: './componentes/inicio/inicio.module#InicioModule'},
        ]
    },
    
    // Not found
    { path: '**', redirectTo: 'inicio' }

];
