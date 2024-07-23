function manda() {
    let bodyType = document.getElementById('bodyType');
    let jogadorBT = bodyType.value;
    let desabilitarEnviar = document.getElementById('btnManda');
    let calcHp = document.getElementById('hpAtual');
    let calcHpMax = document.getElementById('hpMaximo');
    let testCon = document.getElementById('constituicao');

    let bodyTypes = {
        'Mago': [5, 10, 7, 8, 15, 13, 11, 6],
        'Tank': [7, 5, 6, 13, 8, 11, 10, 15],
        'Rogue': [8, 15, 13, 10, 5, 6, 11, 7],
        'Warrior': [15, 8, 10, 11, 5, 6, 7, 13],
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

    bodyType.disabled = true; // Desabilita o input de Bodytype
    desabilitarEnviar.disabled = true;
    calcHp.value = testCon.value * 2;
    calcHpMax.value = calcHp.value;
}

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

document.getElementById('constituicao').onchange = function(campo) {
    let hp = parseInt(this.value) * 2;
    document.getElementById('hpAtual').value = hp;
    document.getElementById('hpMaximo').value = hp;
  }