var tela = 0;
var temp = 0;
var cont = 0;
var fundo;
var fundo2;
var fundoRPG1;
var caminhao = [];
var x1Fala = 50;
var y1Fala = 165;
var larguraText = 500;
var posicaoXCaminhao = 70;
var posicaoYCaminhao = 500;
var posicaoCaminhao = 0;
var celeiro = [];
var fazendeiro;
var mostrouMensagem = false;
var mostrarMensagem = false;
var feno = [];
var fenoX = 0,
  fenoY = 0;
var fenoW = 0,
  fenoH = 0;
var atorFeno = true;
var fenoColetado = 0;
var fonte1;
var fonte2;
var sketchFeno;
var timerFeno;
var caminho = [];
var caminhaoLado = [];
var xCaminhaoLado = 5;
var placa;
var entreposto;
var nextTime = false;
var information = 0;

function preload() {
  fundo = loadImage("fundo.png");
  fundo2 = loadImage("inicioDoJogo.png");
  fundoRPG1 = loadImage("fundorpg1.png");
  caminhao[0] = loadImage("caminhao.png");
  caminhao[1] = loadImage("caminhao2.png");
  celeiro[0] = loadImage("Celeiro.png");
  celeiro[1] = loadImage("celeiro2.png");
  fazendeiro = loadImage("fazendeiro.png");
  feno[0] = loadImage("feno1.png");
  feno[1] = loadImage("feno2.png");
  feno[2] = loadImage("feno3.png");
  fonte1 = loadFont("OpenSans.ttf");
  fonte2 = loadFont("Orbitron.ttf");
  caminho[0] = loadImage("caminho.png");
  caminho[1] = loadImage("caminho2.png");
  caminho[2] = loadImage("caminho3.png");
  caminho[3] = loadImage("caminho4.png");
  caminho[4] = loadImage("caminho5.png");
  caminhaoLado[0] = loadImage("caminhaoLado.png");
  placa = loadImage("placa.png");
  entreposto = loadImage("entreposto.png");
}

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  imageMode(CORNER);
  // Alinhamento de texto padrão para a maioria das falas, se não for especificado
  textAlign(CENTER, CENTER);
}

function draw() {
  if (tela !== 14 && tela !== 16 && tela !== 18 && tela !== 20) {
    background(fundo);
  }

  if (telas[tela]) {
    telas[tela]();
  }
}

function iniciarTemporizadorNextFala() {
  nextTime = false;
  setTimeout(() => {
    nextTime = true;
  }, 1000);
}

function sortearNewFeno() {
  if (fenoColetado < 10) {
    fenoX = random(100, 500);
    fenoY = random(350, 500);
    fenoW = random(100, 150);
    fenoH = fenoW;
    sketchFeno = floor(random(feno.length));
    atorFeno = true;

    if (timerFeno) {
      clearTimeout(timerFeno);
    }
    timerFeno = setTimeout(() => {
      atorFeno = false;
      console.log("Feno sumiu!");
      setTimeout(sortearNewFeno, 250);
    }, 500);
  } else if (fenoColetado === 10) {
    setTimeout(() => {
      tela += 1;
      xCaminhaoLado = 5;
    }, 500);
  }
}
//organização das telas do jogo
const telas = {
  0: telaInicial,
  1: () => {
    background(fundo2);
    primeiraFala();
    botaoProximo();
  },
  2: () => {
    background(fundo2);
    segundaFala();
    botaoProximo();
  },
  3: () => {
    background(fundoRPG1);
    terceiraFala();
    botaoPular();
  },
  4: () => {
    background(fundoRPG1);
    quartaFala();
    botaoPular();
  },
  5: () => {
    background(fundoRPG1);
    quintaFala();
    botaoPular();
  },
  6: () => {
    background(fundoRPG1);
    if (posicaoCaminhao === 0) {
      image(caminhao[0], posicaoXCaminhao, posicaoYCaminhao, 90, 90);
    } else {
      image(caminhao[1], posicaoXCaminhao, posicaoYCaminhao, 90, 90);
    }
    botaoUpMoveTruck();
    botaoRightMoveTruck();
    botaoEnter();
  },
  7: () => {
    background(celeiro[0]);
    mostrarMensagem = true;
    if (mostrarMensagem) {
      entradaCeleiro();
    }
  },
  8: () => {
    background(celeiro[0]);
    secondCeleiro();
    nextFala();
    image(fazendeiro, 225, 330, 150, 150);
  },
  9: () => {
    background(celeiro[0]);
    thirdCeleiro();
    nextFala();
    image(fazendeiro, 225, 330, 150, 150);
  },
  10: () => {
    background(celeiro[1]);
    fourthCeleiro();
    nextFala();
    image(fazendeiro, 225, 330, 150, 150);
  },
  11: () => {
    background(celeiro[1]);
    fifthCeleiro();
    nextFala();
    image(fazendeiro, 225, 330, 150, 150);
  },
  12: () => {
    background(celeiro[1]);
    if (atorFeno) {
      image(feno[sketchFeno], fenoX, fenoY, fenoW, fenoH);
    }
    textSize(30);
    textAlign(CENTER);
    noStroke();
    fill("black");
    textFont(fonte2);
    text("Fenos Coletados:" + fenoColetado, 300, 50);
  },
  13: () => {
    background(caminho[1]);
    image(placa, 500, 375, 100, 100);
    image(caminhaoLado[0], xCaminhaoLado, 300, 200, 200);
    aceleradorTruck();
    if (xCaminhaoLado >= 600) {
      setTimeout(() => {
        tela = 14;
        xCaminhaoLado = 5;
        iniciarTemporizadorNextFala();
      }, 1000);
    }
  },
  14: () => {
    background(200);
    stroke("black");
    fill("yellow");
    rect(50, 50, 500, 500, 10);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(
      "Berço da alimentação: \n\nMais de 70% dos alimentos consumidos no Brasil vêm da agricultura familiar, feita em pequenas propriedades no campo.",
      100,
      300,
      400
    );
    if (nextTime) {
      nextFala();
    }
  },
  15: () => {
    background(caminho[0]);
    image(placa, 500, 375, 100, 100);
    image(caminhaoLado[0], xCaminhaoLado, 300, 200, 200);
    aceleradorTruck();
    if (xCaminhaoLado >= 600) {
      setTimeout(() => {
        tela = 16;
        xCaminhaoLado = 5;
        iniciarTemporizadorNextFala();
      }, 1000);
    }
  },
  16: () => {
    background(200);
    stroke("black");
    fill("yellow");
    rect(50, 50, 500, 500, 10);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(
      "Tradições preservadas: \n\nMuitas tradições culturais e religiosas são mantidas com força no campo, como a festa da colheita, o caruru, os cantos de lavoura e as rezas comunitárias.",
      100,
      300,
      400
    );
    if (nextTime) {
      nextFala();
    }
  },
  17: () => {
    background(caminho[2]);
    image(caminhaoLado[0], xCaminhaoLado, 300, 200, 200);
    aceleradorTruck();
    if (xCaminhaoLado >= 600) {
      setTimeout(() => {
        tela = 18;
        xCaminhaoLado = 5;
        iniciarTemporizadorNextFala();
      }, 1000);
    }
  },
  18: () => {
    background(200);
    stroke("black");
    fill("yellow");
    rect(50, 50, 500, 500, 10);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(
      "Ritmo de vida diferente: \n\nA vida no campo costuma seguir o ritmo da natureza: o nascer e o pôr do sol marcam o início e o fim do dia de trabalho.",
      100,
      300,
      400
    );
    if (nextTime) {
      nextFala();
    }
  },
  19: () => {
    background(caminho[3]);
    image(caminhaoLado[0], xCaminhaoLado, 300, 200, 200);
    aceleradorTruck();
    if (xCaminhaoLado >= 600) {
      setTimeout(() => {
        tela = 20;
        xCaminhaoLado = 5;
        iniciarTemporizadorNextFala();
      }, 1000);
    }
  },
  20: () => {
    background(200);
    stroke("black");
    fill("yellow");
    rect(50, 50, 500, 500, 10);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text(
      "Tecnologia no campo moderno:\n\nEmbora seja um ambiente tradicional, o campo atual utiliza drones, tratores inteligentes, sensores de solo e até aplicativos para controle da produção.",
      100,
      300,
      400
    );
    if (nextTime) {
      nextFala();
    }
  },
  21: () => {
    background(caminho[4]);
    image(caminhaoLado[0], xCaminhaoLado, 300, 200, 200);
    if (xCaminhaoLado < 350) {
      aceleradorTruck();
    } else if (xCaminhaoLado >= 350) {
      stroke("black");
      fill(255, 255, 255, 127);
      rect(250, 500, 100, 50, 10);
      fill(0, 0, 0, 100);
      textAlign(CENTER, CENTER);
      textSize(25);
      text("Andar", 300, 525);
    }
  },
  22: () => {
    background(entreposto);
    deixarFeno();
    if (information === 1) {
      fill(0, 0, 0);
      textSize(30);
      textAlign(CENTER);
      text("Fenos depositados", 300, 100);
    }
  },
  23: () => {
    background(celeiro[0]);
    mostrarMensagem = true;
    if (mostrarMensagem) {
      entradaCeleiro2();
    }
  },
  24: () => {
    textSize(100);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    text("FIM!", 300, 300);
  },
  25: () => {
    creditos();
    nextFala();
  },
  26: () => {
    creditos2();
    nextFala();
  },
  27: () => {
    creditos3();
    nextFala();
  },
};
//usado na tela inicial para identificar um clique nos botoes de "jogar" e "créditos"
function mouseClicked() {
  if (tela === 0) {
    if (mouseX >= 175 && mouseX <= 425 && mouseY >= 220 && mouseY <= 290) {
      tela = 1;
    } else if (
      mouseX >= 175 &&
      mouseX <= 425 &&
      mouseY >= 320 &&
      mouseY <= 390
    ) {
      tela = 25;
    }
  }
}
//primeira tela do jogo
function telaInicial() {
  background(fundo);
  noStroke();
  fill(173, 255, 47);
  rect(175, 220, 250, 70, 10);
  rect(175, 320, 250, 70, 10);
  fill("black");
  textAlign(CENTER, CENTER); // Alinhamento central para os botões da tela inicial
  textSize(40);
  text("Jogar", 300, 255);
  text("Créditos", 300, 355);
  noFill();
  stroke("white");
  if (mouseX >= 175 && mouseX <= 425 && mouseY >= 220 && mouseY <= 290) {
    stroke("black");
    fill(173, 255, 47, 100);
    rect(175, 220, 250, 70, 10);
    fill(0, 0, 0, 100);
  } else if (mouseX >= 175 && mouseX <= 425 && mouseY >= 320 && mouseY <= 390) {
    stroke("black");
    fill(173, 255, 47, 100);
    rect(175, 320, 250, 70, 10);
    fill(0, 0, 0, 100);
  }
  textAlign(LEFT, TOP); // Restaura o alinhamento padrão (ou o desejado para outras telas)
}
//telas de créditos
function creditos() {
  fill("yellow");
  rect(30, 30, 540, 540, 10);
  textAlign(CENTER, CENTER);
  fill("black");
  text(
    "Créditos\n\nJogo criado por BrenoPiaia na plataforma p5js.\n\n O projeto foi construido com a ajuda da professora de Pensamento Computacional.",
    50,
    300,
    500
  );
}

function creditos2() {
  fill("yellow");
  rect(30, 30, 540, 540, 10);
  textAlign(CENTER, CENTER);
  fill("black");
  text(
    "Imagens:\n\nGoogle Imagens, Freepik, ChatGPT, Canva e Microsoft Edge",
    50,
    300,
    500
  );
}

function creditos3() {
  fill("yellow");
  rect(30, 30, 540, 540, 10);
  textAlign(CENTER, CENTER);
  fill("black");
  text(
    "ChatGPT e Google Gemini foram de extrema importância na correção de erros e bugs nesse código. Também foram essencias para otimizar o código e ajudar com funções específicas.",
    50,
    300,
    500
  );
}
//falas durante o jogo
function primeiraFala() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textSize(40);
  textAlign(CENTER, CENTER); // Garante o alinhamento central para esta fala
  fill("black");
  text(
    "Qual seria a conexão entre o Campo e Cidade? O que ela interfere? De onde vem?",
    x1Fala,
    y1Fala,
    larguraText
  );
}

function segundaFala() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textSize(40);
  textAlign(CENTER, CENTER); // Garante o alinhamento central para esta fala
  fill("black");
  text("Vamos conhecer mais sobre isso nesse jogo!", x1Fala, 150, larguraText);
}

function terceiraFala() {
  fill(255, 215, 0);
  rect(20, 420, 560, 150, 10);
  textSize(30);
  textAlign(CENTER, CENTER); // Garante o alinhamento central para esta fala
  fill("black");
  text(
    "Você é responsável por transportar itens do campo para a cidade...",
    x1Fala,
    500,
    larguraText
  );
}

function quartaFala() {
  fill(255, 215, 0);
  rect(20, 420, 560, 150, 10);
  textSize(30);
  textAlign(CENTER, CENTER); // Garante o alinhamento central para esta fala
  fill("black");
  text(
    "...e também por transportar tecnologias da cidade para o campo.",
    x1Fala,
    500,
    larguraText
  );
}

function quintaFala() {
  fill(255, 215, 0);
  rect(20, 420, 560, 150, 10);
  textSize(30);
  textAlign(CENTER, CENTER); // Garante o alinhamento central para esta fala
  fill("black");
  text("Seu primeiro objetivo é entrar no celeiro.", x1Fala, 500, larguraText);
}
//falas do personagem do celeiro
function falaCeleiro() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textFont(fonte1);
  textSize(35);
  textAlign(CENTER, CENTER);
  fill("black");
  text(
    "Uai, cumpadi, que danado ocê tá arrumando por esses lados?",
    x1Fala,
    y1Fala,
    larguraText
  );
}

function secondCeleiro() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textSize(35);
  textFont(fonte1);
  textAlign(CENTER, CENTER);
  fill("black");
  text(
    "Ô cumpadi, tá cada vez mais puxado pra eu trabaiá na roça. Será que ocê podia me dá uma mão?",
    x1Fala,
    y1Fala,
    larguraText
  );
}

function thirdCeleiro() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textSize(35);
  textFont(fonte1);
  textAlign(CENTER, CENTER);
  fill("black");
  text(
    "Carrega esses feno pra mim e leva lá pra cidade, sô.",
    x1Fala,
    y1Fala,
    larguraText
  );
}

function fourthCeleiro() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textSize(35);
  textFont(fonte1);
  textAlign(CENTER, CENTER);
  fill("black");
  text(
    "Apanha esses feno ligeiro, sô, antes que eles sumam no pasto!",
    x1Fala,
    y1Fala,
    larguraText
  );
}

function fifthCeleiro() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textSize(35);
  textAlign(CENTER, CENTER);
  fill("black");
  textFont(fonte1);
  text("E junta dez fardão no bucho!", x1Fala, y1Fala, larguraText);
}

function sixthCeleiro() {
  fill(255, 215, 0);
  rect(20, 20, 560, 250, 10);
  textSize(35);
  textAlign(CENTER, CENTER);
  fill("black");
  textFont(fonte1);
  text(
    "Ô brigado, sô! Que Deus lhe abençoe e dê em dobro, viu?",
    x1Fala,
    y1Fala,
    larguraText
  );
}
//funções para o personagem do celeiro entrar em ação
function entradaCeleiro() {
  image(fazendeiro, 225, 330, 150, 150);
  falaCeleiro();
  nextFala();
}

function entradaCeleiro2() {
  image(fazendeiro, 225, 330, 150, 150);
  sixthCeleiro();
  nextFala();
}
//botões para avançar de tela
function botaoProximo() {
  fill("green");
  noStroke();
  triangle(500, 500, 500, 570, 550, 535);
  triangle(480, 500, 480, 570, 430, 535);

  if (botaoTriangulo(mouseX, mouseY, 500, 500, 500, 570, 550, 535)) {
    noFill();
    stroke("white");
    triangle(500, 500, 500, 570, 550, 535);
  }
  if (botaoTriangulo(mouseX, mouseY, 480, 500, 480, 570, 430, 535)) {
    noFill();
    stroke("white");
    triangle(480, 500, 480, 570, 430, 535);
  }
}
//avançar de tela
function nextFala() {
  if (tela !== 27) {
    noStroke();
    fill("green");
    triangle(280, 520, 280, 580, 220, 550);
    triangle(320, 520, 320, 580, 380, 550);

    if (botaoTriangulo(mouseX, mouseY, 280, 520, 280, 580, 220, 550)) {
      noFill();
      stroke("white");
      triangle(280, 520, 280, 580, 220, 550);
    }
    if (botaoTriangulo(mouseX, mouseY, 320, 520, 320, 580, 380, 550)) {
      noFill();
      stroke("white");
      triangle(320, 520, 320, 580, 380, 550);
    }
  } else if (tela === 27) {
    noStroke();
    fill("green");
    triangle(280, 520, 280, 580, 220, 550);
    if (botaoTriangulo(mouseX, mouseY, 280, 520, 280, 580, 220, 550)) {
      noFill();
      stroke("white");
      triangle(280, 520, 280, 580, 220, 550);
    }
  }
}
//avançar de tela
function botaoPular() {
  fill("green");
  noStroke();
  triangle(310, 570, 310, 530, 340, 550);
  triangle(290, 570, 290, 530, 260, 550);

  if (botaoTriangulo(mouseX, mouseY, 310, 570, 310, 530, 340, 550)) {
    noFill();
    stroke("white");
    triangle(310, 570, 310, 530, 340, 550);
  }
  if (botaoTriangulo(mouseX, mouseY, 290, 570, 290, 530, 260, 550)) {
    noFill();
    stroke("white");
    triangle(290, 570, 290, 530, 260, 550);
  }
}
//função que verifica que a posição x e y do mouse esta dentro do triangulo
function botaoTriangulo(x, y, px1, py1, px2, py2, px3, py3) {
  let a = (px2 - px1) * (y - py1) - (py2 - py1) * (x - px1);
  let b = (px3 - px2) * (y - py2) - (py3 - py2) * (x - px2);
  let c = (px1 - px3) * (y - py3) - (py1 - py3) * (x - px3);
  return (a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0);
}
//organização de casos em um laço chamado "switch"
function mouseReleased() {
  switch (tela) {
    case 0:
      break;
    case 1:
    case 2:
      if (botaoTriangulo(mouseX, mouseY, 500, 500, 500, 570, 550, 535)) {
        tela += 1;
      } else if (botaoTriangulo(mouseX, mouseY, 480, 500, 480, 570, 430, 535)) {
        tela -= 1;
      }
      break;
    case 3:
    case 4:
    case 5:
      if (botaoTriangulo(mouseX, mouseY, 310, 570, 310, 530, 340, 550)) {
        tela += 1;
      } else if (botaoTriangulo(mouseX, mouseY, 290, 570, 290, 530, 260, 550)) {
        tela -= 1;
      }
      break;
    case 6:
      if (posicaoXCaminhao === 420) {
        if (mouseX >= 400 && mouseX <= 520 && mouseY >= 100 && mouseY <= 135) {
          tela = 7;
        }
      }
      break;
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 23:
    case 26:
      if (botaoTriangulo(mouseX, mouseY, 320, 520, 320, 580, 380, 550)) {
        let proximaTela = tela + 1;
        if (proximaTela === 12) {
          sortearNewFeno();
        }
        tela = proximaTela;
      } else if (botaoTriangulo(mouseX, mouseY, 280, 520, 280, 580, 220, 550)) {
        tela -= 1;
      }
      break;
    case 14:
    case 16:
    case 18:
    case 20:
      if (nextTime) {
        if (botaoTriangulo(mouseX, mouseY, 320, 520, 320, 580, 380, 550)) {
          tela += 1;
        } else if (
          botaoTriangulo(mouseX, mouseY, 280, 520, 280, 580, 220, 550)
        ) {
          tela -= 1;
        }
      }
      break;
    case 21:
      if (xCaminhaoLado >= 350) {
        if (mouseX >= 250 && mouseX <= 350 && mouseY >= 500 && mouseY <= 550) {
          tela = 22;
        }
      }
      break;
    case 22:
      if (mouseX >= 100 && mouseX <= 500 && mouseY >= 400 && mouseY <= 500) {
        information = 1;
        setTimeout(() => {
          tela += 1;
        }, 1000);
      }
      break;
    case 25:
      if (botaoTriangulo(mouseX, mouseY, 320, 520, 320, 580, 380, 550)) {
        let proximaTela = tela + 1;
        if (proximaTela === 12) {
          sortearNewFeno();
        }
        tela = proximaTela;
      } else if (botaoTriangulo(mouseX, mouseY, 280, 520, 280, 580, 220, 550)) {
        tela = 0;
      }
      break;
    case 27:
      if (botaoTriangulo(mouseX, mouseY, 280, 520, 280, 580, 220, 550)) {
        tela -= 1;
      }
      break;
  }
}
//botão que move o primeiro caminhão para cima
function botaoUpMoveTruck() {
  if (posicaoYCaminhao <= 230) {
    stroke(210);
    fill(255, 255, 255, 127);
    rect(440, 500, 50, 50, 10);
    fill(0, 128, 0, 64);
    triangle(465, 510, 450, 540, 480, 540);
  } else {
    fill(255, 255, 255);
    noStroke();
    rect(440, 500, 50, 50, 10);
    fill(0, 128, 0);
    triangle(465, 510, 450, 540, 480, 540);
    if (mouseX >= 440 && mouseX <= 490 && mouseY >= 500 && mouseY <= 550) {
      noFill();
      stroke("black");
      rect(440, 500, 50, 50, 10);
    }
    if (mouseIsPressed) {
      if (mouseX >= 440 && mouseX <= 490 && mouseY >= 500 && mouseY <= 550) {
        posicaoYCaminhao = posicaoYCaminhao - 5;
        posicaoCaminhao = 0;
      }
    }
  }
}
//botão que move o primeiro caminhão para a direita
function botaoRightMoveTruck() {
  if (posicaoYCaminhao > 230 || posicaoXCaminhao === 420) {
    stroke(210);
    fill(255, 255, 255, 127);
    rect(500, 500, 50, 50, 10);
    fill(0, 128, 0, 64);
    triangle(510, 510, 510, 540, 540, 525);
  } else if (posicaoYCaminhao <= 230) {
    noStroke();
    fill(255, 255, 255);
    rect(500, 500, 50, 50, 10);
    fill(0, 128, 0);
    triangle(510, 510, 510, 540, 540, 525);
    if (mouseX >= 500 && mouseX <= 550 && mouseY >= 500 && mouseY <= 550) {
      noFill();
      stroke("black");
      rect(500, 500, 50, 50, 10);
    }
    if (mouseIsPressed) {
      if (mouseX >= 500 && mouseX <= 550 && mouseY >= 500 && mouseY <= 550) {
        posicaoXCaminhao = posicaoXCaminhao + 5;
        posicaoCaminhao = 1;
        posicaoYCaminhao = 220;
      }
    }
  }
}
// botão para entrar no celeiro
function botaoEnter() {
  if (posicaoXCaminhao === 420) {
    noStroke();
    fill("yellow");
    rect(400, 100, 120, 35, 10);
    textSize(20);
    fill("black");
    text("ENTRAR", 460, 117);
    if (mouseX >= 400 && mouseX <= 520 && mouseY >= 100 && mouseY <= 135) {
      stroke("black");
      noFill();
      rect(400, 100, 120, 35, 10);
    }
  } else {
    stroke(210);
    fill(255, 255, 255, 127);
    rect(400, 100, 120, 35, 10);
    textSize(20);
    fill(0, 0, 0, 100);
    text("ENTRAR", 460, 117);
  }
}
//botão para fazer o segundo caminhão andar
function aceleradorTruck() {
  if (xCaminhaoLado < 600) {
    stroke("black");
    fill(255, 255, 255);
    rect(250, 500, 100, 50, 10);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Andar", 300, 525);
    if (mouseX >= 250 && mouseX <= 350 && mouseY >= 500 && mouseY <= 550) {
      noFill();
      stroke("white");
      rect(250, 500, 100, 50, 10);
    }
    if (mouseIsPressed) {
      if (mouseX >= 250 && mouseX <= 350 && mouseY >= 500 && mouseY <= 550) {
        xCaminhaoLado += 5;
      }
    }
  } else {
    stroke("black");
    fill(255, 255, 255, 127);
    rect(250, 500, 100, 50, 10);
    fill(0, 0, 0, 100);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Andar", 300, 525);
  }
}
//função que cria o botão de "depositar fenos" na última tela
function deixarFeno() {
  noStroke();
  fill(255);
  rect(100, 400, 400, 100, 10);
  textSize(30);
  textAlign(CENTER, CENTER); // Garante o alinhamento central para esta função
  fill(0);
  text("Depositar fenos", 300, 450);
  if (mouseX >= 100 && mouseX <= 500 && mouseY >= 400 && mouseY <= 500) {
    stroke(0);
    fill(255, 255, 255, 127);
    rect(100, 400, 400, 100, 10);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(0, 100);
    text("Depositar fenos", 300, 450);
  }
}
//função usada para identificar se o mouse está sobre uma imagem (complexa)
function mouseDentroImagem(img, x, y, w, h) {
  let mx = mouseX - x;
  let my = mouseY - y;

  if (mx >= 0 && mx < w && my >= 0 && my < h) {
    let ix = floor((mx / w) * img.width);
    let iy = floor((my / h) * img.height);
    let index = 4 * (iy * img.width + ix);
    let alpha = img.pixels[index + 3];
    return alpha > 0;
  }
  return false;
}
//função que faz os fenos sumirem ou serem coletados e somado aos "fenos coletados"
function mousePressed() {
  if (tela === 12) {
    if (atorFeno && sketchFeno !== undefined) {
      feno[sketchFeno].loadPixels();
      if (mouseDentroImagem(feno[sketchFeno], fenoX, fenoY, fenoW, fenoH)) {
        console.log("clicou no feno");
        atorFeno = false;
        fenoColetado++;
        if (timerFeno) {
          clearTimeout(timerFeno);
        }
        sortearNewFeno();
      }
    }
  }
}
