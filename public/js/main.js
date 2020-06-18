var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function() {
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    inicializaMarcador();
    $("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numeroPalavras);
}


function inicializaContador(params) {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdLetras = conteudo.length;
        $("#contador-caracteres").text(qtdLetras);

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

    });
}

function atualizaTempoInicial(tempo) {
    $("#tempo-digitacao").text(tempo);
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {

        var cronometroId = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();

            }
        }, tempoRestante * 100);
    });
}

function finalizaJogo() {
    inserePlacar();
    campo.toggleClass("campo-desativado");
    campo.attr("disabled", true);

}

function inicializaMarcador() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde ");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde ");
        }
    });
}


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var numPlavras = $("#contador-palavras").text();
    var usuario = "renato";
    var botaoRemovar = "<a href='#'><i class='small material-icons'>delete</i></a>";

    var linha = "<tr>" +
        "<td>" + usuario + "</td>" +
        "<td>" + numPlavras + "</td>" +
        "<td>" + botaoRemovar + "</td>" +
        "</tr>";
    corpoTabela.append(linha);


}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}