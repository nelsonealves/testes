import React from 'react';
import {
  Page, Text, View, Document, PDFViewer, Image,
} from '@react-pdf/renderer';
import formatData from '../../../utils/formatData';
import formatValue from '../../../utils/formatValue';
import logo from '../../../assets/logo/Logo.png';
import logoItau from '../../../assets/Logo-Itau.png';
import logoBradesco from '../../../assets/Logo-Bradesco.png';
import { stylesB } from './styles';

function Boleto({ selectedB }) {
  return (
    <PDFViewer
      width="100%"
      height={1000}
    >
      <Document>
        <Page size="A4" style={stylesB.page}>
          <View>
            <Text style={stylesB.textBlack}>
              Instruções de Impressão
            </Text>
          </View>
          <View style={stylesB.contentInstruction}>
            <View>
              <Text style={stylesB.text8}>
                - Imprima em impressora jato de tinta (ink jet) ou laser em qualidade
                normal ou alta (Não use modo econômico).
              </Text>
              <Text style={stylesB.text8}>
                - Utilize folha A4 (210 x 297 mm) ou Carta (216 x 279 mm) e
                margens mínimas à esquerda e à direita do formulário.
              </Text>
              <Text style={stylesB.text8}>
                - Corte na linha indicada. Não rasure, risque, fure ou dobre a
                região onde se encontra o código de barras.
              </Text>
              <Text style={stylesB.text8}>
                - Caso não apareça o código de barras no final, clique em F5 para
                atualizar esta tela.
              </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <Text style={[stylesB.text10, { width: 80 }]}>
                Linha Digitável:
              </Text>
              <Text style={stylesB.text10}>
                {selectedB.codigo_barras}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[stylesB.text10, { width: 80 }]}>
                Número:
              </Text>
              <Text style={stylesB.text10}>
                {' '}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[stylesB.text10, { width: 80 }]}>
                Valor:
              </Text>
              <Text style={stylesB.text10}>
                {`R$ ${formatValue(selectedB.valor)}`}
              </Text>
            </View>
          </View>

          <View style={stylesB.line}>
            <Text style={[stylesB.text8, { textAlign: 'right', width: 500 }]}>
              Recibo do Pagador
            </Text>
          </View>

          <View style={[stylesB.contentInstruction, { flexDirection: 'row' }]}>
            <View style={{ marginRight: 80 }}>
              <Image
                src={logo}
                style={stylesB.imgLogo}
              />
            </View>
            <View>
              <Text style={[stylesB.text8, { width: 500 }]}>
                {selectedB.cedente || ''}
              </Text>
              <Text style={[stylesB.text8, { width: 500 }]}>
                {selectedB.cnpj_cedente || ''}
              </Text>
              <Text style={[stylesB.text8, { width: 500 }]}>
                Av. Santos Dumont, 2626
              </Text>
              <Text style={[stylesB.text8, { width: 500 }]}>
                60150-161 - Fortaleza - CE
              </Text>
            </View>
          </View>

          <View style={stylesB.header}>
            <View style={stylesB.headerImgContent}>
              {
                selectedB.nome_banco.includes('ITAU')
                  ? <Image style={stylesB.imgItau} src={logoItau} />
                  : selectedB.nome_banco.includes('BRADESCO')
                    ? <Image style={stylesB.imgItau} src={logoBradesco} />
                    : selectedB.nome_banco.includes('SANTANDER')
                      ? <Image style={stylesB.img} src="https://logospng.org/download/santander/logo-santander-icon-1024.png" />
                      : (
                        <Image
                          style={stylesB.img}
                          src="https://kontaazul.com.br/wp-content/uploads/2020/04/como-consultar-saldo-na-caixa-economica.png"
                        />
                      )
              }
            </View>
            <View style={stylesB.headerLabelContent}>
              <Text style={stylesB.text}>{selectedB.numero_banco}</Text>
            </View>
            <View style={stylesB.nf}>
              <Text style={stylesB.text}>
                {selectedB.codigo_barras}
                {/* formatData(selectedB.emissao.split(' ')[0]) */}
              </Text>
            </View>
          </View>

          <View style={stylesB.section1}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 200, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Beneficiário</Text>
                <Text style={stylesB.text9}>
                  {selectedB.cedente || ''}
                </Text>
              </View>
              <View style={[stylesB.border, { width: 120, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Agência/Código do beneficiário</Text>
                <Text style={stylesB.text9}>
                  {selectedB.agencia_conta || ''}
                </Text>
              </View>
              <View style={{ width: 39, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Espécie</Text>
                <Text style={stylesB.text9}>
                  R$
                </Text>
              </View>
              <View style={[stylesB.border, { width: 52, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Quantidade</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={[stylesB.text7, { width: 85 }]}>
                <Text style={[stylesB.text7, { paddingLeft: 2 }]}>Nosso Número</Text>
                <Text style={[stylesB.text9, { textAlign: 'right' }]}>
                  {selectedB.nosso_numero || ''}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={{ width: 140, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Número do Documento </Text>
                <Text style={stylesB.text9}>
                  {selectedB.numero_titulo || ''}
                </Text>
              </View>
              <View style={[{ width: 120, paddingLeft: 2, borderLeftWidth: 1 }]}>
                <Text style={stylesB.text7}>CPF/CNPJ</Text>
                <Text style={stylesB.text9}>
                  {selectedB.cnpj_cedente || ''}
                </Text>
              </View>
              <View style={[stylesB.border, { width: 100, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Vencimento</Text>
                <Text style={stylesB.text9}>
                  {selectedB.data_vencimento.split(' ')[0]}
                </Text>
              </View>
              <View style={[{ flex: 1, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Valor do Documento</Text>
                <Text style={[stylesB.text9, { textAlign: 'right' }]}>
                  {formatValue(selectedB.valor)}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={{ width: 90, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>(-) Descontos/Abatimentos</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={[stylesB.border, { width: 90, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>(-) Outras Deduções</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={[{ width: 90, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>(+) Mora Multa</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={[stylesB.border, { width: 90, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>(+) Acréscimos</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={[{ flex: 1, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Valor Cobrado</Text>
                <Text style={[stylesB.text9, { textAlign: 'right' }]}>
                  {formatValue(selectedB.valor)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={{ flex: 1, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Pagador</Text>
                <Text style={stylesB.text9}>
                  {selectedB.sacado || ''}
                  {' / CNPJ:  '}
                  {selectedB.cnpj_sacado || ''}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 486 }}>
            <Text style={stylesB.text7}>Demonstrativo</Text>
            <Text style={stylesB.text7}>Autenticação mecânica</Text>
          </View>

          <View style={[stylesB.line, { marginTop: 60 }]}>
            <Text style={[stylesB.text8, { textAlign: 'right', width: 500 }]}>
              Corte na linha pontilhada
            </Text>
          </View>

          <View style={[stylesB.header, { marginTop: 20 }]}>
            <View style={stylesB.headerImgContent}>
              {
                selectedB.nome_banco.includes('ITAU')
                  ? <Image style={stylesB.imgItau} src={logoItau} />
                  : selectedB.nome_banco.includes('BRADESCO')
                    ? <Image style={stylesB.imgItau} src={logoBradesco} />
                    : selectedB.nome_banco.includes('SANTANDER')
                      ? <Image style={stylesB.img} src="https://logospng.org/download/santander/logo-santander-icon-1024.png" />
                      : (
                        <Image
                          style={stylesB.img}
                          src="https://kontaazul.com.br/wp-content/uploads/2020/04/como-consultar-saldo-na-caixa-economica.png"
                        />
                      )
              }
            </View>
            <View style={stylesB.headerLabelContent}>
              <Text style={stylesB.text}>{selectedB.numero_banco}</Text>
            </View>
            <View style={stylesB.nf}>
              <Text style={stylesB.text}>
                {selectedB.codigo_barras}
                {/* formatData(selectedB.emissao.split(' ')[0]) */}
              </Text>
            </View>
          </View>

          <View style={stylesB.section1}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Local de pagamento</Text>
                <Text style={stylesB.text9}>
                  {
                    selectedB.nome_banco.includes('ITAU')
                      ? 'Até o vencimento, preferencialmente no Itaú'
                      : 'Pagável em qualquer agência bancária até o vencimento.'
                  }
                </Text>
              </View>
              <View style={[{ width: 160, borderLeftWidth: 1 }]}>
                <Text style={[stylesB.text7, { paddingLeft: 2 }]}>Vencimento</Text>
                <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                  {selectedB.data_vencimento.split(' ')[0]}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={{ flex: 1, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Beneficiário</Text>
                <Text style={stylesB.text9}>
                  {selectedB.cedente}
                  {' / CNPJ: '}
                  {selectedB.cnpj_cedente}
                </Text>
              </View>
              <View style={[{ width: 160, borderLeftWidth: 1 }]}>
                <Text style={[stylesB.text7, { paddingLeft: 2 }]}>Agência/Código beneficiário</Text>
                <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                  {selectedB.agencia_conta}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={{ width: 80, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Data do documento</Text>
                <Text style={stylesB.text9}>
                  {formatData(selectedB.emissao.split(' ')[0])}
                </Text>
              </View>
              <View style={[stylesB.border, { width: 100, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Número do documento</Text>
                <Text style={stylesB.text9}>
                  {selectedB.numero_titulo}
                </Text>
              </View>
              <View style={{ width: 50, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Espécie Doc.</Text>
                <Text style={stylesB.text9}>
                  {selectedB.especie}
                </Text>
              </View>
              <View style={[stylesB.border, { width: 30, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Aceite</Text>
                <Text style={stylesB.text9}>
                  {selectedB.aceite}
                </Text>
              </View>
              <View style={{ width: 78, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Data processamento</Text>
                <Text style={stylesB.text9}>
                  {formatData(selectedB.emissao.split(' ')[0])}
                </Text>
              </View>
              <View style={[{ width: 160, borderLeftWidth: 1 }]}>
                <Text style={[stylesB.text7, { paddingLeft: 2 }]}>Nosso número</Text>
                <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                  {selectedB.nosso_numero}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={{ width: 80, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Uso do Banco</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={[stylesB.border, { width: 70, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Carteira</Text>
                <Text style={stylesB.text9}>
                  {selectedB.carteira}
                </Text>
              </View>
              <View style={{ width: 30, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Espécie</Text>
                <Text style={stylesB.text9}>
                  R$
                </Text>
              </View>
              <View style={[stylesB.border, { width: 80, paddingLeft: 2 }]}>
                <Text style={stylesB.text7}>Quantidade</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={{ width: 78, paddingLeft: 2 }}>
                <Text style={stylesB.text7}>Valor Documento</Text>
                <Text style={stylesB.text9}>
                  {' '}
                </Text>
              </View>
              <View style={[{ width: 160, borderLeftWidth: 1 }]}>
                <Text style={[stylesB.text7, { paddingLeft: 2 }]}>Valor Documento</Text>
                <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                  {formatValue(selectedB.valor)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={[{ flex: 1, height: 100, paddingLeft: 2 }]}>
                <Text style={[stylesB.text7]}>
                  Instruções de responsabilidade do beneficiário.
                  Qualquer dúvida sobre este boleto, contate o beneficiário
                </Text>
                <Text style={[stylesB.text9]}>
                  Multa de 2% e juros de 0,033% ao dia após o vencimento.
                </Text>
              </View>
              <View style={[{ width: 160, borderLeftWidth: 1 }]}>
                <View style={{ }}>
                  <Text style={[stylesB.text7, { paddingLeft: 2 }]}>
                    (-) Desconto / Abatimentos)
                  </Text>
                  <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                    {' '}
                  </Text>
                </View>
                <View style={[{ borderTopWidth: 1 }]}>
                  <Text style={[stylesB.text7, { paddingLeft: 2 }]}>
                    (-) Outras deduções
                  </Text>
                  <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                    {' '}
                  </Text>
                </View>
                <View style={[{ borderTopWidth: 1 }]}>
                  <Text style={[stylesB.text7, { paddingLeft: 2 }]}>/ Juros</Text>
                  <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                    {' '}
                  </Text>
                </View>
                <View style={[{ borderTopWidth: 1 }]}>
                  <Text style={[stylesB.text7, { paddingLeft: 2 }]}>(+) Outros acréscimos</Text>
                  <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                    {' '}
                  </Text>
                </View>
                <View style={{ borderTopWidth: 1 }}>
                  <Text style={[stylesB.text7, { paddingLeft: 2 }]}>(=) Valor cobrado</Text>
                  <Text style={[stylesB.text9, { textAlign: 'right', paddingRight: 2 }]}>
                    {' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <View style={{ flex: 1, paddingLeft: 2, marginBottom: 10 }}>
                <Text style={stylesB.text7}>Pagador</Text>
                <Text style={stylesB.text9}>
                  {selectedB.sacado || ''}
                  {' / CNPJ:  '}
                  {selectedB.cnpj_sacado || ''}
                </Text>
                <Text style={stylesB.text9}>
                  {selectedB.endereco || ''}
                  {', '}
                  {selectedB.numero || ''}
                  {' - '}
                  {selectedB.bairro || ''}
                </Text>
                <Text style={stylesB.text9}>
                  {selectedB.cep || ''}
                  {' - '}
                  {selectedB.cidade || ''}
                  {' - '}
                  {selectedB.uf || ''}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 486 }}>
            <Text style={stylesB.text7}>Sacador/Avalista</Text>
            <Text style={stylesB.text7}>Autenticação mecânica - Ficha de Compensação</Text>
          </View>

          <View style={{
            marginTop: 30,
            flexDirection: 'row',
          }}
          >
            <Image
              style={{ width: 300, textAlign: 'left' }}
              src={`http://bwipjs-api.metafloor.com/?bcid=code128&text=${selectedB.codigo_barras}`}
            />
            <Text style={{ width: 200 }}>
              {' '}
            </Text>
          </View>

        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Boleto;
