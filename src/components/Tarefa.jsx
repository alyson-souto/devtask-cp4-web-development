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

    


export default Tarefa;


