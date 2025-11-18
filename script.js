const postForm = document.querySelector('#postForm');
const tituloInput = document.querySelector('#tituloInput');
const conteudoTextarea = document.querySelector('#conteudoTextarea');
const renderizadorTitulo = document.querySelector('#renderizador-titulo');
const renderizadorConteudo = document.querySelector('#renderizador-conteudo');

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

async function handleSubmit(event) {
    event.preventDefault();

    const tituloValue = tituloInput.value;
    const conteudoValue = conteudoTextarea.value;

    const data = {
        title: tituloValue,
        body: conteudoValue, 
        userId: 1
    };

    renderizadorTitulo.innerHTML = 'Enviando post...';
    renderizadorConteudo.innerHTML = 'Aguarde a resposta da API.';
    renderizadorTitulo.classList.add('loading');
    renderizadorConteudo.classList.add('loading');


    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const postRetornado = await response.json();

        renderizadorTitulo.innerHTML = `${postRetornado.title}`;
        renderizadorConteudo.innerHTML = postRetornado.body;

        tituloInput.value = '';
        conteudoTextarea.value = '';

    } catch (error) {
        console.error('Erro ao enviar o post:', error);
        renderizadorTitulo.innerHTML = '❌ Erro ao Publicar Artigo!';
        renderizadorConteudo.innerHTML = `Detalhes: ${error.message}`;
    } finally {
        renderizadorTitulo.classList.remove('loading');
        renderizadorConteudo.classList.remove('loading');
    }
}

postForm.addEventListener('submit', handleSubmit);