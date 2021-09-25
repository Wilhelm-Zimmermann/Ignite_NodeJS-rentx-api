# Cadastro de carro

**RF**
- [] Deve ser possivel cadastrar um novo carro.
- [] Deve ser possível listar todas categorias. 

**RN**
- [] Não deve ser possível cadastrar um carro com a mesma placa.
- [] Não deve ser possível alterar a place de um carro já cadastrado.
- [] O carror deve ser cadastrado com disponibilidade por padrão.
- [] Somente administradores podem cadastar carros.

# Listagem de carros

**RF**
- [] Deve ser possível listar os carros disponíveis.
- [] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- [] Não é necessário estar logado no sistema.

# Cadastro de especificação no carro

**RF**
- [] Deve ser possível cadastrar uma especificação para um carro.
- [] Deve ser possível listar todas as especificações
- [] Deve ser possível listart todos os carros.


**RN**
- [] Não deve ser possível uma especificação para um carro não cadastrado.
- [] Não deve ser possível cadastrar uma especificação jã existente para o mesmo carro.
- [] Somente administradores podem cadastar novas especificações.

# Cadastro de imagens do carro

**RF**
- [] Deve ser possível cadastrar a imagem do carro.
- [] Deve ser possível listar todos carros.

**RN**
- [] Utilizar o multer para upload dos arquivos.

**RN**
- [] Deve ser possível cadastrar mais de uma imagem para o mesmo carro.
- [] Somente administradores podem cadastar novas imagens.

# Aluguel de carros

**RF**
- [] Deve ser possível cadastra um aluguel.

**RN**
- [] O aluguel deve ter duração mínima de 24 horas.
- [] Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo usuário.
- [] Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo carro.