const validarNota = (nota) => {
  return nota >= 1 && nota <= 10;
};

const calcularNotaFinal = () => {
  const estudiantes = [];

  const obtenerNotaValida = (i) => {
    let nota = '';
    while (nota === '' || !validarNota(nota)) {
      alert('Por favor, ingresa una nota válida (1-10)');
      nota = parseFloat(prompt(`Nota ${i + 1}:`));
    }
    return nota;
  };

  for (let i = 0; i < 3; i++) {
    let nombre = '';
    while (nombre === '') {
      nombre = prompt(`Nombre del estudiante ${i + 1}:`);
    }
    const notas = [];

    for (let j = 0; j < 3; j++) {
      const nota = obtenerNotaValida(j);
      notas.push(nota);
    }

    const notaFinal = notas.reduce((a, nota) => a + nota, 0) / 3;

    const resultado = notaFinal < 6 ? 'Desaprobado' : 'Aprobado';

    estudiantes.push({ nombre, notas, notaFinal, resultado });
  }

  const resultadosEstudiantes = document.getElementById(
    'resultados-estudiantes'
  );
  resultadosEstudiantes.innerHTML = '';

  estudiantes.forEach((estudiante, index) => {
    const resultadoEstudiante = document.createElement('div');
    resultadoEstudiante.innerHTML = `<p>Estudiante ${index + 1} - Nombre: ${
      estudiante.nombre
    }</p>`;
    resultadoEstudiante.innerHTML += `<p>Notas: ${estudiante.notas.join(
      ', '
    )}</p>`;
    resultadoEstudiante.innerHTML += `<p>Nota Final: ${estudiante.notaFinal.toFixed(
      2
    )}</p>`;
    resultadoEstudiante.innerHTML += `<p>Resultado: ${estudiante.resultado}</p>`;
    resultadosEstudiantes.appendChild(resultadoEstudiante);
  });
};

const resetForm = () => {
  const resultadosEstudiantes = document.getElementById(
    'resultados-estudiantes'
  );
  resultadosEstudiantes.innerHTML = '';
};
