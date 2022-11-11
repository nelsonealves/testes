import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 24,
  },
  header: {
    width: 550,
    height: 80,
    flexDirection: 'row',
    marginLeft: 0,
    marginBottom: 1,
  },
  headerImgContent: {
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    margin: 0,
  },
  img: {
    width: 174,
    resizeMode: 'cover',
  },
  headerLabelContent: {
    width: 94,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    margin: 0,
    paddingLeft: 5,
  },
  headerContent: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    margin: 0,
  },
  nf: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: '#000',
    borderWidth: 1,
    width: 40,
  },
  textHeader: {
    fontSize: 8,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  contentHeader: {
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 1,
    width: 550,
    marginBottom: 1,
    padding: 0,
  },
  itemContentHeader: {
    width: 90,
    borderLeftColor: '#000',
    borderLeftWidth: 1,
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
  section1: {
    flexDirection: 'column',
    borderColor: '#000',
    borderWidth: 1,
    width: 550,
    marginBottom: 1,
  },
  s1Title: {
    fontSize: 11,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 1,
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
  s2Title: {
    fontSize: 11,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 1,
    flex: 1,
    marginBottom: 1,
  },
  section2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#000',
    borderWidth: 1,
    width: 550,
  },
  text: {
    fontSize: 8,
    alignSelf: 'flex-start',
  },
  textInfo: {
    fontSize: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    padding: 8,
  },

});