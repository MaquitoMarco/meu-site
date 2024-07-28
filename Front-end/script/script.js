    let valoresAntigos = {};
    const $$ = seletor => document.querySelector(seletor)

function levelUP() {
    let pickLevel = document.getElementById("level");
    pickLevel.value = parseInt(pickLevel.value) + 1; // Pega o valor de level e adiciona 1, garantindo que seja um numero

    liberaStatus();
    alert('Você Subiu 1 nivel!');
}

function liberaStatus() {
    let pontos = document.getElementById("pontosDistribuir");
    pontos.value = parseInt(pontos.value) + 3; // Pega o valor de pontos e adiciona mais 3 em pontos, garantindo que seja um numero

    let onOff = document.querySelectorAll('.status'); // Seleciona a classe status do input no HTML

    if (parseInt(pontos.value) > 0) {
        onOff.forEach(input => {
            input.disabled = false;
            if (!valoresAntigos[input.id]) {
                valoresAntigos[input.id] = parseInt(input.value); // Salva o valor inicial se ainda não foi salvo
            }
        });
    } else {
        onOff.forEach(input => input.disabled = true);
    }
}

function atualizarPontos(event) {
    let pontos = document.getElementById("pontosDistribuir");
    let input = event.target;
    let valorAtual = parseInt(input.value);
    let valorAntigo = valoresAntigos[input.id];

    if (valorAtual > valorAntigo) {
        pontos.value = parseInt(pontos.value) - (valorAtual - valorAntigo);
        valoresAntigos[input.id] = valorAtual;  // Atualiza o valor antigo
    } else {
        input.value = valorAntigo;  // Restaura o valor antigo
    }

    if (parseInt(pontos.value) <= 0) {
        let inputs = document.querySelectorAll('.status');
        inputs.forEach(input => input.disabled = true); // Desabilita a opção de escrever em um input
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let inputs = document.querySelectorAll('.status');
    inputs.forEach(input => input.addEventListener('input', atualizarPontos)); // Garantir que o DOM esteja carregado.
}); 

document.getElementById('bodyType').onchange = function manda(test) {
    let bodyType = document.getElementById('bodyType');
    let jogadorBT = bodyType.value;
    let calcHp = document.getElementById('hpAtual');
    let calcHpMax = document.getElementById('hpMaximo');
    let calcCon = document.getElementById('constituicao');
    let staminaCalc = document.getElementById('stamina');
    let mpCalc = document.getElementById('mp');
    let mpMax = document.getElementById('mpMax');

    let bodyTypes = {
        'Mago': [5, 10, 7, 11, 15, 13, 8, 6],
        'Tank': [7, 5, 6, 13, 8, 11, 10, 15],
        'Rogue': [7, 15, 13, 10, 5, 6, 11, 8],
        'Warrior': [15, 8, 11, 10, 5, 6, 7, 13],
        'Controller': [5, 6, 7, 8, 13, 11, 15, 10],
        'Paladino': [10, 5, 6, 7, 13, 15, 8, 11],
    };

    document.getElementById('forca').value = bodyTypes[jogadorBT][0];
    document.getElementById('destreza').value = bodyTypes[jogadorBT][1];
    document.getElementById('agilidade').value = bodyTypes[jogadorBT][2];
    document.getElementById('stamina').value = bodyTypes[jogadorBT][3];
    document.getElementById('inteligencia').value = bodyTypes[jogadorBT][4];
    document.getElementById('sabedoria').value = bodyTypes[jogadorBT][5];
    document.getElementById('carisma').value = bodyTypes[jogadorBT][6];
    document.getElementById('constituicao').value = bodyTypes[jogadorBT][7];

    mpCalc.value = staminaCalc.value * 2;
    mpMax.value = mpCalc.value;
    calcHp.value = calcCon.value * 2;
    calcHpMax.value = calcHp.value;
    bodyType.disabled = true; // Desabilita o input de Bodytype
}

document.getElementById('pontosDistribuir').addEventListener('input', function() {
    let test2 = document.getElementById('pontosDistribuir');
    let pedrada = parseInt(test2.value);

    if (pedrada <= 0) {
        let inputs = document.querySelectorAll('.status');
        inputs.forEach(input => input.disabled = true);
    }
});

// Botões de adicionar um valor a um input, e calcular se necessario.

function atualizaInput(idInput, valor) {
    let num = document.getElementById(idInput);
    let tiraPontos = document.getElementById('pontosDistribuir');

    num.value = parseInt(num.value) + valor;
    tiraPontos.value = parseInt(tiraPontos.value) - 1;

    let event = new Event('input');
    tiraPontos.dispatchEvent(event);
}

function atualizaCon(idInput1, valor) {
    let num = document.getElementById(idInput1);
    let tiraPontos = document.getElementById('pontosDistribuir');
    let calcHp = document.getElementById('hpAtual');
    let calcHpMax = document.getElementById('hpMaximo');
    let hp = (parseInt(num.value) + valor) * 2;

    num.value = parseInt(num.value) + valor;
    calcHp.value = hp;
    calcHpMax.value = hp;

    tiraPontos.value = parseInt(tiraPontos.value) - 1;

    let event = new Event('input');
    tiraPontos.dispatchEvent(event);
}

function atualizaSta(idInput1, valor) {
    let num = document.getElementById(idInput1);
    let tiraPontos = document.getElementById('pontosDistribuir');
    let calcMp = document.getElementById('mp');
    let calcmpMax = document.getElementById('mpMax');
    let mp = (parseInt(num.value) + valor) * 2;

    num.value = parseInt(num.value) + valor;
    calcMp.value = mp;
    calcmpMax.value = mp;

    tiraPontos.value = parseInt(tiraPontos.value) - 1;

    let event = new Event('input');
    tiraPontos.dispatchEvent(event);
}

function tiraHp(inputId) {
    let pegaInput = document.getElementById(inputId);
    let hpAtual = document.getElementById('hpAtual');

    let inputValue = parseInt(pegaInput.value, 10);
    let hpValue = parseInt(hpAtual.value, 10);

    if (!isNaN(inputValue) && inputValue > 0) {
        // Calcula o novo valor de hpAtual sem ser menor que 0
        let novoHp = hpValue - inputValue;
        if (novoHp < 0) {
            novoHp = 0;
        }

        hpAtual.value = novoHp;
        pegaInput.value = ''; // Reseta o valor do input de dano para vazio
    } else {
        pegaInput.value = ''; // Reseta o valor do input de dano para vazio se o valor não for válido
    }
}

function curaHp(inputId) {
    let pegaInput = document.getElementById(inputId);
    let hpAtual = document.getElementById('hpAtual');
    let hpMaximo = document.getElementById('hpMaximo');

    let inputValue = parseInt(pegaInput.value, 10);
    let hpValue = parseInt(hpAtual.value, 10);
    let hpMaxValue = parseInt(hpMaximo.value, 10);

    if (!isNaN(inputValue) && inputValue > 0) {
        // Calcula o novo valor de hpAtual sem ultrapassar hpMaximo
        let novoHp = hpValue + inputValue;
        if (novoHp > hpMaxValue) {
            novoHp = hpMaxValue;
        }

        hpAtual.value = novoHp;
        pegaInput.value = ''; // Reseta o valor do input de cura para vazio
    } else {
        pegaInput.value = ''; // Reseta o valor do input de cura para vazio se o valor não for válido
    }
}

function tiraMp(inputId) {
    let pegaInput = document.getElementById(inputId);
    let mpAtual = document.getElementById('mp');

    let inputValue = parseInt(pegaInput.value, 10);
    let mpValue = parseInt(mpAtual.value, 10);

    if (!isNaN(inputValue) && inputValue > 0) {
        // Calcula o novo valor de hpAtual sem ser menor que 0
        let novoMp = mpValue - inputValue;
        if (novoMp < 0) {
            novoMp = 0;
        }

        mpAtual.value = novoMp;
        pegaInput.value = ''; // Reseta o valor do input de dano para vazio
    } else {
        pegaInput.value = ''; // Reseta o valor do input de dano para vazio se o valor não for válido
    }
}

function regenMp(inputId) {
    let pegaInput = document.getElementById(inputId);
    let mpAtual = document.getElementById('mp');
    let mpMaximo = document.getElementById('mpMax');

    let inputValue = parseInt(pegaInput.value, 10);
    let mpValue = parseInt(mpAtual.value, 10);
    let mpMaxValue = parseInt(mpMaximo.value, 10);

    if (!isNaN(inputValue) && inputValue > 0) {
        // Calcula o novo valor de mpAtual sem ultrapassar mpMaximo
        let novoMp = mpValue + inputValue;
        if (novoMp > mpMaxValue) {
            novoMp = mpMaxValue;
        }

        mpAtual.value = novoMp;
        pegaInput.value = ''; // Reseta o valor do input de cura para vazio
    } else {
        pegaInput.value = ''; // Reseta o valor do input de cura para vazio se o valor não for válido
    }
}