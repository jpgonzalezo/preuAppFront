export interface Anotacion{
    id: number,
    profesor: string;
    titulo: string;
    detalle: string;
    alumno: string;
    fecha: string;
}

export const ANOTACION_DATA: Anotacion[] = [
    {
        id:1,
        profesor: "Juan Pablo Gonzalez Opazo",
        titulo: "Comportamiento",
        detalle: "Se porta mal",
        alumno: "Alumno de prueba",
        fecha: "2011-09-29"
    },
    {
        id:2,
        profesor: "Juan Pablo Gonzalez Opazo",
        titulo: "Comportamiento",
        detalle: "Se porta mal",
        alumno: "Alumno de prueba",
        fecha: "2011-09-29"
    },
    {
        id:3,
        profesor: "Juan Pablo Gonzalez Opazo",
        titulo: "Comportamiento",
        detalle: "Se porta mal",
        alumno: "Alumno de prueba",
        fecha: "2011-09-29"
    },
]