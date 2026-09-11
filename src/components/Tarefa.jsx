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

    // INTERFACE
    // =====================================================
    return (
        <div className="max-w-md mx-auto mt-10 bg-black rounded-2xl shadow-lg border border-amber-300 p-6">
            {/* TÍTULO */}
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
                DevTask
            </h1>

            {/* Adição de imagem/gif, trazendo leve e interessante personalidade ao projeto */}
            <img 
                src='/system.gif'
                alt='Samurai'
                className='w-30 mx-auto mt-2 mb-4 rounded-full'
            />

            {/* FORMULÁRIO */}
            <form
                onSubmit={AdicionarTarefa}
                className="space-y-3 mb-6"
            >

                {/* NOME */}
                <input
                    type="text"
                    value={nome}
                    // onChange acontece quando o usuário altera o conteúdo do campo.
                    
                    // e.target.value pega aquilo
                    // que foi digitado.
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome da tarefa"
                    className="w-full px-4 py-2 border border-gray-500 hover:border-amber-300 bg-gray-800 hover:bg-gray-500 rounded-2xl text-white transition-colors"
                />

                {/* DATA */}
                <input
                    // type="date" - Transforma o input em um seletor de data. Quando o usuário clica nele, o próprio navegador 
                    // abrirá um calendário para escolher o dia, mês e ano.
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-500 hover:border-amber-300 bg-gray-800 hover:bg-gray-500 rounded-2xl text-white transition-colors"
                />

                {/* DESCRIÇÃO */}
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição da tarefa"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-500 hover:border-amber-300 bg-gray-800 hover:bg-gray-500 rounded-2xl text-white transition-colors"
                />

                {/* PRIORIDADE */}
                <select
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-500 hover:border-amber-300 bg-gray-800 hover:bg-gray-500 rounded-2xl text-white transition-colors"
                >
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                </select>

                {/* BOTÃO */}
                <button
                    type="submit"
                    className="w-full bg-indigo-950 hover:bg-indigo-400 text-amber-300 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer"
                >
                    Adicionar
                </button>
            </form>

            {/* FILTROS */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setFiltro("todas")}
                    className="bg-indigo-950 hover:bg-indigo-400 transition-colors text-amber-300 px-3 py-2 rounded-xl"
                >
                    Todas
                </button>

                <button
                    onClick={() => setFiltro("pendentes")}
                    className="bg-indigo-950 hover:bg-indigo-400 transition-colors text-amber-300 px-3 py-2 rounded-xl"
                >
                    Pendentes
                </button>

                <button
                    onClick={() => setFiltro("concluidas")}
                    className="bg-indigo-950 hover:bg-indigo-400 transition-colors text-amber-300 px-3 py-2 rounded-xl"
                >
                    Concluídas
                </button>
            </div>

            {/* LISTA */}
            <ul className="space-y-3">
                {/* MAP() - percorre a lista e apresenta cada tarefa na tela. */}
                {tarefasFiltradas.map((tarefa) => (
                    <li
                        key={tarefa.id}
                        className="p-4 bg-indigo-800 hover:bg-indigo-600 border border-amber-300 rounded-2xl shadow-sm"
                    >
                        {/* NOME */}
                        <h2
                            className={
                                tarefa.concluida
                                    // Transição interessante quando o usuário clicar em concluir e desfazer a tarefa
                                    // ? e : - No React Substitui a estrutura tradicional do If e Else
                                    //           line-through - responsável por trazer o texto tachado com a percepção visual da tarefa estar concluída
                                    ? "font-bold line-through text-gray-400"
                                    : "font-bold text-gray-100"
                            }
                        >
                            {tarefa.nome}
                        </h2>

                        {/* DATA */}
                        <p className="text-sm text-amber-200">
                            Data: {tarefa.data}
                        </p>

                        {/* DESCRIÇÃO */}
                        <p className="mt-2 text-gray-100">
                            {tarefa.descricao}
                        </p>

                        {/* PRIORIDADE */}
                        <p className="text-sm mt-2 text-amber-200">
                            Prioridade: {tarefa.prioridade}
                        </p>

                        {/* BOTÕES */}
                        <div className="flex gap-2 mt-3">
                            {/* CALLBACK COncluir - Quando o botão for clicado, é chamado ConcluirTarefa().
                                O ID da tarefa é enviado/resgatado para a função.
                            */}
                            <button
                                onClick={() => ConcluirTarefa(tarefa.id)}
                                className="bg-green-700 hover:bg-green-500 transition-colors text-white px-3 py-2 rounded-xl"
                            >
                                {tarefa.concluida
                                    ? "Desfazer"
                                    : "Concluir"}
                            </button>

                            {/* CALLBACK Excluir - Quando o botão for clicado, é chamado RemoverTarefa()
                                ID da tarefa é enviado/resgatado para a função.
                            */}
                            <button
                                onClick={() => RemoverTarefa(tarefa.id)}
                                className="bg-red-700 hover:bg-red-500 transition-colors text-white px-3 py-2 rounded-xl"
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}

            </ul>

            {/* NENHUMA TAREFA - área para orientar ao usuário que não há nenhuma tarefa naquela seção */}
            {/* comparação sem utilizar If ou Else */}
            {/* Compara, SE NÃO TIVER TAREFAS DEIXA A MENSAGEM NENHUMA TAREFA ENCONTRADA */}
            {tarefasFiltradas.length === 0 && (
                <p className="text-center mt-5 text-white">
                    Nenhuma tarefa encontrada.
                </p>
            )}

        </div>
    );
}
    


export default Tarefa;

