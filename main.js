let estudiantes = [];

function validarNota(nota) {
  return nota >= 1 && nota <= 10;
}

function agregarEstudiante() {
  const nombre = document.getElementById('nombreEstudiante').value;
  const nota1 = parseFloat(document.getElementById('nota1').value);
  const nota2 = parseFloat(document.getElementById('nota2').value);
  const nota3 = parseFloat(document.getElementById('nota3').value);

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
      // Resto del código permanece igual
      const notas = [nota1, nota2, nota3];
      const notaFinal = (nota1 + nota2 + nota3) / 3;
      const resultado = notaFinal < 6 ? 'Desaprobado ❌' : 'Aprobado ✅';

      estudiantes.push({ nombre, notas, notaFinal, resultado });
      limpiarCampos();
      mostrarResultados();
      Swal.fire('¡Estudiante agregado!', '', 'success');
    }
  });
}

function limpiarCampos() {
  document.getElementById('nombreEstudiante').value = '';
  document.getElementById('nota1').value = '';
  document.getElementById('nota2').value = '';
  document.getElementById('nota3').value = '';
}

function mostrarResultados() {
  const resultadosEstudiantes = document.getElementById(
    'resultados-estudiantes'
  );
  resultadosEstudiantes.innerHTML = '';

  if (estudiantes.length === 0) {
    resultadosEstudiantes.innerHTML = '<p>No hay estudiantes registrados.</p>';
    return;
  }

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

    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = 'Eliminar';
    botonEliminar.onclick = function () {
      eliminarEstudiante(index);
    };

    resultadoEstudiante.appendChild(botonEliminar);
    resultadosEstudiantes.appendChild(resultadoEstudiante);
  });

  // Guardar datos en el almacenamiento local
  localStorage.setItem('datosEstudiantes', JSON.stringify(estudiantes));
}

function eliminarEstudiante(index) {
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
      estudiantes.splice(index, 1);
      mostrarResultados();

      // Eliminar el estudiante del localStorage
      localStorage.setItem('datosEstudiantes', JSON.stringify(estudiantes));

      Swal.fire('¡Estudiante eliminado!', '', 'success');
    }
  });
}

function resetearResultados() {
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
      const resultadosEstudiantes = document.getElementById(
        'resultados-estudiantes'
      );
      resultadosEstudiantes.innerHTML = '';
      // Limpiar datos en el almacenamiento local
      localStorage.removeItem('datosEstudiantes');
      // Limpiar el array de estudiantes
      estudiantes = [];
      Swal.fire('¡Todos los estudiantes han sido eliminados!', '', 'success');
    }
  });
}

// Verifica si hay datos en local storage al cargar la página
window.onload = function () {
  const datosEstudiantesAlmacenados = JSON.parse(
    localStorage.getItem('datosEstudiantes')
  );

  const resultadosEstudiantes = document.getElementById(
    'resultados-estudiantes'
  );
  resultadosEstudiantes.innerHTML = '';

  if (datosEstudiantesAlmacenados) {
    estudiantes = datosEstudiantesAlmacenados;
    mostrarResultados();
  }
};

// Funciones para que con la tecla Enter se pueda pasar de input en input y tambien agregar alumno.
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
