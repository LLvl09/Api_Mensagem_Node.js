# Sobre o projeto

Este é um projeto para mandar mensagens um para o outro dentro da api.Nele você pode enviar mensagens para outras pessoas logadas no projeto. Para enviar mensagem precisa logar para pegar o token **jwt** para validar se você está logado.

# Rotas

**/auth/cadastro post** usado para criar um usuário no projeto.
**/auth/login post** para logar no projeto.
**/enviarMensagem post** usado para enviar mensagem com autenticação jwt.
**/mensagens get** usado para ver as mensagens que te enviaram.