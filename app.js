// Criar uma interação entre o JS e o html
// Manipular o título do html <h1>/</h1>

//let titulo = document.querySelector('h1'); // Selecionei a tag
//titulo.innerHTML = 'Jogo do Número Secreto';

// let paragraph = document.querySelector('p');
//paragraph.innerHTML = 'Escolha um número entre 1 e 10';

exibirMensagemInicial(); // Utilizando a função para exibir as mensagens do título e parágrafo
let listaNumerosSorteados = []; // Lista vázia que irá implementar os números escolhidos
let numeroLimite = 10; // Variável que armazena o número limite de números
let numeroSecreto = numero_aleatorio(); // Estou chamando a função para ser guardada na variável
let tentativa = 1; // O usuário já tem o número de tentativas igual a 1

function exibirTextoNaTela(tag, texto) {
    // Em vez de repetir esse código todas as vezes que você quise mudar uma tag no HTML, você pode otimizar com uma função com parâmetros:
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); // Colocando a voz nos textos do site. 
}
function exibirMensagemInicial() {
    // Combinei duas funções
    exibirTextoNaTela('h1', 'Jogo do Número Secreto') ;
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
    let chute = document.querySelector('input').value; // Queremos apenas o valor do input
    if (chute == numeroSecreto) { // Se o chute for igual ao número secreto
        // Esses códigos abaixo irão acontecer:
        let numTentativa = tentativa > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativa} ${numTentativa}!`;
        exibirTextoNaTela('h1', 'Você acertou!');
        exibirTextoNaTela('p', mensagemTentativa);
        // Ativar o botão de reniciar o jogo pelo getElementById
        // Remove o atributo de desativo no HTML
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            // Uso da função exibirTextoNaTela() para mostrar as mensagens no parágrafo: 'p'.
            exibirTextoNaTela('p', 'O número secreto é menor, tente novamente:');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior, tente novamente:');
        }
        tentativa++ // Incremento das tentativas
        limparCampo(); // Limpar o campo em que se insere os valores
    }

}
// Criei uma função que me dará um retorno de um número aleatório
function numero_aleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // variável para armazenar o valor gerado pela função Math.random()
    let quantidadeElementosLista = listaNumerosSorteados.length; // Variável que armazena a quantidade de elementos na listaNumerosSorteados

    if (quantidadeElementosLista == numeroLimite) { 
        // Se a quantidade de elemntos na lista for igual ao número limite, ele vai esvaziar a lista novamente 
        listaNumerosSorteados = [];
    }
    // Usar um if para verificar se o número escolhido já está incluso na lista de número sorteados
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return numero_aleatorio(); // Se já estiver incluso, ele vai gerar um novo número para nós
    } else {
        listaNumerosSorteados.push(numeroEscolhido); // se não estiver incluso,  o push vai colocar o número escolhido dentro da lista.
        console.log(listaNumerosSorteados); 
        return numeroEscolhido;
    }
}

// Função para limpar o espaço em que você insere o número
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; // Deixar um campo vázio nesse espaço
}

function reiniciarJogo() {
    numeroSecreto = numero_aleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    // Desabilitando o botão do novo jogo até que você acerte o número secreto.
    document.getElementById('reiniciar').setAttribute('disabled', true);
}