// Grupo de sintomas - com seus nomes e emojis atualizados
const grupo_sintomas = [
    {
        nome: "Sintomas Físicos Gerais",
        sintomas: [
            { nome: "Dor", emoji: "😩" },
            { nome: "Falta de energia", emoji: "🥱" },
            { nome: "Sonolência", emoji: "😴" },
            { nome: "Suor", emoji: "💧" },
            { nome: "Falta de ar", emoji: "😮‍💨" },
            { nome: "Tontura", emoji: "😵‍💫" },
            { nome: "Inchaço nos braços/pernas", emoji: "🦵" }
        ]
    },
    {
        nome: "Sintomas Gastrointestinais",
        sintomas: [
            { nome: "Estufamento", emoji: "😟" },
            { nome: "Enjoo", emoji: "🤢" },
            { nome: "Vômitos", emoji: "🤮" },
            { nome: "Diarreia", emoji: "🚽" },
            { nome: "Prisão de ventre", emoji: "🛑💩" },
            { nome: "Falta de apetite", emoji: "🍽️🚫" },
            { nome: "Boca seca", emoji: "👄💧" },
            { nome: "Problemas para engolir", emoji: "🥤😣" },
            { nome: "Mudança no gosto dos alimentos", emoji: "😝" },
            { nome: "Feridas na boca", emoji: "💥" },
            { nome: "Perda de peso", emoji: "⚖️⬇️" }
        ]
    },
    {
        nome: "Sintomas Urinários e Sexuais",
        sintomas: [
            { nome: "Problemas para urinar", emoji: "💦" },
            { nome: "Problemas no desejo ou atividade sexual", emoji: "🛌" }
        ]
    },
    {
        nome: "Sintomas Neurológicos",
        sintomas: [
            { nome: "Dificuldade para se concentrar", emoji: "🤔" },
            { nome: "Dormência ou formigamento nas mãos/pés", emoji: "✋🦶⚡" }
        ]
    },
    {
        nome: "Sintomas Dermatológicos",
        sintomas: [
            { nome: "Coceira", emoji: "🖐️😖" },
            { nome: "Alterações na pele", emoji: "🧴😕" },
            { nome: "Perda de cabelo", emoji: "👩‍🦲" }
        ]
    },
    {
        nome: "Sintomas Emocionais/Psicológicos",
        sintomas: [
            { nome: "Nervosismo", emoji: "😰" },
            { nome: "Tristeza", emoji: "😢" },
            { nome: "Preocupações", emoji: "😟" },
            { nome: "Irritado", emoji: "😡" },
            { nome: "“Eu não pareço mais eu mesmo(a)”", emoji: "🔄🧑‍🦱" }
        ]
    }
];

const freq_options = [
    { label: "Selecione...", value: "" },
    { label: "Não experimentou", value: "0" },
    { label: "Raramente", value: "1" },
    { label: "Ocasionalmente", value: "2" },
    { label: "Frequentemente", value: "3" },
    { label: "Quase sempre", value: "4" }
];

const inc_faces = [
    { emoji: "😀", value: 0, desc: "Nada" },
    { emoji: "🙂", value: 1, desc: "Um pouco" },
    { emoji: "😐", value: 2, desc: "Mais ou menos" },
    { emoji: "😟", value: 3, desc: "Consideravelmente" },
    { emoji: "😭", value: 4, desc: "Muito" }
];

let currStep = 0;
const totalSteps = grupo_sintomas.length + 1;

function mountSymptomsForms() {
    document.querySelectorAll('.msas-step').forEach((sec, idx) => {
        if (idx < grupo_sintomas.length) {
            let div = sec.querySelector('.symptoms-list');
            div.innerHTML = '';
            grupo_sintomas[idx].sintomas.forEach((s, j) => {
                let idB = `sintoma_${idx}_${j}`;
                div.innerHTML += `
                <div class="sintoma-box" data-sintoma="${s.nome}">
                    <label class="sintoma-nome">${s.emoji} ${s.nome}</label>
                    <div class="sim-nao">
                        <label><input type="radio" name="${idB}_has" value="0" checked> Não</label>
                        <label><input type="radio" name="${idB}_has" value="1"> Sim</label>
                    </div>
                    <div class="sintoma-detalhes hidden">
                        <div class="freq-label">Frequência:
                            <select class="freq-select" name="${idB}_freq">
                                ${freq_options.map(f => `<option value="${f.value}">${f.label}</option>`).join("")}
                            </select>
                        </div>
                        <div class="int-label">Intensidade:</div>
                        <div class="slider-box">
                            <input type="range" min="0" max="4" value="0" step="1" class="int-slider" aria-label="Intensidade do sintoma">
                        </div>
                        <div class="inc-label">Incômodo:</div>
                        <div class="inc-faces">
                            ${inc_faces.map(f =>
                                `<span class="inc-face" data-val="${f.value}" title="${f.desc}">${f.emoji}</span>`
                            ).join("")}
                        </div>
                    </div>
                </div>`;
            });
        }
    });

    // Outros sintomas - carinhas incômodo
    const outrosInc = document.getElementById("outro_incomodo");
    if (outrosInc) {
        outrosInc.innerHTML = inc_faces.map(f =>
            `<span class="inc-face" data-val="${f.value}" title="${f.desc}">${f.emoji}</span>`
        ).join("");
    }
}

function showStep(step) {
    document.querySelectorAll('.msas-step').forEach((sec, i) => {
        sec.classList.toggle('hidden', i !== step);
    });
    document.getElementById("prev-step").style.visibility = (step === 0) ? "hidden" : "visible";
    document.getElementById("next-step").classList.toggle('hidden', step === totalSteps-1);
    document.getElementById("finish-btn").classList.toggle('hidden', step !== totalSteps-1);
    window.scrollTo(0,0);
    document.getElementById("form-alert").classList.add('hidden');
}

function setupSymptomInteractivity() {
    document.querySelectorAll('.sim-nao input[type=radio]').forEach(radio => {
        radio.addEventListener('change', function() {
            const detailsBox = this.closest('.sintoma-box').querySelector('.sintoma-detalhes');
            if (this.value === "1") {
                detailsBox.classList.remove('hidden');
            } else {
                detailsBox.classList.add('hidden');
                detailsBox.querySelector('.freq-select').selectedIndex = 0;
                detailsBox.querySelector('.int-slider').value = 0;
                detailsBox.querySelectorAll('.inc-face').forEach(f => f.classList.remove('selected'));
            }
        });
    });
    document.querySelectorAll('.inc-faces').forEach(box => {
        box.querySelectorAll('.inc-face').forEach(face => {
            face.addEventListener('click', function() {
                box.querySelectorAll('.inc-face').forEach(f => f.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
}

function validateStep(step) {
    let sec = document.querySelectorAll('.msas-step')[step];
    let respostasFaltando = [];
    sec.querySelectorAll('.sintoma-box').forEach(box => {
        let sintoma = box.getAttribute("data-sintoma");
        let simRadio = box.querySelector('input[type=radio][value="1"]');
        let sim = simRadio && simRadio.checked;
        if (sim) {
            let fq = box.querySelector('.freq-select').value;
            if (fq === "") { respostasFaltando.push(`frequência de "${sintoma}"`);}
            let int = box.querySelector('.int-slider').value;
            if (int === "" || isNaN(int)) { respostasFaltando.push(`intensidade de "${sintoma}"`);}
            let algumaFace = false;
            box.querySelectorAll('.inc-face').forEach(f=>{
                if (f.classList.contains('selected')) algumaFace = true;
            });
            if (!algumaFace) { respostasFaltando.push(`incômodo de "${sintoma}"`);}
        }
    });
    return respostasFaltando;
}
function validateOutros() {
    let outros = document.getElementById('outro_nome').value.trim();
    if (outros.length > 0) {
        let algumaFace = false;
        document.querySelectorAll('#outro_incomodo .inc-face').forEach(f => {
            if (f.classList.contains('selected')) algumaFace = true;
        });
        if (!algumaFace) return ["incômodo do outro sintoma"];
    }
    return [];
}

document.addEventListener('DOMContentLoaded', function () {
    mountSymptomsForms();
    setupSymptomInteractivity();

    document.getElementById('start-btn').addEventListener('click', function() {
        document.getElementById('welcome-screen').classList.remove('visible');
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('msas-form').classList.remove('hidden');
        currStep = 0;
        showStep(currStep);
    });

    document.getElementById('prev-step').addEventListener('click', function() {
        if (currStep > 0) {
            currStep -= 1;
            showStep(currStep);
        }
    });
    document.getElementById('next-step').addEventListener('click', function() {
        let faltando = validateStep(currStep);
        if (currStep === totalSteps-1) {
            faltando = validateOutros();
        }
        if (faltando.length > 0) {
            document.getElementById("form-alert").innerHTML =
                "Por favor, preencha: <br><ul style='margin-top:6px;'>" +
                faltando.map(f=>"<li>"+f+"</li>").join("")+
                "</ul>";
            document.getElementById("form-alert").classList.remove('hidden');
        } else {
            currStep += 1;
            showStep(currStep);
        }
    });

    document.getElementById('msas-form').addEventListener('transitionend', function() {
        setupSymptomInteractivity();
    });

    document.getElementById('msas-form').addEventListener('submit', function(e){
        e.preventDefault();
        let sintomas_respostas = [];
        grupo_sintomas.forEach((grupo, idx) => {
            grupo.sintomas.forEach((sintoma, j) => {
                const suf = `sintoma_${idx}_${j}`;
                const resp = document.querySelector(`input[name="${suf}_has"]:checked`).value;
                if (resp == "1") {
                    let fq = parseInt(document.querySelector(`[name="${suf}_freq"]`).value);
                    let int = parseInt(document.querySelectorAll(`[name="${suf}_has"]`)[0]
                        .closest('.sintoma-box').querySelector('.int-slider').value);
                    let inc = 0;
                    const faces = document.querySelectorAll(`[name="${suf}_has"]`)[0]
                        .closest('.sintoma-box')
                        .querySelectorAll('.inc-face');
                    faces.forEach((f, k) => { if(f.classList.contains('selected')) inc = parseInt(f.dataset.val); });
                    sintomas_respostas.push({
                        nome: sintoma.nome,
                        grupo: grupo.nome,
                        fq: fq, int: int, inc: inc,
                        media: (fq + int + inc) / 3
                    });
                } else {
                    sintomas_respostas.push({
                        nome: sintoma.nome,
                        grupo: grupo.nome,
                        fq: 0, int: 0, inc: 0,
                        media: 0
                    });
                }
            });
        });
        let outro_nome = document.getElementById('outro_nome').value.trim();
        if (outro_nome.length > 1) {
            let inc = 0;
            document.querySelectorAll('#outro_incomodo .inc-face').forEach(f => {
                if (f.classList.contains('selected')) inc = parseInt(f.dataset.val);
            });
            sintomas_respostas.push({
                nome: outro_nome + " (outro)",
                grupo: "Outros",
                fq: 0, int: 0, inc: inc,
                media: inc
            });
        }
        let soma = sintomas_respostas.reduce((ac,v)=>ac+v.media,0);
        let media_total = soma/sintomas_respostas.length;

        const physical_idx = [
            "Dor","Falta de energia","Sonolência","Suor","Falta de ar","Tontura","Inchaço nos braços/pernas",
            "Estufamento","Enjoo","Vômitos","Diarreia","Prisão de ventre","Falta de apetite","Boca seca",
            "Problemas para engolir","Mudança no gosto dos alimentos","Feridas na boca","Perda de peso",
            "Problemas para urinar","Coceira","Alterações na pele","Perda de cabelo","Inchaço nos braços/pernas"
        ];
        let physical = sintomas_respostas.filter(s=>physical_idx.includes(s.nome));
        let phys_avg = physical.reduce((a,v)=>a+v.media,0)/(physical.length?physical.length:1);

        const psych_idx = [
            "Nervosismo","Tristeza","Preocupações","Irritado","“Eu não pareço mais eu mesmo(a)”"
        ];
        let psych = sintomas_respostas.filter(s=>psych_idx.includes(s.nome));
        let psych_avg = psych.reduce((a,v)=>a+v.media,0)/(psych.length?psych.length:1);

        const gdi_idx = [
            "Falta de energia","Dor","Boca seca","Falta de ar","Falta de apetite","Sonolência",
            "Tristeza","Nervosismo","Preocupações","“Eu não pareço mais eu mesmo(a)”"
        ];
        let gdi = sintomas_respostas.filter(s=>gdi_idx.includes(s.nome));
        let gdi_avg = gdi.reduce((a,v)=>a+v.media,0)/(gdi.length?gdi.length:1);

        let orientacao = "", cor = "#1a893e";
        if (media_total >= 3) {
            orientacao = "⚠️ Sintomas de alta intensidade! Procure sua equipe de saúde ou pronto-atendimento imediatamente.";
            cor = "#c62828";
        } else if (media_total >= 1.5) {
            orientacao = "Atenção: alguns sintomas moderados. Informe seu médico nas próximas horas ou acompanhamento.";
            cor = "#d7a413";
        } else {
            orientacao = "Sintomas leves ou ocasionais. Continue acompanhando. Notifique em caso de piora.";
            cor = "#175db3";
        }

        document.getElementById('msas-form').classList.add('hidden');
        let html = `
        <div id="to-image-result" style="background: #fefeff; border-radius:13px; padding:28px 5px 22px 5px; margin-bottom:14px;">
          <div style="border-left:6px solid ${cor};padding-left:13px;margin-bottom:18px;">
              <b>Escore Global:</b> <span style="font-size:1.21em;color:${cor};"><b>${media_total.toFixed(2)}</b>/4.00</span>
              <br>
              <span style="font-size:0.98em;color:#363;">PHYSICAL: <b>${phys_avg.toFixed(2)}</b></span> &nbsp; 
              <span style="color:#8360b5;">PSYCH: <b>${psych_avg.toFixed(2)}</b></span> &nbsp; 
              <span style="color:#6d9413;">GDI: <b>${gdi_avg.toFixed(2)}</b></span>
          </div>
          <ul style="margin-top:0.2em;">${
              sintomas_respostas.filter(sr=>sr.media>0)
                .map(sr=>`<li>${sr.nome}: <b>${sr.media.toFixed(2)}</b></li>`).join("")
          }</ul>
          <div class="orientacao" style="color:${cor};margin:12px 0 18px 0;border-radius:7px;padding:11px 11px;background:#f8f9fa;">
              <b>Orientação:</b> ${orientacao}
          </div>
        </div>`;

        document.getElementById('result-content').innerHTML = html;
        document.getElementById('result-screen').classList.remove('hidden');
        window.scrollTo(0,0);
    });

    document.getElementById('start-again-btn').addEventListener('click', function() {
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('welcome-screen').classList.add('visible');
        document.getElementById('welcome-screen').classList.remove('hidden');
        setTimeout(()=>{
            mountSymptomsForms();
            setupSymptomInteractivity();
        }, 100);
    });

    document.getElementById('download-img-btn').addEventListener('click', function() {
        var node = document.getElementById('to-image-result');
        html2canvas(node).then(canvas => {
            var link = document.createElement('a');
            link.download = 'msas-avaliacao-resumo.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});
