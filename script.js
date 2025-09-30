// Selecionando elementos
const form = document.getElementById('formCadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const toggleThemeBtn = document.getElementById('toggleTheme');

// Buscar endereço na API ViaCEP
async function buscarEndereco(cepDigitado) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);
    if (!resposta.ok) throw new Error('Erro ao buscar CEP');
    const dados = await resposta.json();

    if (dados.erro) {
      alert('CEP não encontrado!');
      return;
    }

    rua.value = dados.logradouro || '';
    bairro.value = dados.bairro || '';
    cidade.value = dados.localidade || '';
    estado.value = dados.uf || '';

    salvarDados();
  } catch (error) {
    console.error(error);
    alert('Não foi possível buscar o endereço');
  }
}

// Detectar CEP válido
cep.addEventListener('blur', () => {
  const cepDigitado = cep.value.replace(/\D/g, ''); // remove tudo que não é número
if (cepDigitado.length === 8) {
  buscarEndereco(cepDigitado);
}
});

// Salvar dados no localStorage
function salvarDados() {
  const dadosUsuario = {
    nome: nome.value,
    email: email.value,
    cep: cep.value,
    rua: rua.value,
    numero: numero.value,
    bairro: bairro.value,
    cidade: cidade.value,
    estado: estado.value,
  };
  localStorage.setItem('cadastroUsuario', JSON.stringify(dadosUsuario));
}

// Restaurar dados ao carregar
function restaurarDados() {
  const dadosSalvos = localStorage.getItem('cadastroUsuario');
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    nome.value = dados.nome || '';
    email.value = dados.email || '';
    cep.value = dados.cep || '';
    rua.value = dados.rua || '';
    numero.value = dados.numero || '';
    bairro.value = dados.bairro || '';
    cidade.value = dados.cidade || '';
    estado.value = dados.estado || '';
  }
}

// Enviar formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();
  salvarDados();
  alert('Cadastro salvo com sucesso!');
});

// Restaurar tema e dados ao carregar
document.addEventListener('DOMContentLoaded', () => {
  restaurarDados();
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
    toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
  }
});

// Alternar tema e salvar preferência
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  toggleThemeBtn.innerHTML = isDark
    ? '<i class="fas fa-sun"></i> Modo Claro'
    : '<i class="fas fa-moon"></i> Modo Escuro';
  localStorage.setItem('tema', isDark ? 'escuro' : 'claro');
});
