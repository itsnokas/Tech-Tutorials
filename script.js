





// Aqui estão armazenados os tuturiais de slide da página index.html

  const tutoriais = [
    {
        imagem: "images/Hero-Bloom-Logo.jpg",
        titulo: "Como Instalar o Windows 11?",
        descricao: "Este tutorial explica passo a passo como instalar o novo sistema operativo Windows 11 em um computador.",
        link: "programacao/windows11.html"
    },
    {
        imagem: "images/overck.jpg",
        titulo: "Como Fazer Overclock do Processador?",
        descricao: "Aprenda como fazer overclock do processador para ter melhor desempenho.",
        link: "hardware/overclock.html"
    },
    {
        imagem: "images/transp.PNG",
        titulo: "Como Transferir Arquivos de um Computador para Outro?",
        descricao: "Aprenda como transferir arquivos importantes do teu computador para outro.",
        link: "redes/transferirarq.html"
    },
    {
        imagem: "images/audip.PNG",
        titulo: "Como Resolver Problemas de Áudio no Computador?",
        descricao: "Saiba como diagnosticar e resolver problemas de áudio no computador.",
        link: "informatica/audio.html"
    },
    {
        imagem: "images/unnamed.jpg",
        titulo: "Como Formatar um Computador?",
        descricao: "Aprenda a formatar um PC e realizar uma instalação limpa do sistema operativo Windows.",
        link: "hardware/formatarpc.html"
    },
    {
        imagem: "images/aquecip.jpg",
        titulo: "Como Diagnosticar e Resolver Problemas de Superaquecimento do Computador?",
        descricao: "Este tutorial irá ajudá-lo a diagnosticar e resolver problemas de superaquecimento no computador.",
        link: "hardware/aquecimento.html"
    }
   
];



// Faz o sistema de slide funcionar corretamente
const tutorialsContainer = document.querySelector('.tutorials-container');
const nextBtn = document.querySelector('.arrow-right');
const prevBtn = document.querySelector('.arrow-left');

let startIndex = 0;

function displayTutorials() {
    // Limpar container antes de adicionar novos tutoriais
    tutorialsContainer.innerHTML = "";

    for (let i = startIndex; i < startIndex + 3; i++) {
        if (i >= tutoriais.length) {
            break;
        }
        const tutorial = tutoriais[i];
        const tutorialHTML = `
            <div class="tutorial" style="opacity: 0; transform: translateX(50px); transition: opacity 0.5s ease, transform 0.5s ease;">
                <img src="${tutorial.imagem}" alt="${tutorial.titulo}">
                <div class="tutorial-info">
                    <h3>${tutorial.titulo}</h3>
                    <p>${tutorial.descricao}</p>
                    <a href="${tutorial.link}" class="btn">Saber Mais</a>
                </div>
            </div>
        `;
        tutorialsContainer.innerHTML += tutorialHTML;
    }
    // Ativar a animação após adicionar os tutoriais ao DOM
    setTimeout(() => {
        const newTutorials = tutorialsContainer.querySelectorAll('.tutorial');
        newTutorials.forEach((tutorial, index) => {
            tutorial.style.opacity = '1';
            tutorial.style.transform = 'translateX(0)';
        });
    }, 100);
}

// Mostra os primeiros 3 tutoriais
displayTutorials();

// Mostra os próximos 3 tutoriais
nextBtn.addEventListener('click', function() {
    startIndex += 3;
    if (startIndex >= tutoriais.length) {
        startIndex = 0;
    }
    displayTutorials();
});

// Mostra os 3 tutoriais anteriores
prevBtn.addEventListener('click', function() {
    startIndex -= 3;
    if (startIndex < 0) {
        startIndex = Math.max(0, tutoriais.length - 3);
    }
    displayTutorials();
});









document.addEventListener("DOMContentLoaded", function() {
    loadComments();

    document.getElementById("comment-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var nome = document.getElementById("name").value;
        var comentario = document.getElementById("comment").value;

        sendComment(nome, comentario);

        document.getElementById("name").value = "";
        document.getElementById("comment").value = "";
    });
});

function loadComments() {
    fetch('comentarios.json')
    .then(response => response.json())
    .then(data => {
        data.comentarios.forEach(comentario => {
            displayComment(comentario.nome, comentario.comentario);
        });
    });
}

function sendComment(nome, comentario) {
    fetch('comentarios.json')
    .then(response => response.json())
    .then(data => {
        data.comentarios.push({ nome: nome, comentario: comentario });
        return data;
    })
    .then(updatedData => {
        fetch('comentarios.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(() => {
            displayComment(nome, comentario);
        });
    });
}

function displayComment(nome, comentario) {
    var commentContainer = document.getElementById("comentarios-container");

    var commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    var nameElement = document.createElement("strong");
    nameElement.textContent = nome;

    var commentContent = document.createElement("p");
    commentContent.textContent = comentario;

    commentElement.appendChild(nameElement);
    commentElement.appendChild(commentContent);

    commentContainer.appendChild(commentElement);
}













document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");

    stars.forEach(function(star, index) {
        star.addEventListener("click", function() {
            const rating = index + 1;
            const tutorialId = 1; // Você pode substituir por um identificador único para cada tutorial
            rateTutorial(tutorialId, rating);
        });
    });

    // Função para calcular a média das avaliações
    function calculateAverageRating(ratings) {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((total, current) => total + current, 0);
        return (sum / ratings.length).toFixed(1);
    }

    // Função para atualizar a exibição da classificação média
    function updateAverageRating(tutorialId, ratings) {
        const averageRating = calculateAverageRating(ratings);
        const averageRatingElement = document.querySelector(`[data-tutorial-id="${tutorialId}"] .average-rating`);
        averageRatingElement.textContent = `(${averageRating}/5)`;
    }

    // Função para lidar com a classificação do tutorial
    function rateTutorial(tutorialId, rating) {
        const stars = document.querySelectorAll(`[data-tutorial-id="${tutorialId}"] .star`);

        stars.forEach(function(star, index) {
            if (index < rating) {
                star.classList.add("filled");
            } else {
                star.classList.remove("filled");
            }
        });

        // Atualizar a média e salvar as avaliações
        saveRating(tutorialId, rating);
    }

    // Função para salvar a avaliação em um arquivo JSON
    function saveRating(tutorialId, rating) {
        // Recuperar as avaliações existentes do arquivo JSON
        fetch("ratings.json")
            .then(response => response.json())
            .then(data => {
                const ratings = data[tutorialId] || [];
                ratings.push(rating);
                data[tutorialId] = ratings;
                // Salvar as avaliações atualizadas de volta no arquivo JSON
                fetch("ratings.json", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                // Atualizar a exibição da classificação média
                updateAverageRating(tutorialId, ratings);
            });
    }
});








