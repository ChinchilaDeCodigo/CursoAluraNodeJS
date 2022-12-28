
import fs from 'fs';
import chalk from "chalk";

function extraiLinks(texto){
    // \[[^[\]]*?\] - expressão regular que captura todos os caracteres dentro de um [] incluso
    // \((https?[^[\]]*?)\) - expressão regular que captura "http" ou "https" com quaisquer caracteres a frente, tudo dentro de um () incluso
    const regex = /\[([^[\]]*?)\]\((https?[^[\]]*?)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => (
        {
            [captura[1]]: captura[2]
        })
    );
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo.';
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, '- Não há arquivo no diretório'));
}

//async/await
async function pegaArquivo(caminho){
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminho, {encoding: encoding});
        return extraiLinks(texto);
    }catch(erro){
        trataErro(erro);
    }

}

export default pegaArquivo;


//promises com then
// function pegaArquivo(caminho){
//     const encoding = 'utf-8';

//     fs.promises
//         .readFile(caminho, {encoding: encoding})
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro);
// }

pegaArquivo("./arquivos/texto.md");