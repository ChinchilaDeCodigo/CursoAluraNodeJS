import chalk from "chalk";

function extraiLinks(arrLinks){
   return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs){
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status;
            }catch(erro){
                return trataErros(erro);
            }
        })
    );
    return arrStatus;
}

function trataErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado';    
    }else{
        return 'Ocorreu um erro';
    }
}

export default async function listaValidada(lista){
    const links = extraiLinks(lista);
    const status = await checaStatus(links);
    return lista.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}


//[Teste de retorno 400](https://httpstat.us/404).
//[gatinho salsicha](http://gatinhosalsicha.com.br/)