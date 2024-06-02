import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
  flex1: {flex: 1},
  iconSize: {
    width: 30,
    height: 30,
  },
  actionBtn: {
    width: 20,
    height: 20,
  },
  header: {
    color: Colors.violet,
    fontSize: 15,
    paddingStart: 20,
    fontWeight: '700',
  },
  justifyContentSpaceBtn: {justifyContent: 'space-between'},
  searchBar: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 10,
    paddingStart: 15,
    borderWidth: 1,
    borderColor: Colors.violet,
    borderRadius: 20,
  },
  sort: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginStart: 10,
    borderWidth: 1,
    borderColor: Colors.violet,
    borderRadius: 20,
    justifyContent: 'center',
  },
  userName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  logoutBtn: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  logoutBtnFnt: {
    color: Colors.violet,
    fontSize: 15,
    fontWeight: 'bold',
  },
  addNoteBtn: {
    backgroundColor: Colors.violet,
    padding: 15,
    borderRadius: 300,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  note: {
    backgroundColor: Colors.white,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 14,
  },
  noteTitleContainer: {
    flex: 2,
    marginStart: 20,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  noteDetails: {
    fontSize: 15,
    marginBottom: 3,
  },
  dateDetails: {
    fontSize: 12,
    marginBottom: 3,
    marginRight: 10,
    color: Colors.violet,
    marginEnd: 15,
    alignSelf: 'flex-end',
  },
  likeIcon: {
    width: 30,
    height: 30,
  },
  noteStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingStart: 15,
    paddingEnd: 25,
    flex: 1,
  },
  indexContainerStyle: {
    width: 25,
  },
  indexLetterStyle: {
    fontSize: 15,
    color: Colors.violet,
    marginBottom: 1,
  },
  indexLetterContainerStyle: {
    height: 25,
    width: 20,
  },
  likeBtn: {
    alignSelf: 'center',
  },
});

export default styles;
