// Lógica do fluxo da página, exibição de etapas e cálculo MSAS

document.addEventListener('DOMContentLoaded', function () {
    // Seletores dos blocos
    const welcomeScreen = document.getElementById('welcome-screen');
    const physicalScreen = document.getElementById('physical-symptoms-screen');
    const resultScreen = document.getElementById('result-screen');

    // Botões
    document.getElementById('start-btn').addEventListener('click', function() {
        welcomeScreen.classList.add('hidden');
        physicalScreen.classList.remove('hidden');
        window.scrollTo(0,0);
    });

    document.getElementById('back-btn').addEventListener('click', function() {
        physicalScreen.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
        window.scrollTo(0,0);
    });

    document.getElementById('start-again-btn').addEventListener('click', function() {
        resultScreen.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
        window.scrollTo(0,0);
    });

    // Mostrar opções gráficas ao clicar "Sim" em cada sintoma
    document.querySelectorAll('.sintoma').forEach(function(sintomaDiv){
        const radios = sintomaDiv.querySelectorAll('input[type=radio]');
        const detalhes = sintomaDiv.querySelector('.sintoma-detalhes');
        radios.forEach(r => {
            r.addEventListener('change', function() {
                if (r.value === "1") {
                    detalhes.classList.remove('hidden');
                } else {
                    detalhes.classList.add('hidden');
                    // Resetar selects ao voltar para "não"
                    detalhes.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
                }
            });
        });
    });

    // Ao Enviar Formulário
    document.getElementById('physical-symptoms-form').addEventListener('submit', function(e){
        e.preventDefault();

        // Sintomas disponíveis: coloque todos aqui conforme index.html
        const sintomas = [
            "Dor", "Falta de energia", "Sonolência", "Suor", "Falta de ar", "Tontura", "Inchaço nos braços/pernas"
        ];
        let soma_total = 0;
        let n_sintomas_respondidos = 0;
        let resultados_individuais = [];
        let relatorio_sintomas = [];

        sintomas.forEach(function(nome) {
            const marcado = document.querySelector(`input[name="${nome}-present"]:checked`).value;
            if (marcado === "1") {
                // Pegue os valores de freq, int, incs
                let f = parseInt(document.querySelector(`[name="${nome}-freq"]`).value);
                let i = parseInt(document.querySelector(`[name="${nome}-int"]`).value);
                let inc = parseInt(document.querySelector(`[name="${nome}-incs"]`).value);
                // Média dos escores
                let media = ((f + i + inc) / 3);
                resultados_individuais.push({nome: nome, escore: media});
                relatorio_sintomas.push(`${nome}: média = ${media.toFixed(2)}`);
                soma_total += media;
                n_sintomas_respondidos++;
            } else {
                resultados_individuais.push({nome: nome, escore: 0});
                // Não acrescenta no total/número de sintomas (ou pode considerar 0 para todos se preferir)
                // INSTRUÇÃO MSAS OFICIAL: inclui todos; não assinalados contam como 0.
                n_sintomas_respondidos++;
            }
        });

        let escore_total = soma_total / n_sintomas_respondidos;
        escore_total = isNaN(escore_total) ? 0 : escore_total;
        // Orientação baseada na pontuação
        let orientacao = "";
        let cor = "#1a893e";
        if (escore_total >= 3) {
            orientacao = "⚠️ Sintomas de alta intensidade! Procure sua equipe de saúde ou pronto-atendimento imediatamente.";
            cor = "#c62828";
        } else if (escore_total >= 1.5) {
            orientacao = "Atenção: alguns sintomas moderados. Informe seu médico nas próximas horas ou acompanhamento.";
            cor = "#d7a413";
        } else {
            orientacao = "Sintomas leves ou ocasionais. Continue acompanhando. Notifique em caso de piora.";
            cor = "#175db3";
        }

        // Monta HTML do resultado
        let html =
            `<div style="border-left:6px solid ${cor};padding-left:10px;margin-bottom:18px;"><b>Escore do grupo de sintomas físicos:</b> <span style="font-size:1.2em;color:${cor};"><b>${escore_total.toFixed(2)}</b> / 4.00</span></div>
            <strong>Sintomas avaliados:</strong><ul>` +
            resultados_individuais.map(r => `<li>${r.nome}: ${r.escore.toFixed(2)}</li>`).join("") +
            `</ul>
            <div class="orientacao" style="color:${cor};margin-top:16px;margin-bottom:14px;border-radius:7px;padding:12px 10px;background:#f8f9fa;border:1px solid #dde6f7;"><b>Orientação:</b> ${orientacao}</div>
            <div style="font-size:0.93em;color:#555;margin-top:10px;">
                <i>Baseado no instrumento Memorial Symptom Assessment Scale (MSAS), autores Portenoy, Thaler et al., 1994.</i>
            </div>`;

        document.getElementById('result-body').innerHTML = html;

        physicalScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        window.scrollTo(0,0);
    });
});
