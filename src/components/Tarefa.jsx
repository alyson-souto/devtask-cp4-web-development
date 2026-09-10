import { useState, useEffect } from 'react'
import '../css/estilo.css'


const Tarefa = () => {

    // HOOK - useState
    // =====================================================
    // useState - utilizado para manipular o estado de uma variável.
    //
    // COm a lista de tarefas. A função salvarTarefas procura no localStorage se já existem tarefas salvas.
    // AO encontrar - JSON.parse() transforma o texto novamente em lista.
    // Se não encontrar - começa com uma lista vazia [].
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");

        //                   ? : -> operador ternário
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    // CAMPOS DO FORMULÁRIO
    // =====================================================
    // Cada informações que o usuário digitar será armazenada em uma variável.
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    // Após o usuário envir o formulário, a tela voltará ao padrão ficando limpa e a prioridade em "Média"
    const [prioridade, setPrioridade] = useState("Média");

    // FILTRO
    // =====================================================
    // Guarda qual opção o usuário escolheu guardar a variável, sendo: "todas" - "pendentes" - "concluidas"
    const [filtro, setFiltro] = useState("todas");

    // HOOK - useEffect
    // =====================================================
    // useEffect - realiza um efeito colateral:
    // Sempre que uma variável como "tarefas" mudar, será salvo novamente a lista no localStorage.
    
    // [tarefas] - "execute novamente quando tarefas mudar".
    useEffect(() => {
        localStorage.setItem(
            "item-tarefa",
            JSON.stringify(tarefas)
        );
    }, [tarefas]);

    // FUNÇÃO ADICIONAR TAREFA
    // =====================================================
    const AdicionarTarefa =(e)=> {
        // Previne que a página recarregue automaticamente.
        e.preventDefault();

        // .trim() - retira espaços em branco e ajuda a verificar se o campo está vazio.
        if (!nome.trim()) return;

        // NOVO OBJETO - Cada tarefa será um objeto.
        const novaTarefa = {
            id: Date.now(),
            nome: nome,
            data: data,
            descricao: descricao,
            prioridade: prioridade,
            concluida: false
        };

        // SPREAD (...)
        // =================================================
        // ... -> Spread - Resgatar comandos/funções para criar novos elementos
        // pega as tarefas que já existem e coloca a nova tarefa no final.

        // SE tarefas na lista = [A, B]
        // ao adicionarmos novaTarefa = C
        // resultará em = [A, B, C]
        setTarefas([
            ...tarefas,
            novaTarefa
        ]);

        // Depois de adicionar, é limpo os campos do formulário para uma nova tarefa.
        setNome("")
        setData("");
        setDescricao("");
        setPrioridade("Média");
    }

    // FUNÇÃO CONCLUIR TAREFA
    // =====================================================
    const ConcluirTarefa = (id) => {
        // MAP() - percorre cada tarefa da lista que possui o mesmo ID apresentado.
        const tarefasAtualizadas = tarefas.map((tarefa) => {
            // === - (conhecido como operador de igualdade estrita) a função desse sinal é comparar se o ID da tarefa atual 
            // é exatamente igual ao ID que foi enviado para a função, verificando tanto o valor quanto o tipo de dado ao mesmo tempo.

            // == (Igualdade ampla): Compara apenas o valor. Ele tenta converter os tipos antes de comparar. Exemplo: 5 == "5" retorna true (ele ignora que um é número e o outro é texto).
            // === (Igualdade estrita): Compara o valor e o tipo do dado. Não faz conversão automática. Exemplo: 5 === "5" retorna false (porque um é Number e o outro é String).
            if (tarefa.id === id) {
                return {
                    ...tarefa,
                    concluida: !tarefa.concluida
                };
            }
            return tarefa;
        });
        setTarefas(tarefasAtualizadas);
    }

   
    // FUNÇÃO REMOVER TAREFA
    // =====================================================
    const RemoverTarefa = (id) => {
        // FILTER() - cria uma nova lista.
        // VERIFICA SE O ID DA TAREFA ATUAL É DIFERENTE DO ID QUE DESEJA APAGAR
        // SE O ID FOR IGUAL (TAREFA QUE DESEJA APAGAR) A CONDIÇÃO RETORNA FALSO E O ITEM É EXCLUIDO
        //                          .filter() faz uma cópia da lista e a organiza/filtra
        const apagarTarefa = tarefas.filter(
            (tarefa) => tarefa.id !== id
        );
        setTarefas(apagarTarefa);
    }

    // FILTRO DAS TAREFAS
    // =====================================================
    // Também é uitlizado filter().
    // Dependendo da opção escolhida, será mostrada determinadas tarefas.
    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtro === "concluidas") {
            return tarefa.concluida;
        }

        // Se for "todas", irá retornar todas as tarefas.
        return true;
    });

   
    


export default Tarefa;


