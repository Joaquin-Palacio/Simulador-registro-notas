const validarNota = (nota) => {
  const expreRegular = /^[0-9]{1,2}$/;
  return expreRegular.test(nota) && nota <= 10;
};

const calcularNotaFinal = () => {
  let nota1 = '';
  let nota2 = '';
  let nota3 = '';

  while (nota1 === '' || !validarNota(nota1)) {
    alert('Por favor, ingresa una nota válida (1-10)');
    nota1 = parseFloat(prompt('Primer nota:'));
  }

  while (nota2 === '' || !validarNota(nota2)) {
    alert('Por favor, ingresa una nota válida (1-10)');
    nota2 = parseFloat(prompt('Segunda nota:'));
  }

  while (nota3 === '' || !validarNota(nota3)) {
    alert('Por favor, ingresa una nota válida (1-10)');
    nota3 = parseFloat(prompt('Tercer nota:'));
  }

  const notaFinal = (nota1 + nota2 + nota3) / 3;

  const resultado = notaFinal < 6 ? 'Desaprobado' : 'Aprobado';

  document.getElementById('resultado').textContent = notaFinal.toFixed(2);
  document.getElementById('estado').textContent = resultado;
};

const resetForm = () => {
  document.getElementById('resultado').textContent = '';
  document.getElementById('estado').textContent = '';
};
