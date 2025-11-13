const URL_BASE = 'http://localhost:8080/produtos';

function mostrarMensagem(mensagem, tipo = 'sucesso') {
    alert(mensagem);
}

function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = mostrar ? 'block' : 'none';
    }
}

async function criarProduto(produto) {
    try {
        mostrarLoading(true);

        const response = await fetch(URL_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar produto');
        }

        mostrarMensagem('Produto criado com sucesso');
        listarProdutos();
        return true;
    } catch (erro) { 
        console.error('Erro:', erro);
        mostrarMensagem('Erro ao criar produto');
        return false;
    } finally {
        mostrarLoading(false);
    }
}

async function listarProdutos() {
    try {
        mostrarLoading(true);

        const response = await fetch(URL_BASE);

        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }

        const produtos = await response.json();
        exibirProdutosNaTabela(produtos);
    } catch (erro) {
        console.error('ERRO:', erro);
        mostrarMensagem('Erro ao carregar produtos. Verifique se o backend está rodando.', 'erro');
    } finally {
        mostrarLoading(false);
    }
}

async function buscarProdutosPorId(id) {
    try {
        const response = await fetch(`${URL_BASE}/${id}`);

        if (!response.ok) {
            throw new Error('Produto não encontrado');
        }

        const produto = await response.json();
        return produto;
    } catch (erro) { 
        console.error('Erro: ', erro);
        mostrarMensagem('Erro ao buscar produto', 'erro');
        return null;
    }
}

async function atualizarProduto(id, produto) { 
    try {
        mostrarLoading(true);

        const response = await fetch(`${URL_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar o produto');
        }

        mostrarMensagem('Produto atualizado com sucesso');
        return true;
    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro ao atualizar produto', 'erro');
        return false;
    } finally {
        mostrarLoading(false);
    }
}

async function deletarProduto(id) {
    try {
        const response = await fetch(`${URL_BASE}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar produto');
        }

        mostrarMensagem('Produto deletado com sucesso!');
        return true;

    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro ao deletar produto', 'erro');
        return false;
    }
}

function exibirProdutosNaTabela(produtos) {
    const tbody = document.querySelector('table tbody');

    if (!tbody) return;

    tbody.innerHTML = '';

    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum produto cadastrado</td></tr>';
        return;
    }

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.quantidadeEstoque}</td>
            <td>
                <button type="button" onclick="editarProduto(${produto.id}, '${produto.nome}', ${produto.preco}, ${produto.quantidadeEstoque})">
                    Editar
                </button>
                <button type="button" onclick="confirmarExclusao(${produto.id})">
                    Excluir
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function confirmarExclusao(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        const sucesso = await deletarProduto(id);
        if (sucesso) {
            listarProdutos();
            cancelarEdicao();
        }
    }
}

function editarProduto(id, nome, preco, quantidadeEstoque) {
    document.getElementById("form-edicao").style.display = "block";

    document.getElementById("idEditar").value = id;
    document.getElementById("nomeEditar").value = nome;
    document.getElementById("precoEditar").value = preco;
    document.getElementById("estoqueEditar").value = quantidadeEstoque;

    window.scrollTo(0, document.body.scrollHeight);
}

function cancelarEdicao() {
    document.getElementById("form-edicao").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    listarProdutos();

    const formAdicionar = document.querySelector('main > form');
    if (formAdicionar) {
        formAdicionar.addEventListener('submit', async function (event) {
            event.preventDefault();

            const produto = {
                nome: document.getElementById('nome').value,
                preco: parseFloat(document.getElementById('preco').value),
                quantidadeEstoque: parseInt(document.getElementById('estoque').value)
            };

            if (!produto.nome || produto.preco < 0 || produto.quantidadeEstoque < 0) {
                mostrarMensagem('Por favor, preencha todos os campos corretamente', 'erro');
                return;
            }

            const sucesso = await criarProduto(produto);

            if (sucesso) {
                formAdicionar.reset();
                listarProdutos();
            }
        });
    }

    const formEditar = document.querySelector('#form-edicao form');
    if (formEditar) {
        formEditar.addEventListener('submit', async function (event) {
            event.preventDefault();

            const id = document.getElementById('idEditar').value;
            const produto = {
                nome: document.getElementById('nomeEditar').value, 
                preco: parseFloat(document.getElementById('precoEditar').value), 
                quantidadeEstoque: parseInt(document.getElementById('estoqueEditar').value) 
            };

            if (!produto.nome || produto.preco < 0 || produto.quantidadeEstoque < 0) {
                mostrarMensagem('Por favor, preencha todos os campos corretamente', 'erro');
                return;
            }

            const sucesso = await atualizarProduto(id, produto);

            if (sucesso) {
                cancelarEdicao();
                listarProdutos();
            }
        });
    }
});