const validarNota = (nota) => {
  return nota >= 1 && nota <= 10;
};

const calcularNotaFinal = () => {
  const notas = [];

  const obtenerNotaValida = (i) => {
    let nota = '';
    while (nota === '' || !validarNota(nota)) {
      alert('Por favor, ingresa una nota válida (1-10)');
      nota = parseFloat(prompt(`Nota ${i + 1}:`));
    }
    return nota;
  };

  for (let i = 0; i < 3; i++) {
    const nota = obtenerNotaValida(i);
    notas.push(nota);
  }

  const notaFinal = notas.reduce((a, nota) => a + nota, 0) / 3;

  const resultado = notaFinal < 6 ? 'Desaprobado' : 'Aprobado';

  document.getElementById('resultado').textContent = notaFinal.toFixed(2);
  document.getElementById('estado').textContent = resultado;
};

const resetForm = () => {
  document.getElementById('resultado').textContent = '';
  document.getElementById('estado').textContent = '';
};
