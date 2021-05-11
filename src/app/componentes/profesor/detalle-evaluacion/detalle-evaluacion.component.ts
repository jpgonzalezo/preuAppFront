import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PruebaService } from 'src/app/servicios/prueba.service';
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
import { TopicoService } from 'src/app/servicios/topico.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { Prueba } from 'src/app/modelos/prueba.model';
import { Topico } from 'src/app/modelos/topico.model';
import { Respuesta } from 'src/app/modelos/respuesta.model'
import { Pregunta } from 'src/app/modelos/pregunta.model';
import { Evaluacion } from 'src/app/modelos/evaluacion.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet, } from 'ng2-charts';
import swal from 'sweetalert2';
import { Alumno } from 'src/app/modelos/alumno.model';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { PreguntaService } from 'src/app/servicios/pregunta.service';

@Component({
  selector: 'app-detalle-evaluacion',
  templateUrl: './detalle-evaluacion.component.html',
  styleUrls: ['./detalle-evaluacion.component.css']
})
export class DetalleEvaluacionComponent implements OnInit {
  id_evaluacion: string;
  prueba: Prueba;
  topicos: Topico[];
  preguntas: Pregunta[];
  evaluaciones: Evaluacion[];
  pageTopico: number;
  pageSizeTopico: number;
  collectionSizeTopico: number;
  pagePreguntas: number;
  pageSizePreguntas: number;
  collectionSizePreguntas: number;
  pageEvaluacionesRealizadas: number;
  pageSizeEvaluacionesRealizadas: number;
  collectionSizeEvaluacionesRealizadas: number;
  public barChartOptionsPreguntas: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsPreguntas: Label[] = [];
  public barChartTypePreguntas: ChartType = 'bar';
  public barChartLegendPreguntas = true;
  public barChartPluginsPreguntas = [pluginDataLabels];
  public barChartDataPreguntas: ChartDataSets[] = [{ data: [], label: '' }];
  public barChartOptionsTopicos: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsTopicos: Label[] = [];
  public barChartTypeTopicos: ChartType = 'bar';
  public barChartLegendTopicos = true;
  public barChartPluginsTopicos = [pluginDataLabels];
  public barChartDataTopicos: ChartDataSets[] = [{ data: [], label: '' }];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';
  token: string
  banderaAgregarPregunta = false
  banderaPosicionarPregunta = false
  banderaEliminarPregunta = false
  loading: boolean = false;
  loadPrueba: boolean = true;
  loadEvaluacionesRealizadas: boolean = true;
  loadGraficoRendimientoPreguntas: boolean = true;
  loadGraficoRendimientoTopicos: boolean = true;
  loadGraficoRendimientoCursos: boolean = true;
  selectedFiles: File = null;
  constructor(
    private _pruebaService: PruebaService,
    private _activatedRoute: ActivatedRoute,
    private _evaluacionService: EvaluacionService,
    private _localService: LocalService,
    private _asignaturaService: AsignaturaService,
    private _storageService: StorageService,
    private _topicoService: TopicoService,
    private _preguntaService: PreguntaService,
    private _router: Router) {
    this.prueba = new Prueba()
    this.pageTopico = 1;
    this.pageSizeTopico = 10;
    this.pagePreguntas = 1;
    this.pageSizePreguntas = 10;
    this.pageEvaluacionesRealizadas = 1;
    this.pageSizeEvaluacionesRealizadas = 10;
    this.topicos = []
    this.evaluaciones = []
    this.preguntas = []
  }

  ngOnInit() {
    if (this._storageService.getCurrentToken() == null) {
      this.token = this._localService.getToken()
    }
    else {
      this.token = this._storageService.getCurrentToken()
    }
    this.id_evaluacion = this._activatedRoute.snapshot.paramMap.get('id');
    this.getPrueba()
    this.getEvaluacionesRealizadas()
    this.getGraficoRendimientoPreguntas()
    this.getGraficoRendimientoTopicos()
    this.getGraficoRendimientoCursos()
  }

  getPrueba() {
    this.loadPrueba = true;
    this._pruebaService.getPrueba(this.id_evaluacion, this.token).subscribe((data: Prueba) => {
      this.prueba = data
      this.topicos = data.topicos
      this.preguntas = data.preguntas
      this.collectionSizeTopico = this.topicos.length
      this.collectionSizePreguntas = this.prueba.preguntas.length
      this.loadPrueba = false;
    })
  }

  getGraficoRendimientoPreguntas() {
    this.loadGraficoRendimientoPreguntas = true;
    this._pruebaService.getGraficoRendimientoPreguntas(this.id_evaluacion, this.token).subscribe((data: any) => {
      this.barChartLabelsPreguntas = data['labels']
      this.barChartDataPreguntas = data['data']
      this.loadGraficoRendimientoPreguntas = false;
    })
  }

  getGraficoRendimientoTopicos() {
    this.loadGraficoRendimientoTopicos = true;
    this._pruebaService.getGraficoRendimientoTopicos(this.id_evaluacion, this.token).subscribe((data: any) => {
      this.barChartLabelsTopicos = data['labels']
      this.barChartDataTopicos = data['data']
      this.loadGraficoRendimientoTopicos = false;
    })
  }

  getGraficoRendimientoCursos() {
    this.loadGraficoRendimientoCursos = true;
    this._pruebaService.getGraficoRendimientoCursos(this.id_evaluacion, this.token).subscribe((data: any) => {
      this.doughnutChartLabels = data['labels']
      this.doughnutChartData = data['data']
      this.loadGraficoRendimientoCursos = false;
    })
  }

  getEvaluacionesRealizadas() {
    this.loadEvaluacionesRealizadas = true
    this._evaluacionService.getEvaluacionesPrueba(this.id_evaluacion, this.token).subscribe((data: Evaluacion[]) => {
      this.evaluaciones = data
      if (this.evaluaciones.length > 0) {
        this.banderaAgregarPregunta = true
        this.banderaPosicionarPregunta = true
        this.banderaEliminarPregunta = true
      }
      this.loadEvaluacionesRealizadas = false;
      this.collectionSizeEvaluacionesRealizadas = this.evaluaciones.length
    })
  }

  registrarEvaluaciones() {
    this._asignaturaService.getCursosAsignatura(this.token).subscribe((data: any[]) => {
      var cursos = {}
      for (let curso of data) {
        cursos[curso.id] = curso.nombre
      }
      cursos[""] = "Seleccione un Curso"
      swal.fire({
        title: 'Cursos Disponibles',
        text: 'Seleccione el curso al que desea registrar la evaluación.',
        input: 'select',
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        inputOptions: cursos,
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value === "") {
              resolve('Debes seleccionar un tópico')
            } else {
              resolve()
            }
          })
        }
      }).then((result) => {
        if (result.dismiss == null) {
          this._router.navigateByUrl('/profesor/detalle/evaluacion/' + this.id_evaluacion + '/registrar/curso/' + result.value)
        }
      })
    })
  }

  volver() {
    this._router.navigateByUrl('/profesor');
  }

  verAlternativas(respuestas: Respuesta[], alumno: Alumno): void {
    let html = '';
    html += '<table class="table table-striped">';
    html += '<thead>';
    html += '<tr>';
    html += '<th scope="col">Pregunta</th>';
    html += '<th scope="col">Alternativa Seleccionada</th>';
    html += '<th scope="col">Correcta</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    for (var i = 0; i < respuestas.length; i++) {
      html += '<tr>';
      html += '<th scope="row">' + respuestas[i].numero_pregunta + '</th>';
      html += '<td>' + respuestas[i].alternativa + '</td>';
      if (respuestas[i].correcta) {
        html += '<td><i class="fas fa-check-circle text-success"></i></td>';
      }
      else {
        html += '<td><i class="fas fa-times text-danger"></i></td>';
      }
      html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';

    swal.fire({
      title: 'Respuestas ' + alumno.nombres + " " + alumno.apellido_paterno + " " + alumno.apellido_materno,
      type: 'info',
      html: html,
      confirmButtonColor: '#2dce89',
      confirmButtonText: 'Cerrar'
    });
  }

  asignarTopico() {
    this._topicoService.getTopicosAsignaturaToken(this.token).subscribe((data: Topico[]) => {
      var topicosDisponibles = {}
      topicosDisponibles[''] = "Seleccione un tópico"
      for (let topico of data) {
        var bandera = false
        for (let topicoPrueba of this.prueba.topicos) {
          if (topicoPrueba.id == topico.id) {
            bandera = true
          }
        }
        if (!bandera) {
          topicosDisponibles[topico.id] = topico.nombre
        }
      }
      swal.fire({
        title: 'Tópicos Disponibles',
        text: 'Seleccione el tópico que desea agregar',
        input: 'select',
        inputOptions: topicosDisponibles,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#2dce89',
        cancelButtonColor: '#fb6340',
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value === "") {
              resolve('Debes seleccionar un tópico')
            } else {
              resolve()
            }
          })
        }
      }).then((result) => {
        if (result.dismiss == null) {
          this.loading = true
          this._pruebaService.agregarTopico(result.value, this.id_evaluacion, this.token).subscribe((data) => {
            this.loading = false
            if (data['Response'] == "exito") {
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha agregado el tópico exitosamente!',
                type: 'success',
                confirmButtonColor: '#2dce89',
              }).then((result) => {
                this.getPrueba()
                this.getEvaluacionesRealizadas()
                this.getGraficoRendimientoCursos()
                this.getGraficoRendimientoPreguntas()
                this.getGraficoRendimientoTopicos()
              })
            }
          })
        }
      })
    })
  }

  agregarPregunta() {
    var topicos = {}
    topicos[''] = "Seleccione un tópico"
    for (let topico of this.topicos) {
      topicos[topico.id] = topico.nombre
    }
    //AGREGAR UNA PREGUNTA TIPO TAREA
    if (this.prueba.tipo == "TAREA") {
      swal.fire({
        title: 'Nueva Pregunta',
        text: 'Seleccione el tópico al que pertenece la pregunta',
        input: 'select',
        inputOptions: topicos,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#2dce89',
        cancelButtonColor: '#fb6340',
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value === "") {
              resolve('Debes seleccionar un TÓPICO')
            } else {
              resolve()
            }
          })
        }
      }).then((result) => {
        if (result.dismiss == null) {
          this.loading = true
          this._pruebaService.agregarPregunta(this.id_evaluacion, this.token, result.value, 'TAREA', '').subscribe((data) => {
            this.loading = false
            if (data['Response'] == "exito") {
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha agregado la pregunta correctamente.',
                type: 'success',
                confirmButtonColor: '#2dce89',
              }).then((result) => {
                this.getPrueba()
                this.getEvaluacionesRealizadas()
                this.getGraficoRendimientoCursos()
                this.getGraficoRendimientoPreguntas()
                this.getGraficoRendimientoTopicos()
              })
            }
          })
        }
      })
    }
    //AGREGAR UNA PREGUNTA TIPO ENSAYO O TALLER
    else {
      swal.mixin({
        title: 'Nueva Pregunta',
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        progressSteps: ['1', '2'],
        confirmButtonColor: '#2dce89',
        cancelButtonColor: '#fb6340',
      }).queue([
        {
          title: 'Tópico Pregunta',
          text: 'Seleccione el tópico al que pertenece la pregunta',
          input: 'select',
          inputOptions: topicos,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
          confirmButtonColor: '#2dce89',
          cancelButtonColor: '#fb6340',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value === "") {
                resolve('Debes seleccionar un TÓPICO')
              } else {
                resolve()
              }
            })
          }
        },
        {
          title: 'Alternativa Pregunta',
          text: 'Seleccione la alternativa correcta para la pregunta',
          input: 'select',
          inputOptions: {
            '': 'Seleccione una alternativa',
            'A': 'A',
            'B': 'B',
            'C': 'C',
            'D': 'D',
            'E': 'E'
          },
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
          confirmButtonColor: '#2dce89',
          cancelButtonColor: '#fb6340',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value === "") {
                resolve('Debes seleccionar una alternativa')
              } else {
                resolve()
              }
            })
          }
        }
      ]).then((result) => {
        if (result.dismiss == null) {
          this.loading = true
          this._pruebaService.agregarPregunta(this.id_evaluacion, this.token, result.value[0], 'ENSAYOTALLER', result.value[1]).subscribe((data) => {
            this.loading = false
            if (data['Response'] == "exito") {
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha agregado la pregunta correctamente.',
                type: 'success',
                confirmButtonColor: '#2dce89',
              }).then((result) => {
                this.getPrueba()
                this.getEvaluacionesRealizadas()
                this.getGraficoRendimientoCursos()
                this.getGraficoRendimientoPreguntas()
                this.getGraficoRendimientoTopicos()
              })
            }
          })
        }
      })

    }
  }

  deleteEvaluacion(id: string) {
    swal.fire({
      title: 'Borrar Evaluación',
      text: "Desea borrar esta evaluación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.dismiss == null) {
        this.loading = true
        this._evaluacionService.deleteEvaluacion(id, this.token).subscribe((data) => {
          this.loading = false
          if (data['Response'] == 'borrado') {
            swal.fire({
              title: 'Borrado!',
              text: 'Se ha borrado el tópico exitosamente.',
              type: 'success',
              confirmButtonColor: '#2dce89',
            }).then((result) => {
              this.getPrueba()
              this.getEvaluacionesRealizadas()
              this.getGraficoRendimientoCursos()
              this.getGraficoRendimientoPreguntas()
              this.getGraficoRendimientoTopicos()
            })
          }
        })
      }
    })
  }

  editarEvaluacion(id) {
    swal.fire({
      title: 'Edición de Evaluación',
      text: 'Seleccione el modo de edición que desea utilizar.',
      input: 'select',
      inputOptions: {
        "": "Seleccione un modo de edición",
        "puntaje": "Editar Puntaje",
        "alternativa": "Editar Alternativas"
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value === "") {
            resolve('Debes seleccionar un modo de edición')
          } else {
            resolve()
          }
        })
      }
    }).then((result) => {
      if (result.dismiss == null) {
        if (result.value == "puntaje") {
          swal.fire({
            title: 'Edición de Puntaje',
            text: 'Ingrese el nuevo puntaje para la evaluación',
            type: 'question',
            input: 'number',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2dce89',
            cancelButtonColor: '#fb6340',
            onOpen: function () {
              swal.disableConfirmButton();
              swal.getInput().addEventListener('keyup', function (e) {
                if ((<HTMLInputElement>event.target).value === '') {
                  swal.disableConfirmButton();
                }
                else {
                  swal.enableConfirmButton();
                }
              })
            }
          }).then((result) => {
            if (result.dismiss == null) {
              if (result.value > 850 || result.value < 0) {
                swal.fire({
                  type: 'error',
                  title: 'Error en el registro',
                  text: 'El puntaje ingresado no es válido',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#2dce89',
                }).then((result) => {
                  this.editarEvaluacion(id)
                })
              }
              else {
                this.loading = true
                this._evaluacionService.cambiarPuntaje(id, result.value, this.token).subscribe((data) => {
                  this.loading = false
                  if (data['Response'] == "exito") {
                    swal.fire({
                      title: 'Registro exitoso',
                      text: 'Se ha agregado la pregunta correctamente.',
                      type: 'success',
                      confirmButtonColor: '#2dce89',
                    }).then((result) => {
                      this.getPrueba()
                      this.getEvaluacionesRealizadas()
                      this.getGraficoRendimientoCursos()
                      this.getGraficoRendimientoPreguntas()
                      this.getGraficoRendimientoTopicos()
                    })
                  }
                })
              }
            }
          })
        }
        if (result.value == "alternativa") {
          this._router.navigateByUrl('/profesor/detalle/evaluacion/' + id + '/editar')
        }
      }
    })
  }
  eliminarPregunta(numero: number) {
    swal.fire({
      title: 'Borrar Pregunta de la Evaluación',
      text: "Desea borrar esta pregunta de la evaluación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.dismiss == null) {
        this.loading = true
        this._pruebaService.deletePregunta(this.id_evaluacion, numero, this.token).subscribe((data) => {
          this.loading = false
          if (data['Response'] == 'borrado') {
            swal.fire({
              title: 'Borrado!',
              text: 'Se ha borrado la pregunta exitosamente.',
              type: 'success',
              confirmButtonColor: '#2dce89',
            }).then((result) => {
              this.getPrueba()
              this.getEvaluacionesRealizadas()
              this.getGraficoRendimientoCursos()
              this.getGraficoRendimientoPreguntas()
              this.getGraficoRendimientoTopicos()
            })
          }
        })
      }
    })
  }

  deleteTopicoPrueba(id: string) {
    swal.fire({
      title: 'Borrar Tópico de Evaluación',
      text: "Desea borrar este Tópico de la evaluación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.dismiss == null) {
        var bandera = false
        for (let pregunta of this.prueba.preguntas) {
          if (pregunta.topico.id == id) {
            bandera = true
          }
        }

        if (!bandera) {
          this.loading = true
          this._topicoService.deleteTopicoPrueba(id, this.id_evaluacion, this.token).subscribe((data: any) => {
            this.loading = false
            if (data['Response'] == 'borrado') {
              swal.fire({
                title: 'Borrado!',
                text: 'Se ha borrado el tópico exitosamente.',
                type: 'success',
                confirmButtonColor: '#2dce89',
              }).then((result) => {
                this.getPrueba()
                this.getEvaluacionesRealizadas()
                this.getGraficoRendimientoCursos()
                this.getGraficoRendimientoPreguntas()
                this.getGraficoRendimientoTopicos()
              })
            }
          })
        }

        else {
          swal.fire({
            title: 'Error al eliminar Tópico',
            text: 'Actualmente hay una o más pregunta asignadas a este tópico.',
            type: 'error',
            confirmButtonColor: '#2dce89',
          }).then((result) => {
            this.getPrueba()
            this.getEvaluacionesRealizadas()
            this.getGraficoRendimientoCursos()
            this.getGraficoRendimientoPreguntas()
            this.getGraficoRendimientoTopicos()
          })
        }
      }
    })
  }

  subirPosicionPregunta(numero: number) {
    this._pruebaService.subirPregunta(this.id_evaluacion, numero, this.token).subscribe((data) => {
      if (data['Response'] == 'exito') {
        this.getPrueba()
        this.getEvaluacionesRealizadas()
        this.getGraficoRendimientoCursos()
        this.getGraficoRendimientoPreguntas()
        this.getGraficoRendimientoTopicos()
      }
    })
  }

  bajarPosicionPregunta(numero: number) {
    this._pruebaService.bajarPregunta(this.id_evaluacion, numero, this.token).subscribe((data) => {
      if (data['Response'] == 'exito') {
        this.getPrueba()
        this.getEvaluacionesRealizadas()
        this.getGraficoRendimientoCursos()
        this.getGraficoRendimientoPreguntas()
        this.getGraficoRendimientoTopicos()
      }
    })
  }

  get topicos_tabla(): Topico[] {
    return this.topicos
      .map((topico, i) => ({ id: i + 1, ...topico }))
      .slice((this.pageTopico - 1) * this.pageSizeTopico, (this.pageTopico - 1) * this.pageSizeTopico + this.pageSizeTopico);
  }

  get preguntas_tabla(): Pregunta[] {
    return this.preguntas
      .map((pregunta, i) => ({ id: i + 1, ...pregunta }))
      .slice((this.pagePreguntas - 1) * this.pageSizePreguntas, (this.pagePreguntas - 1) * this.pageSizePreguntas + this.pageSizePreguntas);
  }

  get evaluaciones_realizadas_tabla(): Evaluacion[] {
    return this.evaluaciones
      .map((evaluacion, i) => ({ id: i + 1, ...evaluacion }))
      .slice((this.pageEvaluacionesRealizadas - 1) * this.pageSizeEvaluacionesRealizadas, (this.pageEvaluacionesRealizadas - 1) * this.pageSizeEvaluacionesRealizadas + this.pageSizeEvaluacionesRealizadas);
  }

  downloadExcel() {
    this._preguntaService.getPlantilla(this.token).subscribe((response: any) => {
      console.log(response)
      const url = window.URL.createObjectURL(
        new Blob([response])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "plantilla_preguntas.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    })

  }

  selectFile(event) {
    this.selectedFiles = event.target.files[0];
    this.addArchivo()
  }

  addArchivo() {
    this.loading = true;
    const file = this.selectedFiles;
    console.log(this.selectedFiles)
    var formData = new FormData()
    formData.append('file', file)
    this._pruebaService.uploadExcel(this.token, formData, this.id_evaluacion).subscribe((data: any) => {
      this.loading = false;
      if (data["error"] !== undefined) {
        swal.fire({
          type: 'error',
          title: 'Error en el servidor',
          text: data["error"],
          confirmButtonColor: '#5cb85c',
          confirmButtonText: 'Aceptar',
        })
      } else {
        swal.fire({
          type: 'success',
          title: 'Carga exitosa',
          text: 'Carga realizada con éxito.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#5cb85c',
        }).then((result2) => {
          if (result2 || result2.dismiss) {
            this.getPrueba()
            this.getEvaluacionesRealizadas()
            this.getGraficoRendimientoPreguntas()
            this.getGraficoRendimientoTopicos()
            this.getGraficoRendimientoCursos()
          }
        })
      }
    },
      (error) => {
        this.loading = false;
        swal.fire({
          type: 'error',
          title: 'Error en el servidor',
          text: 'Ocurrió un error en el servidor, intente más tarde',
          confirmButtonColor: '#5cb85c',
          confirmButtonText: 'Aceptar',
        })
      });
    this.selectedFiles = null

  }

}
