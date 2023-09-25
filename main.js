const calcularNotaFinal = () => {
  const nombre = document.getElementById('nombre').value;
  const nota1 = parseFloat(document.getElementById('nota1').value);
  const nota2 = parseFloat(document.getElementById('nota2').value);
  const nota3 = parseFloat(document.getElementById('nota3').value);

  if (nombre === '') {
    alert('Por favor, escribe tu nombre');
    return;
  }

  if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    alert('Por favor completa todas tus notas');
    return;
  }

  const notaFinal = (nota1 + nota2 + nota3) / 3;

  const resultado = notaFinal < 6 ? 'Desaprobado' : 'Aprobado';

  document.getElementById('resultado').textContent = notaFinal.toFixed(2);
  document.getElementById('estado').textContent = resultado;
};

const resetForm = () => {
  document.getElementById('nombre').value = '';
  document.getElementById('nota1').value = '';
  document.getElementById('nota2').value = '';
  document.getElementById('nota3').value = '';
  document.getElementById('resultado').textContent = '';
  document.getElementById('estado').textContent = '';
};
