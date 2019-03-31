export const routes = [

    {
        path: '',
        //component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'admin', loadChildren: './componentes/administrador/administrador.module#AdministradorModule' },
        ]
    },
    
    // Not found
    { path: '**', redirectTo: 'inicio' }

];
