// Seleção de elementos

const formularios = document.querySelectorAll(".form-container");
const indicadoresSidebar = document.querySelectorAll(".indicador");
const indicadoresDesktop = document.querySelectorAll("#sidebar-desktop .indicador");
const botaoAvancar = document.querySelector("footer button");
const botaoVoltar = document.querySelector("footer h4");

const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputTelefone = document.getElementById("telefone");

const botaoMudarPlano = document.getElementById("alterar-plano");
const pacotesForm2 = document.querySelectorAll(".plano");

let indice = 0;
let indiceindicador = 0;
let avancar = false;
let arrayServicos = [];

let informacoesFormulario = {
    nome: "",
    email: "" ,
    telefone: "",
}

/*------------------------------------------------------*/
// Funções
/*------------------------------------------------------*/

const apagarFormularioAtual = () => {

    formularios.forEach((form) => {
        form.style.display = "none";
    });
    indicadoresSidebar.forEach((indicador) => {
        indicador.classList.remove("atual");
    })
    indicadoresDesktop.forEach((i) => {
        i.classList.remove("atual-d");
    })
}

const mostrarFormularioAtual = () => {
    apagarFormularioAtual();
    formularios[indice].style.display = "block";
    indicadoresSidebar[indiceindicador].classList.add("atual");
    indicadoresDesktop[indiceindicador].classList.add("atual-d");

    if(indice === 0) {
        botaoVoltar.style.display = "none";
        document.querySelector("footer").style.justifyContent = "flex-end";
    } else if(indice === formularios.length - 1) {
        document.querySelector("footer").style.display = "none";
    } else {
        botaoVoltar.style.display = "block";
        document.querySelector("footer").style.justifyContent = "space-between";
    }

    funcionalidadeParaCadaFormulario(indice);
}


const funcionalidadeParaCadaFormulario = (indiceFormulario) => {
    if(indiceFormulario === 1) {
        mostrarPacoteFormulario2();
        avancar = false;
    }
    else if (indiceFormulario === 2) {
        funcionalidadesFormulario3()
        avancar = false;
    }
    else if (indiceFormulario === 3) {
        funcionalidadesFormulario4();
    }
}

const confirmarSePodeAvancar = () => {
    switch(indice) {
        case 0:
            if(nome !== undefined && email !== undefined && telefone !== undefined) {
                avancar = true;
            } else {
                if(nome == undefined) {
                    inputName.classList.add("input-vazio");
                }
                if(email == undefined) {
                    inputEmail.classList.add("input-vazio");
                }
                if(telefone == undefined) {
                    inputTelefone.classList.add("input-vazio");
                }
                window.alert("Complete all the fields correctly!")
            }
            break;
        case 1: 
            if(pacote && plano && preco) {
                avancar = true;
            } else {window.alert("Complete all the fields correctly!")}
            break;
        case 2:
            if(servicosAdicionados > 0) {
                avancar = true;
            } else {window.alert("Complete all the fields correctly!")}
            break;
        case 3: 
            avancar = true;
            break;
        default:
            return;        
    }
}

/*------------------------------------------------------*/
// Eventos
/*------------------------------------------------------*/

/* Formulario 1 */

let nome = undefined; 
let email = undefined;
let telefone = undefined;

inputName.value = "" || informacoesFormulario.nome;
inputEmail.value = "" || informacoesFormulario.email;
inputTelefone.value = "" || informacoesFormulario.telefone;

inputName.addEventListener("keyup", (e) => {
    nome = e.target.value;
    informacoesFormulario.nome = nome;
    if(inputName.classList.contains("input-vazio")) {
        inputName.classList.remove("input-vazio")
    }
})

function validarEmail(texto) {
    var re = /\S+@\S+\.\S+/;
    return re.test(texto);
    
}

inputEmail.addEventListener("keyup", (e) => {
    email = e.target.value;
    informacoesFormulario = email;
    if(inputEmail.classList.contains("input-vazio")) {
        inputEmail.classList.remove("input-vazio")
    }

    if(validarEmail(inputEmail.value) == false) {
        inputEmail.classList.add("input-vazio")
        email = undefined
    }
})

inputTelefone.addEventListener("keyup", (e) => {
    telefone = e.target.value;
    informacoesFormulario.telefone = telefone;
    if(inputTelefone.classList.contains("input-vazio")) {
        inputTelefone.classList.remove("input-vazio")
    }
})

/* Formulario 2 */

let plano = false;
let pacote = false;
let preco = false;

const mostrarPacoteFormulario2 = () => {
    if(!plano) plano = "Monthly";

    if(plano === "Monthly") {
        document.querySelector("#planos").innerHTML = `
        <div class="plano">
            <img src="assets/images/icon-arcade.svg" alt="icone-arcade">
            <div class="descricao">
            <h4>Arcade</h4>
            <p>$9/mo</p>
            </div>
        </div>
        <div class="plano">
            <img src="assets/images/icon-advanced.svg" alt="icone-advanced">
            <div class="descricao">
            <h4>Advanced</h4>
            <p>$12/mo</p>
            </div>
        </div>
        <div class="plano">
            <img src="assets/images/icon-pro.svg" alt="icone-pro">
            <div class="descricao">
            <h4>Pro</h4>
            <p>$15/mo</p>
            </div>
        </div>`;

        if(pacote) {
            document.querySelectorAll(".plano").forEach((p) => {
                const nomeDoPacoteAdicionado = p.querySelector("h4");
                if(nomeDoPacoteAdicionado.innerText === pacote) {
                    nomeDoPacoteAdicionado.closest(".plano").classList.add("selecionado");
                }
            })
        };
        
        document.querySelectorAll(".plano").forEach((p) => {
            p.addEventListener("click", () => {
                const pacoteSelecionado = document.querySelector(".selecionado") || false;
                if(pacoteSelecionado) pacoteSelecionado.classList.remove("selecionado");
                
                p.classList.add("selecionado");
                const nomedoPacote = p.querySelector("h4").innerText;
                const precodoPacote = p.querySelector("p").innerText.replace("/mo", "").replace("$", "");
                pacote = nomedoPacote;
                preco = parseInt(precodoPacote);
                arrayServicos = [];
            })
        })
    } 
    else if (plano === "Yearly") {
        document.querySelector("#planos").innerHTML = `
            <div class="plano-anual">
                <img src="assets/images/icon-arcade.svg" alt="icone-arcade">
                <div class="descricao">
                <h4>Arcade</h4>
                <p>$90/yr</p>
                <span>2 months free</span>
                </div>
            </div>
            <div class="plano-anual">
                <img src="assets/images/icon-advanced.svg" alt="icone-advanced">
                <div class="descricao">
                <h4>Advanced</h4>
                <p>$120/yr</p>
                <span>2 months free</span>
                </div>
            </div>
            <div class="plano-anual">
                <img src="assets/images/icon-pro.svg" alt="icone-pro">
                <div class="descricao">
                <h4>Pro</h4>
                <p>$150/yr</p>
                <span>2 months free</span>
                </div>
            </div>`;

        if(pacote) {
            document.querySelectorAll(".plano-anual").forEach((p) => {
                const nomeDoPacoteAdicionado = p.querySelector("h4");
                if(nomeDoPacoteAdicionado.innerText === pacote) {
                    nomeDoPacoteAdicionado.closest(".plano-anual").classList.add("selecionado-anual");
                }
            })
        };

        document.querySelectorAll(".plano-anual").forEach((pacoteAnual) => {
            pacoteAnual.addEventListener("click", () => {
                const pacoteSelecionado = document.querySelector(".selecionado-anual") || false;
                if(pacoteSelecionado) pacoteSelecionado.classList.remove("selecionado-anual");

                pacoteAnual.classList.add("selecionado-anual");
                const nomedoPacote = pacoteAnual.querySelector("h4").innerText;
                const precodoPacote = pacoteAnual.querySelector("p").innerText.replace("/yr", "").replace("$", "");
                pacote = nomedoPacote;
                preco = parseInt(precodoPacote);
                arrayServicos = [];
            })
        })
    }
}

botaoMudarPlano.addEventListener("click", () => {   
    let planoMensal = document.getElementById("p-mensal");
    let planoAnual = document.getElementById("p-anual");

    if(planoMensal.classList.contains("plano-atual")) {
        planoMensal.classList.remove("plano-atual");
        planoAnual.classList.add("plano-atual");
        botaoMudarPlano.style.justifyContent = "flex-end";
        plano = planoAnual.innerText;
    } 
    else if (planoAnual.classList.contains("plano-atual")) {
        planoAnual.classList.remove("plano-atual");
        planoMensal.classList.add("plano-atual");
        botaoMudarPlano.style.justifyContent = "flex-start";
        plano = planoMensal.innerText;
    }

    mostrarPacoteFormulario2();
})

/* Formulário 3 */

let servicosAdicionados = 0;

const funcionalidadesFormulario3 = () => {

    document.getElementById("servicos").innerHTML = `
        <div class="servico">
            <div class="caixa">
            </div>
            <div class="descricao-servico">
            <h4>Online service</h4>
            <p>Access to multiplayer games</p>
            </div>
            <div class="preco">+$${plano === "Monthly" ? "1" : "10"}/${plano === "Monthly" ? "mo" : "yr"}</div>
        </div>
        <div class="servico">
            <div class="caixa"></div>
            <div class="descricao-servico">
            <h4>Larger storage</h4>
            <p>Extra 1TB of cloud save</p>
            </div>
            <div class="preco">+$${plano === "Monthly" ? "2" : "20"}/${plano === "Monthly" ? "mo" : "yr"}</div>
        </div>
        <div class="servico">
            <div class="caixa"></div>
            <div class="descricao-servico">
            <h4>Customizable profile</h4>
            <p>Custom theme on your profile</p>
            </div>
            <div class="preco">+$${plano === "Monthly" ? "2" : "20"}/${plano === "Monthly" ? "mo" : "yr"}</div>
        </div>`; 

    document.querySelectorAll(".caixa").forEach((caixinha) => {
        caixinha.addEventListener("click", () => {
            if(!caixinha.classList.contains("marcada")) {
                caixinha.classList.add("marcada");
                caixinha.innerHTML = `<img src="assets/images/icon-checkmark.svg" alt="icone-check">`;

                const containerPai = caixinha.parentElement;
                containerPai.classList.add("adicionado");
                servicosAdicionados++;

                const nomeServico = containerPai.querySelector("h4").innerText;
                const precoServico = containerPai.querySelector(".preco").innerText.replace("$", "").replace("/mo", "").replace("+", "").replace("/yr", "");

                const servicoSalvo = new Object;
                servicoSalvo.nomeServico = nomeServico;
                servicoSalvo.precoServico = precoServico;

                arrayServicos.unshift(servicoSalvo);

            } else {
                caixinha.classList.remove("marcada");
                caixinha.innerHTML = ``;
                const containerPai = caixinha.parentElement;
                containerPai.classList.remove("adicionado");
                servicosAdicionados--;
                const nomeServico = containerPai.querySelector("h4").innerText;

                const removerServico = (nome) => {
                    let servicoASerDeletado = arrayServicos.find((s) => s.nomeServico === nome);
                    let arrayFiltrado = arrayServicos.filter((s) => s.nomeServico !== servicoASerDeletado.nomeServico);

                    arrayServicos = arrayFiltrado;
                }

                removerServico(nomeServico);
            }     
        })
    })

    if (arrayServicos.length !== 0) {
        arrayServicos.forEach((servico) => {
            let containerServicos = document.querySelectorAll(".servico");

            containerServicos.forEach((e) => {
                const nomeDoServico = e.querySelector("h4");
                if(nomeDoServico.innerText === servico.nomeServico) {
                    e.closest(".servico").classList.add("adicionado");
                    const caixa = e.querySelector(".caixa");
                    caixa.classList.add("marcada");
                    caixa.innerHTML = `<img src="assets/images/icon-checkmark.svg" alt="icone-check">`;
                }
            })
        }) 
    } else {
        const caixas = document.querySelectorAll(".caixa");
        const containerServicos = document.querySelectorAll(".servico");

        caixas.forEach((c) => {
            c.classList.remove("marcada");
            c.innerHTML = "";
        });
        containerServicos.forEach((c) => c.classList.remove("adicionado"));
    }
}

/* Formulário 4 */

let total = 0;

const funcionalidadesFormulario4 = () => {
    const tabela = document.querySelector("#tabela");
    tabela.innerHTML = "";
    
    tabela.innerHTML = `
        <div id="plano-escolhido">
            <div id="plano-mudar">
            <h4 id="plano">${pacote}(${plano})</h4>
            <p id="mudar">Change</p>
            </div>
            <div class="servico-preco"><h4>$${preco}/${plano === "Monthly" ? "mo" : "yr"}</h4></div>
        </div>
        <div id="servicos-adicionados">
        </div>
        `;

    arrayServicos.forEach((servico) => {
        document.getElementById("servicos-adicionados").innerHTML += `
        <div class="linha-servico">
          <p>${servico.nomeServico}</p>
          <div class="servico-preco">+$${servico.precoServico}/${plano === "Monthly" ? "mo" : "yr"}</div>
        </div>`
    })

    let pegarPrecoTotal = () => {
        total = parseInt(preco);
        arrayServicos.forEach((servico) => {
            total += parseInt(servico.precoServico);
        })
    }

    pegarPrecoTotal();

    document.getElementById("total").innerHTML = `
        <p>Total (per ${plano === "Monthly" ? "month" : "year"})</p>
        <div class="preco"><h4>+$${total}/${plano === "Monthly" ? "mo" : "yr"}</h4></div>
        `;

    document.getElementById("mudar").addEventListener("click", () => {
        apagarFormularioAtual();
        indice = 1;
        indiceindicador = 1;
        mostrarFormularioAtual();
    })
}


const mostrarProximoFormulario = () => {
    confirmarSePodeAvancar();
    if(avancar === true)  {
        apagarFormularioAtual();

        if(indice < formularios.length - 2) {
            indice++;
            indiceindicador++;
        }
         else {
            indice = formularios.length - 1;
            indiceindicador = 3;
        }

        mostrarFormularioAtual();
    }
}

const mostrarFormularioAnterior = () => {
    apagarFormularioAtual();

    if(indice > 0) {
        indice--;
        indiceindicador--;
    } else {
        indice = 0;
        indiceindicador = 0;
    }

    mostrarFormularioAtual();
    funcionalidadeParaCadaFormulario(indice);
}


botaoAvancar.addEventListener("click", mostrarProximoFormulario);
botaoVoltar.addEventListener("click", mostrarFormularioAnterior);

mostrarFormularioAtual();