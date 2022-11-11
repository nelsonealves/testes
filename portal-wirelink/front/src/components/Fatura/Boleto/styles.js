import { StyleSheet } from '@react-pdf/renderer';

export const stylesB = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30,
  },
  textBlack: {
    fontSize: 10,
  },
  contentInstruction: {
    marginVertical: 20,
    alignItems: 'flex-start',
    width: 500,
  },
  text7: {
    fontSize: 7,
  },
  text8: {
    fontSize: 8,
    padding: 1,
  },
  text9: {
    fontSize: 9,
    marginTop: 2,
  },
  text10: {
    fontSize: 10,
  },
  line: {
    borderBottomStyle: 'dotted',
    borderBottomWidth: 1,
  },
  border: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  imgLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  header: {
    width: 500,
    marginHorizontal: 'auto',
    flexDirection: 'row',
  },
  headerImgContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
    marginBottom: 1,
  },
  img: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  imgItau: {
    width: 78,
    height: 24,
    resizeMode: 'contain',
  },
  headerLabelContent: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  headerContent: {
    textAlign: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  nf: {
    justifyContent: 'center',
    textAlign: 'right',
    alignItems: 'flex-end',
    flex: 1,
  },
  section1: {
    flexDirection: 'column',
    borderColor: '#000',
    borderWidth: 1,
    width: 500,
  },
  s1Title: {
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    borderColor: '#000',
    borderWidth: 1,
    width: 550,
  },
  s1LabelContent: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderBottomWidth: 2,
    margin: 0,
    paddingLeft: 5,
  },
  s1Content: {
    width: 449,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderBottomWidth: 2,
    margin: 0,
    paddingLeft: 5,
  },
  section2: {
    flexDirection: 'column',
    borderColor: '#000',
    borderWidth: 1,
    width: 550,
  },
  s2Title: {
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    borderColor: '#000',
    borderWidth: 1,
    width: 550,
  },
  colunaP: {
    flexDirection: 'column',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    width: 75,
  },
  colunaG: {
    flexDirection: 'column',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    width: 399,
  },
  text: {
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  textInfo: {
    fontSize: 11,
    alignSelf: 'flex-start',
  },
});
