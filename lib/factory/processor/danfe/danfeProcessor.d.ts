import { TNfeProc } from "../../schema";
/**
 * Classe para processamento do DANFE em PDF
 */
export declare class DanfeProcessor {
    constructor();
    xmlStringToPdf(xml: string): Promise<string>;
    renderHtml(data: any): string;
    getTemplateData(nfeProc: TNfeProc): {
        operacao: import("../../schema").TNFeInfNFeIdeTpNF;
        natureza: string;
        numero: string;
        serie: string;
        chave: string;
        codigo_barras: string;
        protocolo: string;
        data_protocolo: string;
        emitente: {
            inscricao_nacional: string;
            ie: string;
            ie_st: string;
            nome: string;
            fantasia: string;
            endereco: string;
            numero: string;
            complemento: string;
            bairro: string;
            municipio: string;
            uf: import("../../schema").TUfEmi;
            cep: string;
            telefone: string;
        };
        destinatario: {
            inscricao_nacional: string;
            ie: string;
            nome: string;
            endereco: string;
            numero: string;
            complemento: string;
            bairro: string;
            municipio: string;
            uf: import("../../schema").TUf;
            cep: string;
            telefone: string;
        };
        data_emissao: string;
        data_saida: string;
        base_calculo_icms: string;
        imposto_icms: string;
        base_calculo_icms_st: string;
        imposto_icms_st: string;
        imposto_tributos: string;
        total_produtos: string;
        total_frete: string;
        total_seguro: string;
        total_desconto: string;
        total_despesas: string;
        total_ipi: string;
        total_nota: string;
        transportador: {
            nome: string;
            inscricao_nacional: string;
            endereco: string;
            municipio: string;
            uf: import("../../schema").TUf;
            ie: string;
        } | null;
        volume: {
            quantidade: string;
            especie: string;
            marca: string;
            numeracao: string;
            pesoBruto: string;
            pesoLiquido: string;
        } | null;
        modalidade_frete: import("../../schema").TNFeInfNFeTranspModFrete;
        itens: {
            codigo: string;
            descricao: string;
            ncm: string;
            cst: any;
            cfop: string;
            unidade: string;
            quantidade: string;
            valor: string;
            total: string;
            base_calculo: any;
            icms: any;
            porcentagem_icms: any;
            ipi: any;
            porcentagem_ipi: any;
        }[];
    };
    getEmitente(nfeProc: TNfeProc): {
        inscricao_nacional: string;
        ie: string;
        ie_st: string;
        nome: string;
        fantasia: string;
        endereco: string;
        numero: string;
        complemento: string;
        bairro: string;
        municipio: string;
        uf: import("../../schema").TUfEmi;
        cep: string;
        telefone: string;
    };
    getDestinatario(nfeProc: TNfeProc): {
        inscricao_nacional: string;
        ie: string;
        nome: string;
        endereco: string;
        numero: string;
        complemento: string;
        bairro: string;
        municipio: string;
        uf: import("../../schema").TUf;
        cep: string;
        telefone: string;
    };
    getTransportador(nfeProc: TNfeProc): {
        nome: string;
        inscricao_nacional: string;
        endereco: string;
        municipio: string;
        uf: import("../../schema").TUf;
        ie: string;
    } | null;
    getVolume(nfeProc: TNfeProc): {
        quantidade: string;
        especie: string;
        marca: string;
        numeracao: string;
        pesoBruto: string;
        pesoLiquido: string;
    } | null;
    getItens(nfeProc: TNfeProc): {
        codigo: string;
        descricao: string;
        ncm: string;
        cst: any;
        cfop: string;
        unidade: string;
        quantidade: string;
        valor: string;
        total: string;
        base_calculo: any;
        icms: any;
        porcentagem_icms: any;
        ipi: any;
        porcentagem_ipi: any;
    }[];
    getValueByTag(theObject: any, tag: string): any;
}
