"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanfeProcessor = void 0;
const formata_1 = require("./formata");
const xmlHelper_1 = require("../../xmlHelper");
const handlebars = require("handlebars");
const fs = require("fs");
const TEMPLATE_DANFE = __dirname + '/danfe-template.hbs';
/**
 * Classe para processamento do DANFE em PDF
 */
class DanfeProcessor {
    constructor() { }
    async xmlStringToPdf(xml) {
        const xmlAsJson = xmlHelper_1.XmlHelper.deserializeXml(xml);
        const nfeProc = xmlAsJson.nfeProc;
        const templateData = this.getTemplateData(nfeProc);
        const html = this.renderHtml(templateData);
        return html;
    }
    renderHtml(data) {
        handlebars.registerHelper('ifCond', function (v1, v2, options) {
            if (v1.length > v2) {
                return options.fn();
            }
            return options.inverse();
        });
        const template = fs.readFileSync(TEMPLATE_DANFE, 'utf8');
        return handlebars.compile(template)(data);
    }
    getTemplateData(nfeProc) {
        const ide = nfeProc.NFe.infNFe.ide;
        const transp = nfeProc.NFe.infNFe.transp;
        const ICMSTot = nfeProc.NFe.infNFe.total.ICMSTot;
        const infProt = nfeProc.protNFe.infProt;
        var data = {
            operacao: ide.tpNF,
            natureza: ide.natOp,
            numero: ide.nNF,
            serie: ide.serie,
            chave: (0, formata_1.formataChave)(infProt.chNFe),
            codigo_barras: infProt.chNFe,
            protocolo: infProt.nProt,
            data_protocolo: (0, formata_1.formataData)(infProt.dhRecbto) + ' ' + (0, formata_1.formataHora)(infProt.dhRecbto),
            emitente: this.getEmitente(nfeProc),
            destinatario: this.getDestinatario(nfeProc),
            data_emissao: (0, formata_1.formataData)(ide.dhEmi),
            data_saida: (0, formata_1.formataData)(ide.dhSaiEnt),
            base_calculo_icms: (0, formata_1.formataMoeda)(ICMSTot.vBC, 2),
            imposto_icms: (0, formata_1.formataMoeda)(ICMSTot.vICMS, 2),
            base_calculo_icms_st: (0, formata_1.formataMoeda)(ICMSTot.vBCST, 2),
            imposto_icms_st: (0, formata_1.formataMoeda)(ICMSTot.vST, 2),
            imposto_tributos: (0, formata_1.formataMoeda)(ICMSTot.vTotTrib, 2),
            total_produtos: (0, formata_1.formataMoeda)(ICMSTot.vProd, 2),
            total_frete: (0, formata_1.formataMoeda)(ICMSTot.vFrete, 2),
            total_seguro: (0, formata_1.formataMoeda)(ICMSTot.vSeg, 2),
            total_desconto: (0, formata_1.formataMoeda)(ICMSTot.vDesc, 2),
            total_despesas: (0, formata_1.formataMoeda)(ICMSTot.vOutro, 2),
            total_ipi: (0, formata_1.formataMoeda)(ICMSTot.vIPI, 2),
            total_nota: (0, formata_1.formataMoeda)(ICMSTot.vNF, 2),
            transportador: this.getTransportador(nfeProc),
            volume: this.getVolume(nfeProc),
            // informacoes_fisco: nfe.informacoesFisco(),
            // informacoes_complementares: nfe.informacoesComplementares(),
            // observacao: observacoes(nfe),
            modalidade_frete: transp.modFrete,
            // modalidade_frete_texto: nfe.modalidadeFreteTexto(),
            itens: this.getItens(nfeProc),
            // duplicatas: duplicatas(nfe),
            // valor_ii: formataMoeda(nfe.valorII(), 2),
            // valor_pis: formataMoeda(nfe.valorPIS(), 2),
            // valor_cofins: formataMoeda(nfe.valorCOFINS(), 2),
            // valor_combate_pobreza: formataMoeda(nfe.valorCombatePobreza(), 2),
            // valor_icms_uf_remetente: formataMoeda(nfe.valorIcmsUfRemetente(), 2),
            // valor_icms_uf_destinatario: formataMoeda(nfe.valorIcmsUfDestinatario(), 2)
        };
        // if (nfe.transporte().veiculo()) {
        //   data.veiculo_placa = nfe.transporte().veiculo().placa()
        //   data.veiculo_placa_uf = nfe.transporte().veiculo().uf()
        //   data.veiculo_antt = nfe.transporte().veiculo().antt()
        // }
        // if (nfe.servico()) {
        //   data.total_servico = formataMoeda(nfe.servico().valorTotalServicoNaoIncidente())
        //   data.total_issqn = formataMoeda(nfe.servico().valorTotalISS())
        //   data.base_calculo_issqn = formataMoeda(nfe.servico().baseCalculo())
        // }
        return data;
    }
    getEmitente(nfeProc) {
        const emit = nfeProc.NFe.infNFe.emit;
        return {
            inscricao_nacional: (0, formata_1.formataInscricaoNacional)(emit.CNPJ),
            ie: emit.IE,
            ie_st: emit.iEST,
            nome: emit.xNome,
            fantasia: emit.xFant,
            endereco: emit.enderEmit.xLgr,
            numero: emit.enderEmit.nro,
            complemento: emit.enderEmit.xCpl,
            bairro: emit.enderEmit.xBairro,
            municipio: emit.enderEmit.xMun,
            uf: emit.enderEmit.UF,
            cep: emit.enderEmit.CEP,
            telefone: emit.enderEmit.fone,
        };
    }
    getDestinatario(nfeProc) {
        const dest = nfeProc.NFe.infNFe.dest;
        return {
            inscricao_nacional: (0, formata_1.formataInscricaoNacional)(dest.CPF || dest.CNPJ),
            ie: dest.IE,
            nome: dest.xNome,
            endereco: dest.enderDest.xLgr,
            numero: dest.enderDest.nro,
            complemento: dest.enderDest.xCpl,
            bairro: dest.enderDest.xBairro,
            municipio: dest.enderDest.xMun,
            uf: dest.enderDest.UF,
            cep: dest.enderDest.CEP,
            telefone: dest.enderDest.fone,
        };
    }
    getTransportador(nfeProc) {
        const transporta = nfeProc.NFe.infNFe.transp.transporta;
        return transporta ? {
            nome: transporta.xNome,
            inscricao_nacional: transporta.CNPJ,
            endereco: transporta.xEnder,
            municipio: transporta.xMun,
            uf: transporta.UF,
            ie: transporta.IE,
        } : null;
    }
    getVolume(nfeProc) {
        const vol = nfeProc.NFe.infNFe.transp.vol;
        const vol0 = vol && vol.length > 0 ? vol[0] : null;
        return vol0 ? {
            quantidade: vol0.qVol,
            especie: vol0.esp,
            marca: vol0.marca,
            numeracao: vol0.nVol,
            pesoBruto: vol0.pesoB,
            pesoLiquido: vol0.pesoL,
        } : null;
    }
    getItens(nfeProc) {
        return nfeProc.NFe.infNFe.det.map(i => ({
            codigo: i.prod.cProd,
            descricao: i.prod.xProd,
            ncm: i.prod.NCM,
            cst: this.getValueByTag(i.imposto.ICMS, 'CSOSN') ||
                this.getValueByTag(i.imposto.ICMS, 'CST'),
            cfop: i.prod.CFOP,
            unidade: i.prod.vUnCom,
            quantidade: i.prod.qCom,
            valor: i.prod.vUnCom,
            total: i.prod.vProd,
            base_calculo: this.getValueByTag(i.imposto.ICMS, 'vBC'),
            icms: this.getValueByTag(i.imposto.ICMS, 'vICMS'),
            porcentagem_icms: this.getValueByTag(i.imposto.ICMS, 'pICMS'),
            ipi: this.getValueByTag(i.imposto.IPI, 'vIPI'),
            porcentagem_ipi: this.getValueByTag(i.imposto.IPI, 'pIPI')
        }));
    }
    getValueByTag(theObject, tag) {
        if (theObject instanceof Array) {
            for (var i = 0; i < theObject.length; i++) {
                const result = this.getValueByTag(theObject[i], tag);
                if (result) {
                    return result;
                }
            }
        }
        else if (theObject instanceof Object) {
            for (var prop in theObject) {
                const value = theObject[prop];
                if (value instanceof Object || value instanceof Array) {
                    const result = this.getValueByTag(value, tag);
                    if (result) {
                        return result;
                    }
                }
                else if (prop === tag) {
                    return value;
                }
            }
        }
    }
}
exports.DanfeProcessor = DanfeProcessor;
