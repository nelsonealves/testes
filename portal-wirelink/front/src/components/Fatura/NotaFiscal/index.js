import React from 'react';
import {
  Page, Text, View, Document, PDFViewer, Image,
} from '@react-pdf/renderer';
import prefeitura from '../../../assets/prefeitura.png';
import { styles } from './styles';
import formatData from '../../../utils/formatData';
import formatData2 from '../../../utils/formatData2';
import formatValue from '../../../utils/formatValue';

function NotaFiscal({ xmlNF }) {
  return (
    <PDFViewer
      width="100%"
      height={1000}
    >
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View style={styles.headerImgContent}>
              <Image style={styles.img} source={prefeitura} />
            </View>
            <View style={styles.headerContent}>
              <Text style={styles.textInfo}>
                PREFEITURA MUNICIPAL DE FORTALEZA
              </Text>
              <Text style={styles.textInfo}>
                SECRETARIA MUNICIPAL DAS FINANÇA
              </Text>
              <Text style={[styles.textInfo, { fontSize: 11 }]}>
                NOTA FISCAL ELETRÔNICA DE SERVIÇO - NFS-e
              </Text>
            </View>
            <View style={styles.nf}>
              <View>
                <Text style={styles.textHeader}>Número </Text>
                <Text style={styles.textHeader}>da</Text>
                <Text style={styles.textHeader}>NFS-e</Text>
              </View>
              <Text style={styles.textHeader}>
                {xmlNF.getElementsByTagName('Numero')[0].value}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                Data e hora da Emissão
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {formatData(xmlNF.getElementsByTagName('DataEmissao')[0].value.split('T')[0])}
                {xmlNF.getElementsByTagName('DataEmissao')[0].value.substring(11, 19)}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Competência
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {formatData2(xmlNF.getElementsByTagName('Competencia')[0].value)}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Código de Verificação
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {(xmlNF.getElementsByTagName('CodigoVerificacao')[0].value)}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                Número do RPS
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                No. da NFS-e substituída
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Local da Prestação
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
          </View>
          <View style={styles.section1}>
            <Text style={styles.s1Title}>Dados do Prestador de Serviços</Text>
          </View>
          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Razão Social/Nome
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[1].value || ''}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Nome Fantasia
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[2].value || ''}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 50 }]}>
              <Text style={styles.text}>
                CNPJ/CPF
              </Text>
            </View>
            <View style={[styles.itemContentHeader]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0]
                  .children[0].children[0].value}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Inscrição Municipal
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 50 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[0].children[1].value}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Município
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[3].children[3].value}
                { ' - ' }
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[3].children[5].value}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Endereço e Cep
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0]
                  .children[3].children[0].value}
                { ', ' }
                {xmlNF.getElementsByTagName('PrestadorServico')[0]
                  .children[3].children[1].value}
                { ', ' }
                {xmlNF.getElementsByTagName('PrestadorServico')[0]
                  .children[3].children[2].value}
                { ' CEP: ' }
                {xmlNF.getElementsByTagName('PrestadorServico')[0]
                  .children[3].children[5].value}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 60 }]}>
              <Text style={styles.text}>
                Complemento
              </Text>
            </View>
            <View style={[styles.itemContentHeader]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 50 }]}>
              <Text style={styles.text}>
                Telefone
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 60 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[4].children[0].value || ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 50 }]}>
              <Text style={styles.text}>
                Email
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[4].children[1].value || ' ' }
              </Text>
            </View>
          </View>

          <View style={styles.section1}>
            <Text style={styles.s1Title}>Dados do Tomador de Serviços</Text>
          </View>
          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                Razão Social/Nome
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('TomadorServico')[0].children[0].children[0].children[0].value || ''}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, width: 50 }]}>
              <Text style={styles.text}>
                CNPJ/CPF
              </Text>
            </View>
            <View style={[styles.itemContentHeader]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('TomadorServico')[0]
                  .children[0].children[0].value}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Inscrição Municipal
              </Text>
            </View>
            <View style={[styles.itemContentHeader]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[0].children[1].value}
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Município
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[3].children[3].value}
                { ' - ' }
                {xmlNF.getElementsByTagName('PrestadorServico')[0].children[3].children[5].value}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                Endereço e Cep
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('TomadorServico')[0].children[2].children[0].value}
                { ', ' }
                {xmlNF.getElementsByTagName('TomadorServico')[0].children[2].children[1].value}
                { ', ' }
                {xmlNF.getElementsByTagName('TomadorServico')[0].children[2].children[2].value}
                { ' CEP: ' }
                {xmlNF.getElementsByTagName('TomadorServico')[0].children[2].children[3].value}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                Complemento
              </Text>
            </View>
            <View style={[styles.itemContentHeader]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Telefone
              </Text>
            </View>
            <View style={[styles.itemContentHeader]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                Email
              </Text>
            </View>
            <View style={styles.itemContentHeader}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
          </View>

          <View style={styles.section1}>
            <Text style={styles.s1Title}>Discriminação dos Serviços</Text>
          </View>
          <View style={[styles.contentHeader, { height: 160 }]}>
            <Text style={[styles.textInfo, { alignSelf: 'flex-start' }]}>
              {xmlNF.getElementsByTagName('Discriminacao')[0].value}
            </Text>
          </View>

          <View style={styles.section1}>
            <Text style={styles.s1Title}>Código de Atividade CNAE</Text>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0 }]}>
              <Text style={styles.text}>
                {xmlNF.getElementsByTagName('CodigoCnae')[0].value}
              </Text>
            </View>
          </View>

          <View style={[styles.section1]}>
            <Text style={styles.s1Title}>Detalhamento Específico da Construção Civil</Text>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, width: 90 }]}>
              <Text style={styles.text}>
                Código da Obra
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 90 }]}>
              <Text style={styles.text}>
                Código ART
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
          </View>

          <View style={styles.section1}>
            <Text style={styles.s1Title}>Tributos Federais</Text>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, width: 50 }]}>
              <Text style={styles.text}>
                PIS
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                COFINS
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                IR(R$)
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                INSS(R$)
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                CSLL(R$)
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { width: 55 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
          </View>

          <View style={[styles.section2]}>
            <Text style={[styles.s2Title, { justifyContent: 'flex-end', flex: 1 }]}>Detalhamento de Valores - Prestador dos Serviços</Text>
            <Text style={styles.s2Title}>Cálculo do ISSQN devido no Município</Text>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, flex: 1 }]}>
              <Text style={styles.text}>
                Valor dos Serviços R$
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {formatValue(xmlNF.getElementsByTagName('ValorLiquidoNfse')[0].value)}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                Natureza Operação
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                Valor dos Serviços R$
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {formatValue(xmlNF.getElementsByTagName('ValorLiquidoNfse')[0].value)}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, flex: 1, height: 40 }]}>
              <Text style={styles.text}>
                (-) Desconto Incondicionado
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1, height: 40 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1, height: 40 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1, height: 40 }]}>
              <Text style={styles.text}>
                (-) Deduções permitidas em lei
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1, height: 40 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, flex: 1 }]}>
              <Text style={styles.text}>
                (-) Desconto Condicionado
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                (-) Desconto Incondicionado
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, flex: 1 }]}>
              <Text style={styles.text}>
                (-) Retenções Federais
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                Base de Cálculo
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {formatValue(xmlNF.getElementsByTagName('BaseCalculo')[0].value)}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, flex: 1 }]}>
              <Text style={styles.text}>
                Outras Retenções
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                { ' ' }
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                (x) Alíquota %
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {formatValue(xmlNF.getElementsByTagName('Aliquota')[0].value)}
              </Text>
            </View>
          </View>

          <View style={styles.contentHeader}>
            <View style={[styles.itemContentHeader, { borderLeftWidth: 0, flex: 1 }]}>
              <Text style={styles.text}>
                (-) ISS Retido
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {formatValue(xmlNF.getElementsByTagName('IssRetido')[0].value)}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                ISS a reter
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1 }]}>
              <Text style={styles.text}>
                {' '}
              </Text>
            </View>
          </View>

          <View style={[styles.contentHeader, { height: 60 }]}>
            <View
              style={[styles.itemContentHeader, {
                borderLeftWidth: 0,
                flex: 1,
                justifyContent: 'center',
              }]}
            >
              <Text style={styles.text}>
                (=) Valor Líquido R$
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1, justifyContent: 'center' }]}>
              <Text style={styles.text}>
                {formatValue(xmlNF.getElementsByTagName('ValorLiquidoNfse')[0].value)}
              </Text>
            </View>
            <View
              style={[styles.itemContentHeader,
                {
                  flex: 1,
                  justifyContent: 'center',
                },
              ]}
            >
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text style={[styles.text, {
                  width: '100%',
                }]}
                >
                  Incentivador Cultural
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text style={[styles.text, {
                  borderTopWidth: 1,
                  width: '100%',
                }]}
                >
                  {' '}
                </Text>
              </View>
            </View>

            <View style={[styles.itemContentHeader, { flex: 1, justifyContent: 'center' }]}>
              <Text style={styles.text}>
                (=) Valor do ISS: R$
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1, justifyContent: 'center' }]}>
              <Text style={styles.text}>
                {formatValue(xmlNF.getElementsByTagName('ValorIss')[0].value)}
              </Text>
            </View>
          </View>

          <View style={[styles.contentHeader]}>
            <View
              style={[styles.itemContentHeader, {
                borderLeftWidth: 0,
                justifyContent: 'center',
                height: 60,
                width: 108.7,
              }]}
            >
              <Text style={styles.text}>
                Avisos
              </Text>
            </View>
            <View style={[styles.itemContentHeader, { flex: 1, justifyContent: 'center' }]}>
              <Text style={[styles.text, { fontSize: 7 }]}>
                1- Uma via desta Nota Fiscal será enviada através do e-mail fornecido pelo Tomador dos Serviços, no sítio http://iss.fortaleza.ce.gov.br
              </Text>
              <Text style={[styles.text, { fontSize: 7, marginTop: 8 }]}>
                2- A autenticidade desta Nota Fiscal poderá ser validada no site http://iss.fortaleza.ce.gov.br/, com a utilização do Código de Verificação.
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default NotaFiscal;
