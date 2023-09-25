const calcularNotaFinal = () => {
  let nota1 = '';
  let nota2 = '';
  let nota3 = '';

  while (nota1 === '' || nota2 === '' || nota3 === '') {
    alert('Por favor, ingresa tus notas');
    nota1 = parseFloat(prompt('Ingresa tu primer nota'));
    nota2 = parseFloat(prompt('Ingresa tu segunda nota'));
    nota3 = parseFloat(prompt('Ingresa tu tercer nota'));
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
