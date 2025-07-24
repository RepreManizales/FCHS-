import React, { useEffect, useState } from 'react';
import './index.css';

declare global {
  interface Window {
    Chart: any;
  }
}

const App: React.Component = () => {
  const [visibleComments, setVisibleComments] = useState('todos');

  // Datos de los comentarios extraídos del documento
  const allComments = [
    { type: 'desacuerdo', text: 'CREO QUE NO ES PERTINENTE Y EL DINERO PUBLICO NO PUEDE INVERTIRSE EN CAPRICHITOS DE UNOS DOCENTES ABURRIDOS' },
    { type: 'desacuerdo', text: 'La actual administración no ha sido clara con los procesos y los recursos, además es proceso inequitativo frente a como se han desarrollado históricamente contrataciones y programas en otras facultades.' },
    { type: 'desacuerdo', text: 'Es un propuesta inmediatista, llena incongruencias y elaborada sin rigor académico y técnico.' },
    { type: 'desacuerdo', text: 'La propuesta carece de rigor académico. No hace un análisis real de las necesidades de formación regionales ni en las áreas de ciencias humanas ni de ciencias sociales. Tampoco toma en cuenta los altos índices de desempleo que actualmente existen en dicho campo de conocimiento. Por otro lado, y no menos grave, no expone con claridad sus sostenibilidad en términos de los recursos requeridos que hacen base presupuestal; es decir, no se sabe de dónde van a sacar las plazas de profesores de tiempo completo que se requieren para ofrecer una docencia de calidad. El presupuesto que supuestamente un a asignar no aumenta la base presupuestal; es decir, una vez se gaste no se seba qué pasará con los profesores a contratar. Así mismo, el proyecto carece de estudios adecuados de impacto en planta física, aumento en los servicios de bienestar y su costo, etc. Realmente la propuesta parece ser más una intención personal de un grupo de profesores con ansias de poder o, en otras palabras, con ansias de ser decanos.' },
    { type: 'desacuerdo', text: 'Propuesta con grandes debilidades misionales (investigacion, extension, docencia), con estándares muy bajos.Preocupante.' },
    { type: 'desacuerdo', text: 'Financiación, planta docente, pertinencia académica (considerando enfoque humanístico que ya tiene la Universidad de Caldas)' },
    { type: 'desacuerdo', text: 'Debemos fortalecer las facultades que ya tenemos, la creación de una nueva generará más complejidades de todo tipo empezando por lo presupuestal y la infraestructura requerida.' },
    { type: 'desacuerdo', text: 'No se ha socializado con la comunidad profesoral en los departamentos y facultades.' },
    { type: 'desacuerdo', text: 'Considero que a pesar de haber sustentación teórica y académica de la nueva facultad, la universidad debe revisar de una manera muy juiciosa y detenida la viabilidad operativa y financiera de esa propuesta que a mi juicio no está bien determinada, pareciera ser un proyecto que se ejecute a toda costa sin tener una base sólida de financiación tanto a mediano como a largo plazo.' },
    { type: 'desacuerdo', text: 'La Universidad debe ser responsable del manejo administrativo y financiero de todos los programas y proyectos, más en especial de los académicos.' },
    { type: 'desacuerdo', text: 'No existe viabilidad económica para su creación.' },
    { type: 'desacuerdo', text: 'Todo se desarrolló en afanes, no hay una planeación programática, parte de un programa con una población exigua que incide en la factibilidad financiera, con dificultades de vinculación laboral' },
    { type: 'desacuerdo', text: 'Es una propuesta que NO responde a la realidad de la Sede, no reconoce las necesidades de la sociedad en la formación de nuestros jóvenes hoy, en la región existen muchos programas asociados a una facultad de ciencias humanas y sociales en universidades públicas.' },
    { type: 'desacuerdo', text: 'Cada Universidad de Caldas. Además, no puede crearse una FCHS con programas de gestión tanto en pregrado como en posgrado.' },
    { type: 'desacuerdo', text: 'Ello corresponde a facultades de Administración, es un adefesio epistemológico.' },
    { type: 'desacuerdo', text: 'De otra parte su estudio que le da origen carece de un verdadero rigor académico y metodológico y más grave sin prospectiva universitaria.' },
    { type: 'desacuerdo', text: 'No existe infraestructura, no existen recursos asegurados en el tiempo, existen facultades similares en la Universidad de Caldas, no soportan el proyecto estudios de admisión en estas áreas en la región y el país, hay alertas por baja admisión en universidades públicas y privadas en estas áreas.' },
    { type: 'desacuerdo', text: 'La sede tiene programas y necesidades sin cubrir por carencia de presupuesto.' },
    { type: 'desacuerdo', text: 'No hay dinero para pagar ocacionales en la FIA, por ejemplo.' },
    { type: 'desacuerdo', text: 'Aunque no es la única razón para el aprendizaje, no hay estudios de empleabilidad, que es un factor que afecta la movilidad social que debería implicar un esfuerzo económico y financiero de las familias más pobres.' },
    { type: 'desacuerdo', text: 'Las profesoras Representantes Profesorales ante el Consejo de Sede se han dado el trabajo de evaluar, alertar y mostrar lo improcedente de esta Facultad.' },
    { type: 'desacuerdo', text: 'Yo como profesor de la Sede estoy en total desacuerdo con su creación, puesto que no tiene soporte académico relevante, afectará ostensiblemente los recursos de la Sede a futuro y no genera cadena de valor.' },
    { type: 'desacuerdo', text: 'No es más que una imposición de esta Vicerrectoría, que parece tener un trasfondo oscuro y cuestionable.' },
    { type: 'desacuerdo', text: 'No hay una propuesta clara, ni rigurosa' },
    { type: 'desacuerdo', text: 'No hay investigación de mercados, ni presupuesto' },
    { type: 'desacuerdo', text: 'Se deberían tener estudios de Mercado más claros para tomar la decisión' },
    { type: 'desacuerdo', text: 'No hay un estudio de mercado previo, no se revisa la estadística de este tipo de facultad en cuanto a ingresos en los ultimos años, o por lo menos no lo presentan' },
    { type: 'desacuerdo', text: 'La idea es que los programas Nuevos, no se solapada con los de la U de Caldas, mucho menos una facultad, esta sede se a caracterizado por ser principalmente, técnica.' },
    { type: 'desacuerdo', text: 'Si ya esto es abordado por otras U\'s de la ciudad, para que "montarles competencia"... o es que hay un gran mercado laboral para los profesionales que de allí egresen ???' },
    { type: 'desacuerdo', text: '¿Cuáles son los criterios de selección de los nuevos programas? ¿Cuál es su demanda y potencial de desarrollo?' },
    { type: 'desacuerdo', text: '¿Cómo se va a financiar esta propuesta y qué razones académicas y financieras soportan la idea de separación de la Facultad de Administración?' },
    { type: 'desacuerdo', text: 'Aparte de los programas de pregrado y posgrado, ¿cómo va a ser el despliegue en investigación y extensión?' },
    { type: 'desacuerdo', text: 'Se duplican las facultdes y careras ya existentes en la Universidad de Caldas.' },
    { type: 'desacuerdo', text: 'Los esfuerzos deben orientarde en fortalecer las Facultades ya existentes.' },
    { type: 'dudas', text: 'Me preocupa la sostenibilidad financiera a futuro de la Facultad y la tibia proposición de innovación.' },
    { type: 'dudas', text: 'La creación de una Facultad debe responder a necesidades académicas, contextuales, y pertinentes reales, no a promesas electoreras de las directivas que desconocen el devenir de un saber que posee una la memoria histórica, que con el tiempo ejerce una presión frente al sistema y órganos académicos y directivos universitarios, la creación de una facultad no se justifica solo diciendo que los profesores requieren un nicho académico, es tan subjetiva, además constituir una facultad desmantelando o anexando instancias que se consideran humanísticas o sociales, no es una argumentación seria, una facultad donde la participación es segada sólo a un grupo. Es necesario una propuesta que verdaderamente responda a las necesidades de formación no migrando programas de otras sedes, con profesores que seguirán con las mismas rutinas y mañas, sin actualización metodológica y mucho menos didáctica y pedagógica.' },
    { type: 'dudas', text: 'Una propuesta seria de creación de la facultad nunca debe responder a "las cargas se arreglan en el camino" argumentos que evidencias la falta de consistencia de la propuesta.Muchas gracias.' },
    { type: 'dudas', text: 'Financiación del nuevo programa' },
    { type: 'dudas', text: 'NO existe ningún documento seriamente elaborado, con información rigurosa, que permita inferir si la creación de la Facultad es o no una idea necesaria para la sociedad, financieramente sostenible y académicamente pertinente.' },
    { type: 'dudas', text: 'Sólo he visto profesores que argumentan que su trabajo histórico en el área o el no "torpedear" otros procesos el pasado constituyen requisitos suficientes o utilizan el chantaje mezquino de "grandeza histórica".' },
    { type: 'dudas', text: 'La verdadera grandeza de un académico está en hacer lo correcto, en usar la ciencia como instrumento de decisión.' },
    { type: 'dudas', text: 'Considero que hace falta una discusión más profunda sobre la pertinencia o no de la facultad mencionada, con el rigor académico que amerita la universidad' },
    { type: 'dudas', text: 'Creo que puede generarse mucha burocracia e incremetar gastos de funcionamiento, poruqe mejor no crean mas programas del área y cuando tenga estudiantes y sean un grupo mayor si se analice la creación de la facultad.' },
    { type: 'dudas', text: 'Esto lo pueden hacer al interior de la fac de adminstración mientras tanto' },
    { type: 'dudas', text: 'El documento de creación fue objeto de observaciones muy específicas sobre su alcance, calidad y nivel de detalle. Para mí, la creación de esta o cualquier otra facultad no debe depender exclusivamente de criterios de "mercado" o utilidad, pero sí debe tener un espectro de posibilidades académicas sólidamente argumentadas. Es válido, pero no suficiente, considerar que es un viejo anhelo, pues de esos hay muchos en esta y otras sedes, pero no es el único criterio para impulsarla.' },
    { type: 'dudas', text: 'Para justificar la creación de esta facultad, se propone ofrecer un programa en “Idiomas y Filología” (no recuerdo con exactitud el nombre), el cual, en mi opinión, es fácilmente reemplazable por herramientas de inteligencia artificial.Se crea esta carrera con el pretexto de otorgar plazas de tiempo completo a los actuales profesores de inglés de la sede, cuando en verdad ellos no necesariamente tendrían las plazas porque habría que hacer un concurso público de méritos.Estaría de acuerdo con esta iniciativa si se contemplara la apertura de programas académicos que no tengan equivalentes en otras sedes de la Universidad Nacional y que respondan a necesidades urgentes del país, tales como:* Antropología forense* Psicología forense* Desarrollo sostenible' },
    { type: 'dudas', text: 'Creo que el comunicado de los representantes profesorales al consejo académico expresaron muy bien las razones por las cuales considero que no hay un análisis riguroso tanto técnico como financiero/administrativo para mostrar que la facultad es necesaria y pertiente.' },
    { type: 'dudas', text: 'Entiendo las motivaciones de quienes fueron mis colegas en el Departamento de Ciencias Humanas para buscar una forma de “emancipación epistémica” respecto de la Facultad de Administración, cuyo objeto de estudio puede parecer, en efecto, en las antípodas de las ciencias sociales y humanas. También considero legítimos tanto el deseo de crecimiento profesional y académico de varios integrantes del colectivo, como los intereses de quienes integran el Centro de Idiomas.Sin embargo, en fases decisivas de construcción de la propuesta no se tuvieron en cuenta las voces de quienes integramos el Departamento de Ciencias Humanas. Esto resulta política y moralmente incoherente con uno de los principios que inspira la creación de la nueva Facultad: la integración y el fortalecimiento de las ciencias humanas y sociales.Hizo falta convocar a más espacios de discusión, con garantías reales de escucha —sin prejuicios y sin sofocar las voces contrarias—. Lamentablemente, algunos de quienes lideraron la propuesta adoptaron actitudes francamente violentas. Si se busca fomentar la expansión de las ciencias sociales y humanas, así como el cultivo de las Humanidades, estamos llamados a predicar con el ejemplo.Adicionalmente, el proceso ha estado marcado por una preocupante desinformación, ya que se han desestimado a priori objeciones valiosas. Entre ellas destaco:La objeción sobre la viabilidad financiera: resulta natural, como servidores públicos, preocuparnos por la existencia real de los recursos necesarios para financiar un proyecto de esta magnitud.La objeción sobre la planificación académica: más allá de los estudios de mercado que sugieren una buena acogida para carreras como Filología o Ciencias Políticas, inquieta que, tras varios años de existencia del programa de Gestión Cultural y Comunicativa, los procesos de acreditación de alta calidad aún no se hayan consolidado.Crear nuevos programas no puede responder únicamente a un anhelo de crecimiento institucional. Se requiere una justificación académica seria, comprometida con la excelencia y la responsabilidad pública.' },
    { type: 'dudas', text: 'No estoy segura de la pertinencia de una nueva facultad, ni de los programas propuestos.' },
    { type: 'dudas', text: 'Considero que no responden a ninguna de las expectativas que la sociedad tiene de nuestra sede y que, por el contrario, entra a duplicar esfuerzos que otras instituciones de la región ya adelantan con mas trayectoria y reconocimiento.' },
    { type: 'dudas', text: 'Me preocupa que un programa como GESTIÓN CULTURAL Y COMUNICATIVA que, según su denominación y el perfil del egresado que se publica, pertenece al campo de la administración, sea puesto como punta de lanza de este proyecto.' },
    { type: 'acuerdo', text: 'Es fundamental que se cree esta Facultad, no solo para la sede, sino para la ciudad e incluso para la región.' },
    { type: 'acuerdo', text: 'Que no se vean afectadas las Facultades existentes, es decir, que no afecte la solicitud de presupuesto, instalaciones, laboratorios y personal en las facultades existentes, y que se garanticen nuevos recursos para la Sede, que no afecten a las Facultades existentes, que sea sostenible en personal docente y administrativo, y que realmente sea una necesidad de la región.' },
    { type: 'acuerdo', text: 'Sin observaciones' },
    { type: 'acuerdo', text: 'Tenemos una sede con base en las ciencias duras, que requieren una visión humanista,la cual escacea en la mayoría de programas,será de gran utilidad ampliar esos horizontes desde una perspectiva de un facultad cómo.la que se proponeEl mundo requiere de más humanismo y menos mercantilismo' },
    { type: 'acuerdo', text: 'Falta capacidad-racionalidad en una minoría de profesores/as en entender la importancia de la creación de facultad de Ciencias Humanas y sociales, priorizando así la explosión emocional/hormonal en vez de la razónApertura de cupos, nuevas carreras, crecimiento de la región (y de la universidad). Todo queda atado a una polarización estéril de política de rector (Munera vs Peña) y a una "instrumentalizaciòn" de fichas útiles para oponerse a un proyecto en el que todos/as podemos aportar. En sintesis, mezquindad disfrazada de victimismo y déficit de visión que esconde casos de irregularidades administrativas (doble moral¡¡¡)' },
    { type: 'acuerdo', text: 'Los programas se han empobrecido en la formación sobre ciencias humanas, es requerida la facultad y además exigir un presupuesto digno a nivel nacional para el funcionamiento de la sede Manizales.Da tristeza que se quejen de esta nueva Facultad apoyados(as) en una pelea por un problema que radica en los votos para rector de Diego Torres, que si actuara legalmente, debió haber votado por quien había ganado la consulta entre docentes (ese es el voto legal de a quienes representa).' },
    { type: 'acuerdo', text: 'Todo lo que sea para crecer bienvenido. La Universidad Nacional de Colombia es pionera y reconocida por sus posturas en temas sociales.' },
    { type: 'acuerdo', text: 'La sede Manizales y todas deben serlo también. Ya es hora de dejar de formar robots en Ciencia y pasar a formadores en ciencia pero pensando en la humanidad.' }
  ];

  const commentsByType = {
    todos: allComments,
    desacuerdo: allComments.filter(c => c.type === 'desacuerdo'),
    dudas: allComments.filter(c => c.type === 'dudas'),
    acuerdo: allComments.filter(c => c.type === 'acuerdo'),
  };

  const getCommentHeader = (type) => {
    switch (type) {
      case 'desacuerdo': return 'NO, NO ESTOY DE ACUERDO';
      case 'dudas': return 'TENGO DUDAS';
      case 'acuerdo': return 'SÍ, ESTOY DE ACUERDO';
      default: return '';
    }
  };

  const getCommentColors = (type) => {
    switch (type) {
      case 'desacuerdo': return 'bg-red-50 border-red-200 text-red-800';
      case 'dudas': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'acuerdo': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200';
    }
  };


  useEffect(() => {
    // Cargar Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    script.onload = () => {
      initializeCharts();
    };
    document.head.appendChild(script);

    // Cargar Font Awesome
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(fontAwesome);
    };
  }, []);

  const showTab = (tabName: string, event: React.MouseEvent) => {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Mostrar pestaña seleccionada
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
      targetTab.classList.add('active');
    }
    
    // Activar botón seleccionado
    (event.target as HTMLElement).classList.add('active');
    
    // Inicializar gráficos de la pestaña si es necesario
    setTimeout(() => initializeTabCharts(tabName), 100);
  };

  const initializeCharts = () => {
    if (window.Chart) {
      initializeTabCharts('resumen');
    }
  };

  const initializeTabCharts = (tabName: string) => {
    if (!window.Chart) return;

    const colors = {
      red: '#B8272D',
      lightRed: '#FFEBEE',
      yellow: '#F4D03F',
      lightYellow: '#FFF9C4',
      green: '#94B43B',
      lightGreen: '#E8F5E9',
      blue: '#006BB3',
      lightBlue: '#E3F2FD',
      gray: '#666666',
      lightGray: '#E8E8E8',
      darkGray: '#333333'
    };

    switch(tabName) {
      case 'resumen':
        createConsensusChart();
        createEnrollmentTrendChart();
        break;
      case 'cobertura':
        createDuplicationChart();
        createBaseEnrollmentChart();
        break;
      case 'financiero':
        createInvestmentChart();
        createCostComparisonChart();
        break;
      case 'validacion':
        createStudentParticipationChart();
        createTeacherParticipationChart();
        break;
      case 'proceso':
        createIncorporationChart();
        break;
      case 'encuesta':
        createSurveyDistributionChart();
        createSurveyComparisonChart();
        createCommentsCategoryChart();
        createParticipationByFacultyChart();
        break;
    }

    function createConsensusChart() {
      const ctx = document.getElementById('consensusChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['En Desacuerdo (53.7%)', 'Con Dudas (26.85%)', 'De Acuerdo (19.44%)'],
          datasets: [{
            data: [58, 29, 21],
            backgroundColor: [colors.red, colors.yellow, colors.green],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: { size: 14 }
              }
            }
          }
        }
      });
    }

    function createEnrollmentTrendChart() {
      const ctx = document.getElementById('enrollmentTrendChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2021-1S', '2021-2S', '2022-1S', '2022-2S', '2023-1S', '2023-2S', '2024-1S', '2024-2S'],
          datasets: [{
            label: 'Estudiantes matriculados',
            data: [158, 155, 148, 142, 130, 118, 105, 92],
            borderColor: colors.red,
            backgroundColor: colors.lightRed,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Caída del 42% en matrícula (2021-2024)'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 180
            }
          }
        }
      });
    }

    function createDuplicationChart() {
      const ctx = document.getElementById('duplicationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Manizales', 'Pereira', 'Armenia', 'Ibagué', 'Pasto', 'Mocoa', 'Otros PDET'],
          datasets: [{
            label: 'Programas similares existentes',
            data: [4, 3, 2, 2, 2, 1, 3],
            backgroundColor: colors.red
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }

    function createBaseEnrollmentChart() {
      const ctx = document.getElementById('baseEnrollmentChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2021-1S', '2021-2S', '2022-1S', '2022-2S', '2023-1S', '2023-2S', '2024-1S', '2024-2S'],
          datasets: [{
            label: 'Matrícula Gestión Cultural',
            data: [158, 155, 148, 142, 130, 118, 105, 92],
            backgroundColor: function(context: any) {
              const value = context.dataset.data[context.dataIndex];
              return value < 100 ? colors.red : value < 130 ? colors.yellow : colors.green;
            }
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    function createInvestmentChart() {
      const ctx = document.getElementById('investmentChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4'],
          datasets: [{
            label: 'Inversión anual (Millones COP)',
            data: [8089, 9656, 11405, 12908],
            backgroundColor: colors.blue
          }, {
            label: 'Costo por estudiante (Millones COP)',
            data: [89.9, 53.6, 42.2, 35.9],
            backgroundColor: colors.red,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Inversión Total (Millones COP)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Costo por Estudiante (Millones COP)'
              },
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      });
    }

    function createCostComparisonChart() {
      const ctx = document.getElementById('costComparisonChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['FCHS Año 1', 'FCHS Año 4', 'Universidad Pública Promedio'],
          datasets: [{
            label: 'Costo por estudiante (Millones COP)',
            data: [89.9, 35.9, 15],
            backgroundColor: [colors.red, colors.yellow, colors.green]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y' as const,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Millones COP'
              }
            }
          }
        }
      });
    }

    function createStudentParticipationChart() {
      const ctx = document.getElementById('studentParticipationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['No participaron (93.4%)', 'Participaron (6.6%)'],
          datasets: [{
            data: [5136, 364],
            backgroundColor: [colors.lightGray, colors.blue]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    function createTeacherParticipationChart() {
      const ctx = document.getElementById('teacherParticipationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['No participaron (87.7%)', 'Participaron (12.3%)'],
          datasets: [{
            data: [235, 33],
            backgroundColor: [colors.lightGray, colors.blue]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    function createIncorporationChart() {
      const ctx = document.getElementById('incorporationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['No incorporados (75%)', 'Parcialmente incorporados (25%)'],
          datasets: [{
            data: [3, 1],
            backgroundColor: [colors.red, colors.yellow]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '0 de 3 propuestas sustantivas fueron incorporadas'
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    function createSurveyDistributionChart() {
      const ctx = document.getElementById('surveyDistributionChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['No, no estoy de acuerdo (53.7%)', 'Tengo dudas (26.85%)', 'Sí, estoy de acuerdo (19.44%)'],
          datasets: [{
            data: [58, 29, 21],
            backgroundColor: [colors.red, colors.yellow, colors.green],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: { size: 14 }
              }
            }
          }
        }
      });
    }

    function createSurveyComparisonChart() {
      const ctx = document.getElementById('surveyComparisonChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Consulta Oficial', 'Encuesta Independiente'],
          datasets: [{
            label: 'Participación',
            data: [12.5, 40.91],
            backgroundColor: colors.blue
          }, {
            label: 'A favor / De acuerdo',
            data: [76.4, 19.44],
            backgroundColor: colors.green
          }, {
            label: 'En contra / Desacuerdo',
            data: [23.6, 53.7],
            backgroundColor: colors.red
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value: any) => value + '%'
              }
            }
          }
        }
      });
    }

    function createCommentsCategoryChart() {
      const ctx = document.getElementById('commentsCategoryChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Viabilidad financiera',
            'Pertinencia regional',
            'Rigor académico',
            'Falta de estudios',
            'Proceso apresurado',
            'Duplicación con U. Caldas',
            'Sin consenso',
            'Inversión desproporcionada'
          ],
          datasets: [{
            label: 'Número de menciones',
            data: [26, 23, 19, 17, 14, 12, 10, 8],
            backgroundColor: colors.red
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y' as const,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });
    }

    function createParticipationByFacultyChart() {
      const ctx = document.getElementById('participationByFacultyChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Ing. Eléctrica',
            'Ing. Civil', 
            'Física y Química',
            'Administración',
            'Ing. Química',
            'Arquitectura',
            'Ciencias Humanas',
            'Informática',
            'Ing. Industrial',
            'Matemáticas'
          ],
          datasets: [{
            label: 'En Desacuerdo',
            data: [7, 7, 5, 6, 6, 8, 2, 7, 6, 3],
            backgroundColor: colors.red
          }, {
            label: 'Con Dudas',
            data: [5, 5, 5, 2, 4, 3, 2, 1, 1, 1],
            backgroundColor: colors.yellow
          }, {
            label: 'De Acuerdo',
            data: [4, 3, 2, 3, 1, 0, 5, 0, 1, 2],
            backgroundColor: colors.green
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#94B43B] text-white py-5 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 flex items-center gap-8">
          <div className="flex items-center gap-5">
            <div className="w-15 h-15 bg-white rounded-lg flex items-center justify-center font-bold text-[#94B43B] text-lg">
              UNAL
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Análisis Integral - Creación FCHS</h1>
            <p className="text-base opacity-90">Universidad Nacional de Colombia - Sede Manizales</p>
          </div>
        </div>
      </header>

      {/* Navegación */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 flex gap-0 overflow-x-auto">
          <button 
            className="tab-button active border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('resumen', e)}
          >
            <i className="fas fa-chart-line mr-2"></i> Resumen Ejecutivo
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('cobertura', e)}
          >
            <i className="fas fa-university mr-2"></i> Análisis de Cobertura
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('financiero', e)}
          >
            <i className="fas fa-dollar-sign mr-2"></i> Análisis Financiero
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('validacion', e)}
          >
            <i className="fas fa-users mr-2"></i> Validación Comunitaria
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('proceso', e)}
          >
            <i className="fas fa-tasks mr-2"></i> Proceso de Construcción
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('objeciones', e)}
          >
            <i className="fas fa-exclamation-triangle mr-2"></i> Objeciones Profesorales
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('encuesta', e)}
          >
            <i className="fas fa-poll mr-2"></i> Encuesta Profesoral
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('ficha', e)}
          >
            <i className="fas fa-file-alt mr-2"></i> Ficha Técnica
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('datos', e)}
          >
            <i className="fas fa-database mr-2"></i> Datos Completos
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Tab 1: Resumen Ejecutivo */}
        <div id="resumen" className="tab-content active">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-red-200">
            <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Evaluación Crítica del Proyecto FCHS</h2>
              <p className="mb-4">El análisis integral identifica 7 puntos críticos que cuestionan la viabilidad del proyecto:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Duplicación de oferta</strong> en 9 de 11 municipios objetivo
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Costo extraordinario</strong>: $89.9M por estudiante (Año 1)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Participación marginal</strong>: Solo 6.6% estudiantes consultados
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Aportes no incorporados</strong>: 0 de 4 propuestas sustantivas incluidas
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Rechazo profesoral</strong>: 53.7% en contra (encuesta independiente)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Discrepancia financiera</strong>: $7,000M sin explicar
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Demanda decreciente</strong>: -42% en programa base (2021-2024)
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-dollar-sign text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$89.9M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo por Estudiante</div>
              <div className="text-xs text-gray-500 mt-1">Año 1</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-percentage text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">6.6%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación Estudiantil</div>
              <div className="text-xs text-gray-500 mt-1">364 de 5,500</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-times-circle text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">53.7%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Profesores en Contra</div>
              <div className="text-xs text-gray-500 mt-1">58 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#006BB3]">
              <i className="fas fa-users text-3xl text-[#006BB3] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">90</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Estudiantes Nuevos/Año</div>
              <div className="text-xs text-gray-500 mt-1">3 programas x 15 x 2</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-pie text-[#94B43B]"></i>
                  Consenso Profesoral
                </h3>
                <p className="text-sm text-gray-600 mt-1">Encuesta independiente con 43.5% de participación</p>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="consensusChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-line text-[#94B43B]"></i>
                  Tendencia de Matrícula - Programa Base
                </h3>
                <p className="text-sm text-gray-600 mt-1">Gestión Cultural y Comunicativa</p>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="enrollmentTrendChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 2: Análisis de Cobertura */}
        <div id="cobertura" className="tab-content">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-yellow-200">
            <div className="w-15 h-15 bg-[#F4D03F] rounded-full flex items-center justify-center text-gray-800 text-2xl flex-shrink-0">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 1: Evaluación de la Cobertura</h2>
              <p className="font-semibold">¿Ampliación Real o Duplicación de Oferta con Fondos Públicos?</p>
              <p className="mt-3">El análisis territorial revela que la propuesta no amplía cobertura, sino que duplica oferta existente en 9 de 11 municipios analizados.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-university text-[#94B43B]"></i>
                Oferta Académica Existente en Territorios Objetivo
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Municipio</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Programa Existente</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Institución Oferente</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Coincide con Propuesta FCHS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Manizales</td>
                      <td className="p-3 border-b border-gray-200">Comunicación Social, Derecho, Psicología, Lenguas Modernas</td>
                      <td className="p-3 border-b border-gray-200">Universidad de Caldas, U. de Manizales</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Duplica</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Pereira</td>
                      <td className="p-3 border-b border-gray-200">Derecho, Comunicación, Educación</td>
                      <td className="p-3 border-b border-gray-200">Universidad Tecnológica de Pereira, U. Libre</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Ciencia Política</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Armenia</td>
                      <td className="p-3 border-b border-gray-200">Comunicación Social y Periodismo</td>
                      <td className="p-3 border-b border-gray-200">Universidad del Quindío</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Filología e Idiomas</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Ibagué (Tolima)</td>
                      <td className="p-3 border-b border-gray-200">Licenciatura en Ciencias Sociales, Derecho</td>
                      <td className="p-3 border-b border-gray-200">Universidad del Tolima</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Duplica</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Pasto (Nariño)</td>
                      <td className="p-3 border-b border-gray-200">Psicología, Comunicación Social</td>
                      <td className="p-3 border-b border-gray-200">Universidad de Nariño</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Duplica</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Mocoa (Putumayo)</td>
                      <td className="p-3 border-b border-gray-200">Lenguas Modernas</td>
                      <td className="p-3 border-b border-gray-200">Universidad de la Amazonia, UNAD</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Filología e Idiomas</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-bar text-[#94B43B]"></i>
                  Análisis de Duplicación por Municipio
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="duplicationChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-line text-[#94B43B]"></i>
                  Matrícula del Programa Base (Tabla 9)
                </h3>
                <p className="text-sm text-gray-600 mt-1">Tendencia decreciente que cuestiona la expansión</p>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="baseEnrollmentChart"></canvas>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <strong>Hallazgo crítico:</strong> El programa Gestión Cultural y Comunicativa muestra una caída del 42% en matrícula (de 158 a 92 estudiantes entre 2021-2024).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 3: Análisis Financiero */}
        <div id="financiero" className="tab-content">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-red-200">
            <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-calculator"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 2: Análisis de la Inversión y Costo por Estudiante</h2>
              <p className="font-semibold">Escenario corregido basado en proyecciones realistas</p>
              <p className="mt-3">Meta: 15 estudiantes nuevos por programa, 3 programas, operación semestral = 90 estudiantes nuevos/año</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-exclamation-triangle text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$89.9M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 1</div>
              <div className="text-xs text-gray-500 mt-1">$8,089M ÷ 90</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-chart-line text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$53.6M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 2</div>
              <div className="text-xs text-gray-500 mt-1">$9,656M ÷ 180</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-dollar-sign text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$42.2M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 3</div>
              <div className="text-xs text-gray-500 mt-1">$11,405M ÷ 270</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-money-bill-wave text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$35.9M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 4</div>
              <div className="text-xs text-gray-500 mt-1">$12,908M ÷ 360</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-chart-bar text-[#94B43B]"></i>
                Inversión Anual Proyectada (Tabla 50)
              </h3>
            </div>
            <div className="p-6">
              <div className="relative h-96">
                <canvas id="investmentChart"></canvas>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-table text-[#94B43B]"></i>
                  Desglose de Costos por Año
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Año</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Egresos Totales</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Estudiantes Acumulados</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Costo/Estudiante</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 1</td>
                        <td className="p-3 border-b border-gray-200">$8,088,803,557</td>
                        <td className="p-3 border-b border-gray-200">90</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$89,875,595</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 2</td>
                        <td className="p-3 border-b border-gray-200">$9,655,561,752</td>
                        <td className="p-3 border-b border-gray-200">180</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$53,642,009</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 3</td>
                        <td className="p-3 border-b border-gray-200">$11,405,263,048</td>
                        <td className="p-3 border-b border-gray-200">270</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$42,241,715</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 4</td>
                        <td className="p-3 border-b border-gray-200">$12,908,141,892</td>
                        <td className="p-3 border-b border-gray-200">360</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$35,855,949</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-balance-scale text-[#94B43B]"></i>
                  Comparación de Costos
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="costComparisonChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 4: Validación Comunitaria */}
        <div id="validacion" className="tab-content">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-yellow-200">
            <div className="w-15 h-15 bg-[#F4D03F] rounded-full flex items-center justify-center text-gray-800 text-2xl flex-shrink-0">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 3: Validación Comunitaria</h2>
              <p className="font-semibold">Apoyo Aparente, Representatividad Mínima</p>
              <p className="mt-3">El proceso de consulta presentó tasas de participación extremadamente bajas que invalidan cualquier pretensión de representatividad estadística.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-graduation-cap text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">6.6%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación Estudiantil</div>
              <div className="text-xs text-gray-500 mt-1">364 de 5,500</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-chalkboard-teacher text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">12.3%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación Docente</div>
              <div className="text-xs text-gray-500 mt-1">33 de 268</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#006BB3]">
              <i className="fas fa-percentage text-3xl text-[#006BB3] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">81.1%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">A Favor (del 6.6%)</div>
              <div className="text-xs text-gray-500 mt-1">Resultado engañoso</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-chart-pie text-[#94B43B]"></i>
                Análisis de Representatividad de la Consulta
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Estudiantes</h4>
                  <div className="relative h-64 mb-4">
                    <canvas id="studentParticipationChart"></canvas>
                  </div>
                  <p className="text-center text-gray-600">
                    Solo 364 de 5,500 estudiantes participaron
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Docentes</h4>
                  <div className="relative h-64 mb-4">
                    <canvas id="teacherParticipationChart"></canvas>
                  </div>
                  <p className="text-center text-gray-600">
                    Solo 33 de 268 docentes participaron
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-exclamation-triangle text-[#94B43B]"></i>
                Debilidades Metodológicas Críticas
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Falta de Representatividad
                  </h4>
                  <p className="text-gray-700">No se puede generalizar la opinión del 7% de los estudiantes al 93% restante.</p>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Ausencia de Segmentación
                  </h4>
                  <p className="text-gray-700">No se segmentaron respuestas por facultad, programa o tipo de vinculación.</p>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Incumplimiento de Estándares
                  </h4>
                  <p className="text-gray-700">No cumple con recomendaciones UNAL/UNESCO de consulta institucional.</p>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Contraste con Encuesta Posterior
                  </h4>
                  <p className="text-gray-700">Encuesta independiente (40.9% participación) mostró 53.7% de rechazo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 5: Proceso de Construcción */}
        <div id="proceso" className="tab-content">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-yellow-200">
            <div className="w-15 h-15 bg-[#F4D03F] rounded-full flex items-center justify-center text-gray-800 text-2xl flex-shrink-0">
              <i className="fas fa-tasks"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 4: El Proceso de Construcción Colectiva</h2>
              <p className="font-semibold">Participación Mínima con Nula Incorporación de Aportes Sustantivos</p>
              <p className="mt-3">Solo 4 personas aportaron (0.1% de la comunidad) y ninguna propuesta sustantiva fue incorporada.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-users text-[#94B43B]"></i>
                Análisis de Aportes de la Comunidad (Tablas 52-63)
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Aportante</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Cargo</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Aporte Sustantivo</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Respuesta Institucional</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Eida Pino</td>
                      <td className="p-3 border-b border-gray-200">Directora de Personal</td>
                      <td className="p-3 border-b border-gray-200">Argumentos estratégicos de justificación</td>
                      <td className="p-3 border-b border-gray-200">"Ideas consideradas y reflejadas en justificación"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">INCORPORADO PARCIALMENTE</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Erika Marulanda</td>
                      <td className="p-3 border-b border-gray-200">Egresada</td>
                      <td className="p-3 border-b border-gray-200">Ajustar códigos SNIES para reconocimiento profesional</td>
                      <td className="p-3 border-b border-gray-200">"Necesario luego de tener la creación de la facultad"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NO INCORPORADO (Diferido)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Eduardo Satizábal</td>
                      <td className="p-3 border-b border-gray-200">Docente</td>
                      <td className="p-3 border-b border-gray-200">Doble titulación en Filosofía</td>
                      <td className="p-3 border-b border-gray-200">"Se tendrán presentes a futuro"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NO INCORPORADO (Diferido)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Uriel Bustamante</td>
                      <td className="p-3 border-b border-gray-200">Docente</td>
                      <td className="p-3 border-b border-gray-200">Estructura pedagógica basada en problemas reales</td>
                      <td className="p-3 border-b border-gray-200">"Se desarrollará desde las comunidades académicas"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NO INCORPORADO (Delegado)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-pie text-[#94B43B]"></i>
                  Estado de Incorporación de Aportes
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="incorporationChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-exclamation-triangle text-[#94B43B]"></i>
                  Patrón de Respuestas
                </h3>
              </div>
              <div className="p-6">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Patrón Identificado:</h4>
                  <p className="text-gray-700 mb-2">✗ Argumentos de apoyo → Usados para reforzar narrativa</p>
                  <p className="text-gray-700 mb-2">✗ Propuestas de cambio → Sistemáticamente diferidas o delegadas</p>
                  <p className="text-gray-700">✗ Sugerencias concretas → "Se considerarán a futuro"</p>
                </div>
                <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Resultado:</h4>
                  <p className="text-gray-700">La versión final del documento no es producto de una construcción dialogada, sino de un proceso cerrado que desestimó los aportes externos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 6: Objeciones Profesorales */}
        <div id="objeciones" className="tab-content">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-red-200">
            <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 5: Las Objeciones Fundamentadas de la Representación Profesoral</h2>
              <p className="font-semibold">Proceso avanzó incumpliendo mandato de la Asamblea Profesoral del 7 de febrero de 2025</p>
              <p className="mt-3">La representación profesoral presentó objeciones técnicas, financieras y procedimentales que nunca fueron satisfactoriamente resueltas.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-clipboard-list text-[#94B43B]"></i>
                Clasificación de Objeciones No Resueltas
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-university text-red-600 mr-2"></i>
                    Objeciones Académicas y de Pertinencia
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Análisis de Demanda Insuficiente:</strong> No se incluyeron "cifras históricas de aspirantes y las tasas de admisión", datos clave para validar la demanda real.</li>
                    <li><strong>Programas Base en Declive:</strong> Se alertó que los programas base de la facultad están "en decadencia", haciendo ilógica la inversión en una nueva estructura.</li>
                    <li><strong>Falacia de la Estructura:</strong> Se calificó como una falacia que una nueva facultad potencie la investigación, ya que esta "la proponen y desarrollan los profesores, NUNCA se da por lineamiento de la administración".</li>
                    <li><strong>Debilidades en Investigación y Extensión:</strong> La información sobre grupos de investigación y experiencia en extensión no demuestra si la facultad podrá generar recursos para participar en contrapartidas y/o tener una producción académica que le permita ser autosostenible.</li>
                  </ul>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-dollar-sign text-red-600 mr-2"></i>
                    Objeciones Financieras y de Viabilidad
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Inconsistencia Inaceptable:</strong> Discrepancia de $7 mil millones entre la propuesta ($12.9 mil millones a 4 años) y el Plan de Acción ($20 mil millones a 3 años), sin aclaración alguna.</li>
                    <li><strong>Engaño en la condición del recurso:</strong> Se desmintió que los recursos se "perderían" si la facultad no se aprobaba por ser de "destinación específica", argumento que incidió directamente en la aprobación del proyecto en espacios asamblearios.</li>
                    <li><strong>Inversión Exagerada:</strong> El proyecto se calificó como una "inversión exagerada a todas luces" para un bajo impacto de solo "90 matrículas nuevas" al año.</li>
                  </ul>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-gavel text-red-600 mr-2"></i>
                    Objeciones de Procedimiento y Transparencia
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Respuestas Evasivas:</strong> Las respuestas a derechos de petición "fueron siempre evasivas y nunca aportaron la certeza presupuestal requerida".</li>
                    <li><strong>Impedimento a la Deliberación:</strong> La Vicerrectoría respondió a solicitudes clave horas *después* de que el Consejo Académico ya había votado, en un acto "a todas luces extemporáneo".</li>
                    <li><strong>Incumplimiento de Mandato:</strong> Se ignoró el mandato de la Asamblea Profesoral que condicionaba el apoyo a un proceso de concertación real.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-file-alt text-[#94B43B]"></i>
                Documentos y Comunicados Clave
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Documento</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Fecha</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Contenido</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">COMUNICADO 006</td>
                      <td className="p-3 border-b border-gray-200">Febrero 2025</td>
                      <td className="p-3 border-b border-gray-200">Denuncia incumplimiento mandato asamblea y fallas en proceso</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SIN RESOLVER</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">REP.PROF.018</td>
                      <td className="p-3 border-b border-gray-200">Enero 2025</td>
                      <td className="p-3 border-b border-gray-200">Solicitud CDP y documentación financiera</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">RESPUESTA EVASIVA</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">REP.PROF.023</td>
                      <td className="p-3 border-b border-gray-200">Enero 2025</td>
                      <td className="p-3 border-b border-gray-200">Cuestionamiento cifras y viabilidad</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">RESPUESTA EVASIVA</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">GNFA-0352-25</td>
                      <td className="p-3 border-b border-gray-200">Enero 2025</td>
                      <td className="p-3 border-b border-gray-200">Gerencia confirma: sin facultad no hay recursos específicos</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">CONTRADICE NARRATIVA</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-exclamation-circle text-[#94B43B]"></i>
                La Discrepancia Financiera Sin Explicar
              </h3>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl flex gap-5 items-start border border-red-200">
                <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  <i className="fas fa-question"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-5">$7,000 Millones de Diferencia</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold mb-3">Propuesta Técnica (CA)</h4>
                      <p className="text-4xl font-bold text-[#94B43B] mb-2">$12.9 mil millones</p>
                      <p className="text-gray-600">A 4 años</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-semibold mb-3">Plan de Acción 2025</h4>
                      <p className="text-4xl font-bold text-[#B8272D] mb-2">$20 mil millones</p>
                      <p className="text-gray-600">A 3 años</p>
                    </div>
                  </div>
                  <p className="text-center font-semibold text-gray-800 mt-5">
                    Nunca se aclaró cuál era la cifra real ni el destino de la diferencia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 7: Encuesta Profesoral */}
        <div id="encuesta" className="tab-content">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-blue-200">
            <div className="w-15 h-15 bg-[#006BB3] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-poll"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 6: Análisis Estadístico de la Encuesta Profesoral</h2>
              <p className="font-semibold">Encuesta independiente para contrastar el "apoyo mayoritario" expresado por la vicerrectoría</p>
              <p className="mt-3">108 respuestas válidas de 264 docentes (40.91% de participación) vs. 33 respuestas en consulta oficial (12.5%)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-times-circle text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">53.7%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">En Desacuerdo</div>
              <div className="text-xs text-gray-500 mt-1">58 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-question-circle text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">26.85%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Con Dudas</div>
              <div className="text-xs text-gray-500 mt-1">29 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#94B43B]">
              <i className="fas fa-check-circle text-3xl text-[#94B43B] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">19.44%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">De Acuerdo</div>
              <div className="text-xs text-gray-500 mt-1">21 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#006BB3]">
              <i className="fas fa-percentage text-3xl text-[#006BB3] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">40.91%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación</div>
              <div className="text-xs text-gray-500 mt-1">108 de 264</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-pie text-[#94B43B]"></i>
                  Distribución de Respuestas
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="surveyDistributionChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-balance-scale text-[#94B43B]"></i>
                  Comparación: Oficial vs. Independiente
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="surveyComparisonChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-building text-[#94B43B]"></i>
                Participación por Unidad Académica
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Unidad Académica</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Participaron</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">No, no estoy de acuerdo</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Tengo dudas</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Sí, estoy de acuerdo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Eléctrica, Electrónica y Computación</td>
                      <td className="p-3 border-b border-gray-200 text-center">16</td>
                      <td className="p-3 border-b border-gray-200 text-center">7</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">4</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Civil</td>
                      <td className="p-3 border-b border-gray-200 text-center">15</td>
                      <td className="p-3 border-b border-gray-200 text-center">7</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Física y Química</td>
                      <td className="p-3 border-b border-gray-200 text-center">12</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Administración</td>
                      <td className="p-3 border-b border-gray-200 text-center">11</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Química</td>
                      <td className="p-3 border-b border-gray-200 text-center">11</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">4</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Escuela de Arquitectura y Urbanismo</td>
                      <td className="p-3 border-b border-gray-200 text-center">11</td>
                      <td className="p-3 border-b border-gray-200 text-center">8</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-yellow-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Ciencias Humanas</td>
                      <td className="p-3 border-b border-gray-200 text-center font-semibold">9</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                      <td className="p-3 border-b border-gray-200 text-center font-semibold">5</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Informática y Computación</td>
                      <td className="p-3 border-b border-gray-200 text-center">8</td>
                      <td className="p-3 border-b border-gray-200 text-center">7</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Industrial</td>
                      <td className="p-3 border-b border-gray-200 text-center">8</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Matemáticas</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">IDEA - Manizales</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-chart-bar text-[#94B43B]"></i>
                Participación por Facultad
              </h3>
            </div>
            <div className="p-6">
              <div className="relative h-80">
                <canvas id="participationByFacultyChart"></canvas>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-comments text-[#94B43B]"></i>
                Análisis de Comentarios por Categoría
              </h3>
            </div>
            <div className="p-6">
              <div className="relative h-80 mb-8">
                <canvas id="commentsCategoryChart"></canvas>
              </div>
            </div>
          </div>
          
          {/* SECCIÓN DE COMENTARIOS AGREGADA */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-comment-dots text-[#94B43B]"></i>
                Comentarios de la Encuesta Profesoral
              </h3>
              <p className='text-sm text-gray-500 mt-1'>Total: 59 comentarios válidos</p>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <button onClick={() => setVisibleComments('todos')} className={`px-4 py-2 text-sm rounded-full transition-all ${visibleComments === 'todos' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Todos ({commentsByType.todos.length})</button>
                <button onClick={() => setVisibleComments('desacuerdo')} className={`px-4 py-2 text-sm rounded-full transition-all ${visibleComments === 'desacuerdo' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>En Desacuerdo ({commentsByType.desacuerdo.length})</button>
                <button onClick={() => setVisibleComments('dudas')} className={`px-4 py-2 text-sm rounded-full transition-all ${visibleComments === 'dudas' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>Con Dudas ({commentsByType.dudas.length})</button>
                <button onClick={() => setVisibleComments('acuerdo')} className={`px-4 py-2 text-sm rounded-full transition-all ${visibleComments === 'acuerdo' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>De Acuerdo ({commentsByType.acuerdo.length})</button>
              </div>
              
              <div className="space-y-4">
                {commentsByType[visibleComments].map((comment, index) => (
                  <div key={index} className={`p-4 border-l-4 rounded-r-lg ${getCommentColors(comment.type)}`}>
                    <div className={`text-xs font-bold uppercase mb-2 px-2 py-0.5 rounded-full inline-block ${getCommentColors(comment.type)}`}>
                      {getCommentHeader(comment.type)}
                    </div>
                    <p className="text-gray-800 text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>

        {/* Tab 8: Ficha Técnica */}
        <div id="ficha" className="tab-content">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-blue-200">
            <div className="w-15 h-15 bg-[#006BB3] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-file-alt"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Ficha Técnica de la Encuesta Profesoral</h2>
              <p className="font-semibold">Encuesta independiente realizada para contrastar el "apoyo mayoritario" reportado</p>
              <p className="mt-3">Metodología, participantes y resultados detallados de la consulta independiente</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-info-circle text-[#94B43B]"></i>
                  Información General
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Período de aplicación:</span>
                    <span className="text-gray-600">Julio 2025</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Universo:</span>
                    <span className="text-gray-600">264 docentes activos</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Respuestas válidas:</span>
                    <span className="text-gray-600">108 docentes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Tasa de participación:</span>
                    <span className="text-gray-600 font-semibold">40.91%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Margen de error:</span>
                    <span className="text-gray-600">±7.8% (95% confianza)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Metodología:</span>
                    <span className="text-gray-600">Encuesta digital anónima</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-gray-700">Pregunta central:</span>
                    <span className="text-gray-600 text-sm">"¿Está usted de acuerdo con la creación de la FCHS?"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-bar text-[#94B43B]"></i>
                  Resultados Principales
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-red-800">No, no estoy de acuerdo</span>
                      <span className="text-2xl font-bold text-red-800">53.7%</span>
                    </div>
                    <div className="text-sm text-red-600 mt-1">58 de 108 docentes</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-yellow-800">Tengo dudas</span>
                      <span className="text-2xl font-bold text-yellow-800">26.85%</span>
                    </div>
                    <div className="text-sm text-yellow-600 mt-1">29 de 108 docentes</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-800">Sí, estoy de acuerdo</span>
                      <span className="text-2xl font-bold text-green-800">19.44%</span>
                    </div>
                    <div className="text-sm text-green-600 mt-1">21 de 108 docentes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-envelope text-[#94B43B]"></i>
                Listado de Correos Electrónicos Participantes
              </h3>
              <p className="text-sm text-gray-600 mt-1">108 docentes que completaron la encuesta (datos anonimizados)</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="p-2 bg-gray-50 rounded">ikcollazoss@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">vevalenciam@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">gmedinaar@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">nprietoc@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jdmarinj@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">cmurillo@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">pfmarinc@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">javieiras@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">laramirezc@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">bsegurag@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">wasarachec@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">azapatago@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">morozcoa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jjvelezu@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">pchang@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jhramirezfra@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">wrlopez@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">apagudelosa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">fjvalenciad@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">lfcorteshe@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ubustamantel@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">oemezaa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">anfrojasgo@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">gacastanod@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">odcardonaa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jhestradae@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">osccorreac@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">frinconc@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">carangol@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">eflunan@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">cyounesv@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">nmontoyamo@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jehurtadog@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jagalindod@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ratolosac@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">lmzuluagag@unal.edu.co</div>
                </div>
                <div className="space-y-1">
                  <div className="p-2 bg-gray-50 rounded">lfcastilloos@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">sruizhe@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jdzambranona@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ndgonzalezho@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jcrianoro@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ffserranos@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">fjgarciaor@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jfontalvoa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">amarulandam@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">rrovira@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">amgiraldoo@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">flfrancoi@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">lrvasquezv@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">daalvarez@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">lilopezv@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">dosoriob@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">gadabbracciok@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">rbetancourtg@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">lpgiraldov@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">cemejiac@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">lmvelasqueza@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">oaprador@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">dtflorezq@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">dmcardenasa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">daescobarga@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">paescandon@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jhparrasa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jasepulvedag@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">japaredesl@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">daariast@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">caruizvi@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">mapantojao@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jmcastanom@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">erestrepopa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ppinedag@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">mebecerrah@unal.edu.co</div>
                </div>
                <div className="space-y-1">
                  <div className="p-2 bg-gray-50 rounded">ohgiraldoo@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ejvillegasj@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">fhlopezv@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">csalazaro@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jbuitragoa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">bjruizm@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ceorregoa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jchiguitav@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">geescobara@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jcgarciaa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jjsepulvedal@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">gidarragap@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">omdiazb@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">amalvarezme@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">nguerrerog@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">saariasgu@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">dahlopezgar@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">alvgomezp@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">ghbarrenecher@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">fagonzalez@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">aflopezv@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">eduquees@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">asepulvedag@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jcnaranjov@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">vmejiaa@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">cabermudezm@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">tgiraldoo@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">fnjimenezg@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jafigueroaf@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jubastidasr@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">jdagudeloc@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">snrodriguezba@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">wmliconac@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">cmendozab@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">shernandezn@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">leavendano@unal.edu.co</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-times-circle text-[#94B43B]"></i>
                Correos Eliminados por No Pertenecer a la Sede
              </h3>
              <p className="text-sm text-gray-600 mt-1">Respuestas eliminadas por no corresponder a docentes activos de la Sede Manizales</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="p-2 bg-red-50 rounded border border-red-200">sprojasb@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">albertoantonioagudeloaguirre@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 9: Datos Completos */}
        <div id="datos" className="tab-content">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-blue-200">
            <div className="w-15 h-15 bg-[#006BB3] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-database"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Datos Completos del Análisis</h2>
              <p>Información detallada y evidencia documental del proceso de creación de la FCHS</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-file-alt text-[#94B43B]"></i>
                  Documentos Analizados
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center p-3 border-b border-gray-100">
                    <i className="fas fa-file-pdf text-red-600 mr-3"></i>
                    <div>
                      <strong>Propuesta FCHS</strong>
                      <p className="text-sm text-gray-600">Documento oficial presentado al CA</p>
                    </div>
                  </li>
                  <li className="flex items-center p-3 border-b border-gray-100">
                    <i className="fas fa-file-pdf text-red-600 mr-3"></i>
                    <div>
                      <strong>COMUNICADO 006</strong>
                      <p className="text-sm text-gray-600">Representación Profesoral</p>
                    </div>
                  </li>
                  <li className="flex items-center p-3">
                    <i className="fas fa-file-excel text-green-600 mr-3"></i>
                    <div>
                      <strong>Encuesta Profesoral</strong>
                      <p className="text-sm text-gray-600">108 respuestas válidas</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-calendar text-[#94B43B]"></i>
                  Cronología del Proceso
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Nov 2024</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Consultas Oficiales</h4>
                      <p className="text-sm text-gray-600">6.6% estudiantes, 12.3% docentes</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Ene 2025</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Derechos de Petición</h4>
                      <p className="text-sm text-gray-600">REP.PROF.018, 023 - Sin respuestas claras</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Feb 2025</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Asamblea Profesoral</h4>
                      <p className="text-sm text-gray-600">Condiciona apoyo a concertación</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Jul 2025</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Encuesta Independiente</h4>
                      <p className="text-sm text-gray-600">40.91% participación, 53.7% rechazo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-list-alt text-[#94B43B]"></i>
                Resumen de Indicadores Críticos
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Indicador</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Valor Encontrado</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Valor Esperado</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Brecha</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Participación estudiantil en consulta</td>
                      <td className="p-3 border-b border-gray-200 text-center">6.6%</td>
                      <td className="p-3 border-b border-gray-200 text-center">&gt;50%</td>
                      <td className="p-3 border-b border-gray-200 text-center">-43.4%</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">CRÍTICO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Apoyo profesoral (encuesta independiente)</td>
                      <td className="p-3 border-b border-gray-200 text-center">19.44%</td>
                      <td className="p-3 border-b border-gray-200 text-center">&gt;60%</td>
                      <td className="p-3 border-b border-gray-200 text-center">-40.56%</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">CRÍTICO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Costo por estudiante (Año 1)</td>
                      <td className="p-3 border-b border-gray-200 text-center">$89.9M</td>
                      <td className="p-3 border-b border-gray-200 text-center">&lt;$10M</td>
                      <td className="p-3 border-b border-gray-200 text-center">+$79.9M</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">INSOSTENIBLE</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Municipios con oferta duplicada</td>
                      <td className="p-3 border-b border-gray-200 text-center">9 de 11</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                      <td className="p-3 border-b border-gray-200 text-center">+9</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">CRÍTICO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Aportes sustantivos incorporados</td>
                      <td className="p-3 border-b border-gray-200 text-center">0 de 3</td>
                      <td className="p-3 border-b border-gray-200 text-center">3 de 3</td>
                      <td className="p-3 border-b border-gray-200 text-center">-3</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NULO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Tendencia matrícula programa base</td>
                      <td className="p-3 border-b border-gray-200 text-center">-42%</td>
                      <td className="p-3 border-b border-gray-200 text-center">&gt;0%</td>
                      <td className="p-3 border-b border-gray-200 text-center">-42%</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">DECRECIENTE</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">CDP específico presentado</td>
                      <td className="p-3 border-b border-gray-200 text-center">No</td>
                      <td className="p-3 border-b border-gray-200 text-center">Sí</td>
                      <td className="p-3 border-b border-gray-200 text-center">N/A</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">AUSENTE</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-exclamation-triangle text-[#94B43B]"></i>
                Conclusiones Finales
              </h3>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl flex gap-5 items-start border border-red-200">
                <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  <i className="fas fa-gavel"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Recomendación del Análisis</h3>
                  <p className="mb-4">Con base en la evidencia presentada en los 7 puntos del análisis, se recomienda:</p>
                  <ol className="space-y-2 ml-5">
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">1.</span>
                      <strong>Suspender el proceso actual</strong> hasta resolver las brechas identificadas
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">2.</span>
                      <strong>Realizar un estudio de mercado</strong> riguroso y análisis de demanda real
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">3.</span>
                      <strong>Presentar documentación financiera</strong> completa con CDP específico
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">4.</span>
                      <strong>Generar consenso real</strong> con participación representativa (&gt;50%)
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">5.</span>
                      <strong>Incorporar aportes sustantivos</strong> de la comunidad académica
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">6.</span>
                      <strong>Resolver discrepancias</strong> financieras y procedimentales
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">7.</span>
                      <strong>Cumplir mandato</strong> de la Asamblea Profesoral
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;