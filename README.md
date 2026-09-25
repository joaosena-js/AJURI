# AJURI Patrimônio

> Uma cartilha interativa para tornar a gestão patrimonial mais clara, organizada e acessível.

## Sobre o projeto

O **AJURI Patrimônio** é um guia digital criado para apoiar os servidores que atuam na gestão de bens móveis do Poder Executivo do Amazonas.

Em uma única experiência, a cartilha reúne orientações práticas sobre as principais etapas do controle patrimonial: da recepção da nota fiscal ao inventário e à virada de ano. O conteúdo foi organizado na ordem em que os procedimentos acontecem no dia a dia, facilitando a consulta e a aplicação das rotinas.

## O que você encontra aqui

- Introdução ao Sistema Eletrônico de Controle Patrimonial;
- Recepção de NE/NF;
- Entrada de bens no almoxarifado;
- Tombamento e identificação patrimonial;
- Transferência interna;
- Desfazimento de bens;
- Depreciação;
- Inventário;
- Procedimentos de virada de ano;
- Vídeo-tutoriais para complementar o aprendizado.

## Uma experiência feita para consultar

A cartilha foi pensada para ser usada durante a rotina de trabalho. Por isso, conta com:

- navegação lateral por capítulos;
- filtro rápido para localizar um assunto;
- layout responsivo para computador, tablet e celular;
- conteúdos organizados em etapas e painéis;
- imagens de apoio e destaques para pontos importantes;
- reprodução de tutoriais em vídeo;
- indicador de progresso e botão para voltar ao topo.

## Tecnologias

O projeto utiliza tecnologias simples, leves e fáceis de manter:

- **HTML5** para a estrutura da cartilha;
- **CSS3** para identidade visual, responsividade e animações;
- **JavaScript** para navegação, busca, vídeos e interações;
- **YouTube** como fonte dos vídeo-tutoriais.

## Como executar

Por ser um projeto estático, não é necessário instalar dependências ou configurar um servidor complexo.

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador.

Para uma experiência melhor durante o desenvolvimento, também é possível utilizar uma extensão de servidor local, como o **Live Server** no Visual Studio Code.

## Organização dos arquivos

```text
.
├── index.html
├── README.md
└── assets
	├── css
	│   └── style.css
	├── img
	└── js
		└── script.js
```

## Atualização dos vídeos

Os tutoriais são cadastrados no arquivo `assets/js/script.js`, dentro da lista `videoLibrary`. Para adicionar um vídeo, informe o título e o link do YouTube no campo `url` correspondente ao capítulo.

## Contexto institucional

O AJURI é instituído pelo **Decreto Estadual nº 34.161/2013**, tendo a **Secretaria de Administração e Gestão (SEAD)** como órgão central coordenador. A cartilha está vinculada à **Coordenadoria de Patrimônio (CPAT)**.

---

Feito para apoiar uma gestão patrimonial mais simples, consistente e eficiente.