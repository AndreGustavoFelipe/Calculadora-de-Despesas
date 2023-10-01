/*DEFININDO VARIÁVEIS DE ESCOPO, QUE SERÃO UTILIZADAS PARA EXIBIR AS INFORMAÇÕES AO USUÁRIO*/

var novaDespesa;
var despesaAlta;
var despesas = [];
var tot = 0;
var media;

/*AS FUNÇÕES NÃO ESTÃO ORDENADAS CONFORME O CHAMADO DELAS NO HTML!*/

// Esta função calcula a média de todas as despesas armazenadas no array 'despesas'.
// Percorre o array, soma todos os valores e, em seguida, divide pela quantidade de despesas para obter a média.
// A média calculada é exibida no pMedia através do innerHTML.


function calcularMedia(){
    media = 0;
    pMedia = document.querySelector(".media");
    pMedia.innerHTML = '';

    for(var i = 0; i<(despesas.length); i++){
        media += parseFloat(despesas[i]);
    }
    media = media/(despesas.length);
    pMedia.innerHTML = "<b>Média das despesas:</b> R$" + media;
}

// Função destinada a adicionar novas despesas ao array 'despesas'.
// Primeiro, verifica a validade do valor inserido pelo usuário: se é maior que zero, numericamente válido e formatado corretamente.
// Se o valor passar por todas essas verificações, é adicionado ao array e a tabela de despesas na página e ela é atualizada.

function adicionarDespesa(){
    novaDespesa = document.querySelector("#novaDespesa").value;

    if(novaDespesa <= 0){
        alert("adicione um valor acima de 0!");
        return;
    }

    else if(isNaN(parseFloat(novaDespesa))){
        alert("Digite um valor NUMÉRICO!");
        return;
    }

    else if(novaDespesa.includes(",")){
        alert("Se esta tentando colocar um número com vírgula, troque-a por um ponto");
        return;
    }

    else{
        despesas.push(parseFloat(novaDespesa)); 
        exibirDespesas();
    }
    
}

// Calcula o valor total das despesas acumuladas. Basicamente, soma todos os valores armazenados no array 'despesas'.
// O valor total é exibido no pTot através do innerHTML.

function calcTot(){
    tot = 0;
    despesa = 0;
    pTot = document.querySelector(".total");
    pTot.innerHTML = '';

    for(var i = 0; i < (despesas.length); i++){
        tot += parseFloat(despesas[i]);
    }
    pTot.innerHTML = "<b>Valor total de despesas:</b> R$" + tot;
}

// Essa função identifica o valor mais alto dentro do array 'despesas'.
// Percorre o array, comparando cada valor e identificando o maior. 
// O maior valor encontrado é então exibido na página dentro do pMaiorValor através do innerHTML.

function valorMaior(){
    var maiorValor = 0;
    pMaiorValor = document.querySelector(".maiorValor");
    pMaiorValor.innerHTML = '';

    for( var i = 0; i<(despesas.length); i++){
        if(maiorValor < parseFloat(despesas[i])){
            maiorValor = despesas[i];
        }
    }
    pMaiorValor.innerHTML = "<b>Maior valor das despesas:</b> R$" + maiorValor;
}

// De maneira parecida à função anterior, essa busca pelo menor valor de despesa.
// Inicia-se com um valor alto para assegurar que qualquer despesa no array será menor.
// Após identificar o menor valor, este é exibido na página dentro do pMenorValor através do innerHTML.

function valorMenor(){
    var menorValor = 9999999999;
    pMenorValor = document.querySelector(".menorValor");
    pMenorValor.innerHTML = '';

    if(despesas.length === 0){
        alert("Nenhuma despesa foi inserida!");
        return
    }

    for( var i = 0; i<(despesas.length); i++){
        if(menorValor > parseFloat(despesas[i])){
            menorValor = despesas[i];
        }
    }
    pMenorValor.innerHTML = "<b>Menor valor das despesas:</b> R$" + menorValor;
}

// Atualiza a tabela de despesas na página "index.html". 
// Primeiro, limpa qualquer conteúdo existente na tabela. Em seguida, percorre o array 'despesas' e cria uma linha para cada despesa, inserindo-a na tabela.

function exibirDespesas(){
    const tabelaBody = document.querySelector("#minhaTabela tbody");
    tabelaBody.innerHTML = '';
    for(var i = 0; i< (despesas.length); i++){

        let linha = document.createElement("tr");
        let indice = document.createElement("td");
        let valor = document.createElement("td");

        indice.textContent = i+1;
        valor.textContent = "R$" + despesas[i];
        
        linha.appendChild(indice);
        linha.appendChild(valor);
        tabelaBody.appendChild(linha);

    }
}

// Proporciona ao usuário a habilidade de remover uma despesa específica baseada no seu índice.
// Após o usuário inserir um valor para remoção, a função verifica se o valor inserido é válido e se está presente no array. Se estiver, é removido.

function removerDespesa() {
    const indiceInformado = document.querySelector("#indiceRemover").value;
    var novasDespesas = [];

    if (despesas.length > 0) {
        if(indiceInformado == ""){
            alert("Digite algum índice!");
            return;
        }

        else if(indiceInformado<0){
            alert("Digite um índice maior que 0!");
            return;
        }

        else if(indiceInformado.includes(",") || indiceInformado.includes(".")){
            alert("Índices com vírgulas não são aceitos!");
            return;
        }

        else if(isNaN(Number(indiceInformado))){
            alert("Digite um índice NUMÉRICO!");
            return;
        }
        
        else{
            for(let i = 0; i<(despesas.length); i++){
            if(i != (indiceInformado-1)){
                novasDespesas.push(despesas[i]); 
            }
        }
        despesas = novasDespesas;
        exibirDespesas(); 
        }
        
    }else {
        alert("Não há despesas para remover!");
    }
}

// Dá a opção para o usuário limpar completamente o array 'despesas', removendo todas as despesas registradas.
// Uma mensagem de confirmação é mostrada para assegurar que o usuário realmente deseja executar essa ação.

function removerTodasDespesas() {

    let confirmacao = confirm("Você realmente deseja limpar todos os registros?");

    if (confirmacao) {
        if(despesas.length===0){
            alert("Nenhuma despesa foi inserida!");
        }
        else{
        despesas = [];
        alert("Registros limpos com sucesso!");
        exibirDespesas();
        }
    } else {
        alert("Operação cancelada!");
    }
}

// Altera a visibilidade da seção de funções da página, escondendo-a e mostrando um botão para que o usuário possa reabri-la quando desejar.

let novaDiv; //Variável que armazena a nova div, que aparecerá no lugar da div "box-functions"

function fecharDivFunctions(){

    const divFunctions = document.querySelector(".box-functions");
    const body = document.querySelector(".body");
    
    novaDiv = document.createElement("div");
    const novoBtn = document.createElement("button");

    novoBtn.textContent = "Maximizar";

    novaDiv.classList.add("nova-div");
    novoBtn.classList.add("btn-abrir");

    divFunctions.style.display = 'none';

    novaDiv.appendChild(novoBtn);
    body.insertBefore(novaDiv, body.firstChild);

    novoBtn.addEventListener('click', abrirDivFunctions);
    
}

// A função reversa da anterior: quando o botão "Maximizar" é pressionado, esta função é chamada para mostrar novamente a seção de funções.

function abrirDivFunctions(){
    const divFunctions = document.querySelector(".box-functions");
    const body = document.querySelector(".body");
    
    body.removeChild(novaDiv);

    divFunctions.style.display = 'block';
}