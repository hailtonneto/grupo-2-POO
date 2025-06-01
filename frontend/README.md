# 📒 Cesar Bank

Projeto para cadeira de Programação Orientada a Objeto da Cesar School. O mesmo visa a criação de uma aplicação bancária, desenvolvida com **Java + Spring Boot** no seu backend e **React Native** no frontend. Além disso, o banco de dados escolhido foi **PostgresSQL** rodando em **Docker**.

## 🚀 Tecnologias Utilizadas
- Java 17 + Spring Boot
- React Native + TypeScript + StyleSheet CSS 
- PostgreSQL 
- Docker 

## ✍🏻 Entrega 01 (22/03/2025)

- Histórias de Usuário: [Docs](https://docs.google.com/document/d/1LPuNzA818wmWqfB-BqDbfuLC_J_DybOAsH4cZ6EV2io/edit?usp=sharing)
- Prótotipo Lo-Fi: [Figma](https://www.figma.com/design/lzPT31RB0w2aoAeWWl14mn/Untitled?node-id=0-1&m=dev&t=9cF5jMYkNecUnVDZ-1)
- Screencast do Protótipo: [YouTube](https://youtu.be/MXjEJrIXQXo)

## 🏋🏻‍♀️ Entrega 02 (09/04/2025)

- Diagrama de Classes: 
- Issue/bug tracker: 
- Screencast: [YouTube](https://youtu.be/9nJGwfglaHM)

## 📱 Entrega 03 (30/04/2025)

- Diagrama de Classes (Atualizado): 
- Issue/bug tracker (Atualizado): 
- Screencast: [YouTube](https://youtube.com/shorts/N4QBy2_saGA)
- Screencast (Teste Automatizado): 

## ⚖️​ Entrega 04 (31/05/2025)

- Screencast: [YouTube]()
- Issue/bug tracker (Atualizado):
- Diagrama de Classes (Atualizado): 
- Screencast (Teste Automatizado): [YouTube]()

<br>
<br>

# 🚀 Como rodar o projeto

### ✅ Pré-requisitos gerais

- **Java 17+**
- **Node.js** e **npm**
- **Docker** e **Docker Compose**
- **IntelliJ IDEA** (ou outro IDE Java com suporte a Maven)
- **Expo Go App** (em seu celular) ou um emulador Android/iOS

## 🔧 1. Rodando o Back-End (Java + Spring Boot)

### 📦 Dependências e configuração

1. **Abra o IntelliJ IDEA**
   - Vá em `File > Open` e selecione a pasta `backend`.

2. **Importe o projeto como Maven**
   - Certifique-se de que o arquivo `pom.xml` foi detectado.
   - Caso não, clique com o botão direito no `pom.xml` e selecione **"Add as Maven Project"**.

3. **Sincronize o Maven**
   - O IntelliJ pode fazer isso automaticamente.
   - Se necessário, clique em **"Reload Project"** na aba lateral do Maven.

4. **Configure os containers com Docker**
   - No terminal, dentro da pasta `backend`, execute:

     ```bash
     docker-compose up -d
     ```

   - Isso iniciará os serviços auxiliares, como o banco de dados.

### ▶️ Executando a API

- No IntelliJ, abra a classe principal (normalmente `Application.java`, com a anotação `@SpringBootApplication`) e clique em **Run**.
- A API estará acessível em:

```
http://localhost:8080
```

## 📱 2. Rodando o Front-End (React Native + Expo)

### 📦 Instalação das dependências

1. No terminal, acesse a pasta `frontend`:

 ```bash
 cd frontend
````

2. Instale as dependências do projeto:

   ```bash
   npm install --legacy-peer-deps
   npm install --save-dev @react-native-community/cli@latest --legacy-peer-deps
   ```

### ▶️ Executando o App Mobile

1. Inicie o servidor de desenvolvimento:

   ```bash
   npx expo start -c
   ```

2. Isso abrirá o **Expo DevTools** no navegador.

3. Para visualizar o app:

   * Escaneie o QR Code com o aplicativo **Expo Go** (Android/iOS) **ou**
   * Execute em um emulador Android/iOS configurado em sua máquina.

<br>
<br>

## 🌐 Autores

| Nome | GitHub | Linkedin | Foto |
|------|--------|----------|------|
| **Gabriel Nogueira Brandão Oliveira** | [gabrielnog13](https://github.com/gabrielnog13) | [Gabriel Nogueira](https://www.linkedin.com/in/gabrielnog13/) | <img style="border-radius: 50%" src="https://github.com/user-attachments/assets/697af017-6dfe-43eb-80bc-c275c3e27c87" width="80px;" alt="Gabriel"/> |
| **Hailton de Melo Lima Neto** | [hailtonneto](https://github.com/hailtonneto) | [Hailton Neto](https://www.linkedin.com/in/hailton-neto-2a81a1196/) | <img style="border-radius: 50%" src="https://avatars.githubusercontent.com/u/130097508?v=4" width="80px;" alt="Hailton"/> |
| **Luccas José Bezerra Fernandes** | [brokendeveloper](https://github.com/brokendeveloper) | [Luccas Fernandes](https://www.linkedin.com/in/luccas-fernandes-07a283239/) | <img style="border-radius: 50%" src="https://github.com/user-attachments/assets/a70ef660-ca80-4ee2-b52b-839a85b65863" width="80px;" alt="Luccas"/> |
| **Pedro Fernandes Cavalcanti Ferreira** | [fernandes-pedro](https://github.com/fernandes-pedro) | [Pedro Fernandes Cavalcanti Ferreira](https://www.linkedin.com/in/pedro-fernandes-cavalcanti-ferreira-621591241/) | <img style="border-radius: 50%" src="https://avatars.githubusercontent.com/u/180231483?v=4" width="80px;" alt="Pedro"/> |
| **Rayanne Falcão** | [rayannefalcaoo](https://github.com/rayannefalcaoo) | [Rayanne Falcão](https://www.linkedin.com/in/rayanne-falc%C3%A3o-1415b1270/) | <img style="border-radius: 50%" src="https://github.com/user-attachments/assets/3539371e-78bd-4184-8924-0eeb40d6d761" width="80px;" alt="Vinícius"/> |
| **Vinícius de Souza Macedo** | [viniSouza06](https://github.com/viniSouza06) | [Vinícius Macedo](https://www.linkedin.com/in/vinicius-macedo-8a5873300/) | <img style="border-radius: 50%" src="https://github.com/user-attachments/assets/8bfa89eb-dda1-40e2-a611-7810fb55c169" width="80px;" alt="Vinícius"/> |
