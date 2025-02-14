export declare function mascaraCPF(valor: string): string;
/**
 * Retorna <valor> especificado com máscara do CNPJ.
 *
 * @param      {string}  valor
 * @return     {string}
 */
export declare function mascaraCNPJ(valor: string): string;
/**
 * Retorna <numero> especificado formatado de acordo com seu tipo (cpf ou cnpj).
 *
 * @param      {string}  numero
 * @return     {string}
 */
export declare function formataInscricaoNacional(numero: string): string;
/**
 * Formata data de acordo com <dt> esoecificado.
 * <dt> é no formato UTC, YYYY-MM-DDThh:mm:ssTZD (https://www.w3.org/TR/NOTE-datetime)
 *
 * @param      {string}  dt 2022-11-03T16:20:52-03:00
 * @return     {string}
 */
export declare function formataData(dt: string): string;
export declare function formataHora(dt: string): string;
/**
 * Retorna o valor formatado em moeda de acordo com  <numero>  e <decimais> especificados.
 *
 * @param      {number}   numero
 * @param      {number}  decimais
 * @return     {string}
 */
export declare function formataMoeda(numero: any, decimais: number): string;
/**
 * Retorna a <cahve> da NFE formata.
 * Formatação: grupos de 4 números separados por espaço.
 * @param      {string}  chave
 * @return     {string}
 */
export declare function formataChave(chave: string): string;
