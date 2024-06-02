import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  detailsInput: {
    fontSize: 17,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginVertical: 10,
    maxHeight: 250,
  },
  btnGrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: Colors.violet,
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
    width: '48%',
  },
  btnFont: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'bold',
  },
  noteView: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 8,
  },
  noteViewTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.violet,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  noteViewDetails: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 30,
  },
  titleCount: {
    textAlign: 'right',
    color: Colors.gray,
  },
  maxCount: {
    textAlign: 'right',
    color: Colors.error,
  },
});

export default styles;
