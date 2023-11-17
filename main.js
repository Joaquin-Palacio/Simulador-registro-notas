// Arreglo para almacenar los datos de los estudiantes
let estudiantes = [];

// Función para validar que una nota esté en el rango correcto (1-10)
function validarNota(nota) {
  return nota >= 1 && nota <= 10;
}

// Función para formatear la fecha y hora
function formatearFechaHora(fecha) {
  // Opciones de formato para la función toLocaleString
  const opciones = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Date(fecha).toLocaleString('es-ES', opciones);
}

// Función asíncrona para obtener la hora y fecha actual desde una API externa
async function obtenerHoraFechaActual() {
  const url = 'http://worldtimeapi.org/api/ip';

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Formatear la fecha y hora según el formato
    const fechaHoraFormateada = formatearFechaHora(data.datetime);

    return fechaHoraFormateada;
  } catch (error) {
    console.error('Error al obtener la hora y fecha:', error);
    return 'N/A';
  }
}

// Función asíncrona para obtener datos desde un archivo JSON local
async function obtenerDatosJSON() {
  const urlJSON = './datos.json';

  try {
    const response = await fetch(urlJSON);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error al obtener los datos', error);
    return null;
  }
}

// Función para agregar un estudiante
async function agregarEstudiante() {
  // Obtener los datos del formulario
  const nombre = document.getElementById('nombreEstudiante').value;
  const nota1 = parseFloat(document.getElementById('nota1').value);
  const nota2 = parseFloat(document.getElementById('nota2').value);
  const nota3 = parseFloat(document.getElementById('nota3').value);

  // Obtener datos JSON local
  const data = await obtenerDatosJSON();

  if (!data) {
    console.log('no se pudieron cargar los datos');
    return 'Error en la carga de datos';
  }

  // Obtener año y división aleatoria
  const años = Object.keys(data);
  const añoAleatorio = años[Math.floor(Math.random() * años.length)];
  const divisiones = data[añoAleatorio];
  const divisionAleatoria =
    divisiones[Math.floor(Math.random() * divisiones.length)];

  // Verificar que todos los campos estén llenos
  if (!nombre || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos.',
    });
    return;
  }

  // Verificar que las notas estén en el rango válido
  if (!validarNota(nota1) || !validarNota(nota2) || !validarNota(nota3)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingresa notas válidas (entre 1 y 10).',
    });
    return;
  }

  // Obtener la hora y fecha actual
  const horaFechaActual = await obtenerHoraFechaActual();

  // Mostrar un mensaje de confirmación al usuario
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas agregar este estudiante?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, agregar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Calcular la nota final y el resultado (aprobado/desaprobado)
      const notas = [nota1, nota2, nota3];
      const notaFinal = (nota1 + nota2 + nota3) / 3;
      const resultado = notaFinal < 6 ? 'Desaprobado ❌' : 'Aprobado ✅';

      // Agregar el estudiante al arreglo
      estudiantes.push({
        nombre,
        notas,
        notaFinal,
        resultado,
        horaFechaActual,
        añoAleatorio,
        divisionAleatoria,
      });
      // Limpiar los campos del formulario
      limpiarCampos();
      // Mostrar los resultados actualizados
      mostrarResultados();
      // Mostrar un mensaje de éxito
      Swal.fire('¡Estudiante agregado!', '', 'success');
    }
  });
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
  document.getElementById('nombreEstudiante').value = '';
  document.getElementById('nota1').value = '';
  document.getElementById('nota2').value = '';
  document.getElementById('nota3').value = '';
}

// Función para mostrar los resultados de los estudiantes en el DOM
function mostrarResultados() {
  // Obtener el elemento donde se mostrarán los resultados
  const resultadosEstudiantes = document.getElementById(
    'resultados-estudiantes'
  );
  resultadosEstudiantes.innerHTML = '';

  // Verificar si hay estudiantes registrados
  if (estudiantes.length === 0) {
    resultadosEstudiantes.innerHTML = '<p>No hay estudiantes registrados.</p>';
    return;
  }

  // Iterar sobre los estudiantes y crear elementos para mostrar la información
  estudiantes.forEach((estudiante, index) => {
    const resultadoEstudiante = document.createElement('div');
    resultadoEstudiante.classList.add('estudiante');

    const notas = estudiante.notas || [];
    const notaFinal =
      notas.length > 0
        ? (notas.reduce((a, nota) => a + nota, 0) / notas.length).toFixed(2)
        : 'N/A';

    resultadoEstudiante.innerHTML = `<p>${index + 1}) Nombre del alumno: ${
      estudiante.nombre
    }</p>`;
    resultadoEstudiante.innerHTML += `<p>Notas: ${notas.join(', ')}</p>`;
    resultadoEstudiante.innerHTML += `<p>Nota Final: ${notaFinal}</p>`;
    resultadoEstudiante.innerHTML += `<p>Estado: ${estudiante.resultado}</p>`;
    resultadoEstudiante.innerHTML += `<p>Fecha de carga: ${estudiante.horaFechaActual}</p>`;
    resultadoEstudiante.innerHTML += `<p>${estudiante.añoAleatorio} año. División: ${estudiante.divisionAleatoria}</p>`;

    // Crear un botón para eliminar al estudiante
    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = 'Eliminar';
    botonEliminar.onclick = function () {
      eliminarEstudiante(index);
    };

    // Agregar el botón al elemento del estudiante
    resultadoEstudiante.appendChild(botonEliminar);
    // Agregar el elemento del estudiante al contenedor de resultados
    resultadosEstudiantes.appendChild(resultadoEstudiante);
  });

  // Guardar datos en el almacenamiento local
  localStorage.setItem('datosEstudiantes', JSON.stringify(estudiantes));
}

// Función para eliminar a un estudiante
function eliminarEstudiante(index) {
  // Mostrar un mensaje de confirmación al usuario
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará al estudiante.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Eliminar al estudiante del arreglo
      estudiantes.splice(index, 1);
      // Mostrar los resultados actualizados
      mostrarResultados();

      // Eliminar el estudiante del localStorage
      localStorage.setItem('datosEstudiantes', JSON.stringify(estudiantes));

      // Mostrar un mensaje de éxito
      Swal.fire('¡Estudiante eliminado!', '', 'success');
    }
  });
}

// Función para resetear todos los resultados
function resetearResultados() {
  // Mostrar un mensaje de confirmación al usuario
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará todos los estudiantes.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar todo',
  }).then((result) => {
    if (result.isConfirmed) {
      // Obtener el elemento donde se mostrarán los resultados
      const resultadosEstudiantes = document.getElementById(
        'resultados-estudiantes'
      );
      // Limpiar el contenido del contenedor
      resultadosEstudiantes.innerHTML = '';
      // Limpiar datos en el almacenamiento local
      localStorage.removeItem('datosEstudiantes');
      // Limpiar el array de estudiantes
      estudiantes = [];
      // Mostrar un mensaje de éxito
      Swal.fire('¡Todos los estudiantes han sido eliminados!', '', 'success');
    }
  });
}

// Verificar si hay datos en local storage al cargar la página
window.onload = function () {
  // Obtener los datos de estudiantes almacenados en localStorage
  const datosEstudiantesAlmacenados = JSON.parse(
    localStorage.getItem('datosEstudiantes')
  );

  // Obtener el elemento donde se mostrarán los resultados
  const resultadosEstudiantes = document.getElementById(
    'resultados-estudiantes'
  );
  resultadosEstudiantes.innerHTML = '';

  // Verificar si hay datos almacenados y mostrar los resultados
  if (datosEstudiantesAlmacenados) {
    estudiantes = datosEstudiantesAlmacenados;
    mostrarResultados();
  }
};

// Funciones para que con la tecla Enter se pueda pasar de input en input y también agregar alumno.
function focusNext(event, nextField) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById(nextField).focus();
  }
}

function submitForm(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    agregarEstudiante();
  }
}
