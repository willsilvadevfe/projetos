Criado e desenvolvido por Willian Silva.
HTML, CSS, JavaScript, Bootstrap, SweetAlert2, totalmente responsivo a diferentes tipos de tela.

------------------------------------------------------------------------------------------
Instruções de Uso

    1 - Preenchimento do Relatório

            Todos os campos disponibilizados pelo desenvolvedor devem ser preenchidos obrigatoriamente.

            A Tolerância Superior (TLS) deve ser sempre maior que a Tolerância Inferior (TLI). Caso contrário, será exibida uma mensagem de erro.

            Não é permitido deixar campos em branco. Se isso ocorrer, os dados não serão enviados e será exibido um alerta ao usuário.

    2 - Confirmação dos Dados

            Após a confirmação de todos os dados, o sistema exibirá uma mensagem informando que o preenchimento está correto.

            Em seguida, os campos preenchidos e o botão Confirmar Dados serão bloqueados, liberando somente os campos para inserção dos valores medidos pelo usuário.

    3 - Interação com os Valores

        Estão disponíveis:

            Campo Input (Inserir Valores)

            Botão Adicionar Valor

            Botão Remover Último

            Botão Gerar PDF

            Ao inserir um valor no campo e clicar em Adicionar Valor, o gráfico será atualizado automaticamente com as linhas de tolerância (TLS e TLI) e com o valor informado.

            Caso seja inserido um dado incorreto, o usuário poderá corrigi-lo clicando em Remover Último, que excluirá o último valor adicionado.

    4 - Gráfico (Chart.js):

            O gráfico exibe em tempo real o processo de inserção de dados.

            São apresentados pontos coloridos para facilitar a visualização:

                Valor: azul

                Tolerância Superior (TLS): vermelho

                Tolerância Inferior (TLI): verde

            Ao clicar em qualquer um desses pontos, o usuário pode remover a linha correspondente, se necessário.

    5 - Geração do Relatório em PDF

            Após finalizar o preenchimento do relatório, clique no botão Gerar PDF.

            O arquivo será automaticamente baixado na pasta Downloads do Windows.

            O nome do arquivo seguirá o padrão: PartNumber + Cliente + Data + Hora.
-----------------------------------------------------------------------------------------
        
