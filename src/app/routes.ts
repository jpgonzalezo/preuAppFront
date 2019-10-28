import { AuthorizatedGuard, AuthorizatedGuardProfesor, AuthorizatedGuardAlumno, AuthorizatedGuardApoderado } from 'src/app/componentes/authorizated.guard';

export const routes = [
    {
        path: '',
        //component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'admin', loadChildren: './componentes/administrador/administrador.module#AdministradorModule', canActivate:[ AuthorizatedGuard ] },
            { path: 'profesor', loadChildren: './componentes/profesor/profesor.module#ProfesorModule', canActivate:[ AuthorizatedGuardProfesor ] },
            { path: 'alumno', loadChildren: './componentes/alumno/alumno.module#AlumnoModule', canActivate:[ AuthorizatedGuardAlumno ] },
            { path: 'inicio', loadChildren: './componentes/inicio/inicio.module#InicioModule'},
            { path: 'apoderado', loadChildren: './componentes/apoderado/apoderado.module#ApoderadoModule', canActivate:[ AuthorizatedGuardApoderado ]}
        ]
    },
    { path: '**', redirectTo: 'inicio' }
];
