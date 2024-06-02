import React, {useRef} from 'react';
import {View, FlatList, Text} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';

const Try = () => {
  const data = [
    {value: 'Lillie-Mai Allen', key: 'lCUTs2'},
    {value: 'Emmanuel Goldstein', key: 'TXdL0c'},
    {value: 'Winston Smith', key: 'zqsiEw'},
    {value: 'William Blazkowicz', key: 'psg2PM'},
    {value: 'Gordon Comstock', key: '1K6I18'},
    {value: 'Philip Ravelston', key: 'NVHSkA'},
    {value: 'Rosemary Waterlow', key: 'SaHqyG'},
    {value: 'Julia Comstock', key: 'iaT1Ex'},
    {value: 'Mihai Maldonado', key: 'OvMd5e'},
    {value: 'Murtaza Molina', key: '25zqAO'},
    {value: 'Peter Petigrew', key: '8cWuu3'},
    {value: 'Random Name 1', key: 'RandomKey1'},
    {value: 'Random Name 2', key: 'RandomKey2'},
    {value: 'Random Name 3', key: 'RandomKey3'},
    {value: 'Random Name 4', key: 'RandomKey4'},
    {value: 'Random Name 5', key: 'RandomKey5'},
    {value: 'Random Name 6', key: 'RandomKey6'},
    {value: 'Random Name 7', key: 'RandomKey7'},
    {value: 'Random Name 8', key: 'RandomKey8'},
    {value: 'Random Name 9', key: 'RandomKey9'},
    {value: 'Random Name 10', key: 'RandomKey10'},
    {value: 'Random Name 11', key: 'RandomKey11'},
    {value: 'Random Name 12', key: 'RandomKey12'},
    {value: 'Random Name 13', key: 'RandomKey13'},
    {value: 'Random Name 14', key: 'RandomKey14'},
    {value: 'Random Name 15', key: 'RandomKey15'},
    {value: 'Random Name 16', key: 'RandomKey16'},
    {value: 'Random Name 17', key: 'RandomKey17'},
    {value: 'Random Name 18', key: 'RandomKey18'},
    {value: 'Random Name 19', key: 'RandomKey19'},
    {value: 'Random Name 20', key: 'RandomKey20'},
    {value: 'Random Name 21', key: 'RandomKey21'},
    {value: 'Random Name 22', key: 'RandomKey22'},
    {value: 'Random Name 23', key: 'RandomKey23'},
    {value: 'Random Name 24', key: 'RandomKey24'},
    {value: 'Random Name 25', key: 'RandomKey25'},
    {value: 'Random Name 26', key: 'RandomKey26'},
    {value: 'Random Name 27', key: 'RandomKey27'},
    {value: 'Random Name 28', key: 'RandomKey28'},
    {value: 'Random Name 29', key: 'RandomKey29'},
    {value: 'Random Name 30', key: 'RandomKey30'},
    {value: 'Random Name 31', key: 'RandomKey31'},
    {value: 'Random Name 32', key: 'RandomKey32'},
    {value: 'Random Name 33', key: 'RandomKey33'},
    {value: 'Random Name 34', key: 'RandomKey34'},
    {value: 'Random Name 35', key: 'RandomKey35'},
    {value: 'Random Name 36', key: 'RandomKey36'},
    {value: 'Random Name 37', key: 'RandomKey37'},
    {value: 'Random Name 38', key: 'RandomKey38'},
    {value: 'Random Name 39', key: 'RandomKey39'},
    {value: 'Random Name 40', key: 'RandomKey40'},
    {value: 'Random Name 41', key: 'RandomKey41'},
    {value: 'Random Name 42', key: 'RandomKey42'},
    {value: 'Random Name 43', key: 'RandomKey43'},
    {value: 'Random Name 44', key: 'RandomKey44'},
    {value: 'Random Name 45', key: 'RandomKey45'},
    {value: 'Random Name 46', key: 'RandomKey46'},
    {value: 'Random Name 47', key: 'RandomKey47'},
    {value: 'Random Name 48', key: 'RandomKey48'},
    {value: 'Random Name 49', key: 'RandomKey49'},
    {value: 'Random Name 50', key: 'RandomKey50'},
    {value: 'Random Name 51', key: 'RandomKey51'},
    {value: 'Random Name 52', key: 'RandomKey52'},
    {value: 'Random Name 53', key: 'RandomKey53'},
    {value: 'Random Name 54', key: 'RandomKey54'},
    {value: 'Random Name 55', key: 'RandomKey55'},
    {value: 'Random Name 56', key: 'RandomKey56'},
    {value: 'Random Name 57', key: 'RandomKey57'},
    {value: 'Random Name 58', key: 'RandomKey58'},
    {value: 'Random Name 59', key: 'RandomKey59'},
    {value: 'Random Name 60', key: 'RandomKey60'},
    {value: 'Random Name 61', key: 'RandomKey61'},
    {value: 'Random Name 62', key: 'RandomKey62'},
    {value: 'Random Name 63', key: 'RandomKey63'},
    {value: 'Random Name 64', key: 'RandomKey64'},
    {value: 'Random Name 65', key: 'RandomKey65'},
    {value: 'Random Name 66', key: 'RandomKey66'},
    {value: 'Random Name 67', key: 'RandomKey67'},
    {value: 'Random Name 68', key: 'RandomKey68'},
    {value: 'Random Name 69', key: 'RandomKey69'},
    {value: 'Random Name 70', key: 'RandomKey70'},
    {value: 'Random Name 71', key: 'RandomKey71'},
    {value: 'Random Name 72', key: 'RandomKey72'},
    {value: 'Random Name 73', key: 'RandomKey73'},
    {value: 'Random Name 74', key: 'RandomKey74'},
    {value: 'Random Name 75', key: 'RandomKey75'},
    {value: 'Random Name 76', key: 'RandomKey76'},
    {value: 'Random Name 77', key: 'RandomKey77'},
    {value: 'Random Name 78', key: 'RandomKey78'},
    {value: 'Random Name 79', key: 'RandomKey79'},
    {value: 'Random Name 80', key: 'RandomKey80'},
    {value: 'Random Name 81', key: 'RandomKey81'},
    {value: 'Random Name 82', key: 'RandomKey82'},
    {value: 'Random Name 83', key: 'RandomKey83'},
    {value: 'Random Name 84', key: 'RandomKey84'},
    {value: 'Random Name 85', key: 'RandomKey85'},
    {value: 'Random Name 86', key: 'RandomKey86'},
    {value: 'Random Name 87', key: 'RandomKey87'},
    {value: 'Random Name 88', key: 'RandomKey88'},
    {value: 'Random Name 89', key: 'RandomKey89'},
    {value: 'Random Name 90', key: 'RandomKey90'},
    {value: 'Random Name 91', key: 'RandomKey91'},
    {value: 'Random Name 92', key: 'RandomKey92'},
    {value: 'Random Name 93', key: 'RandomKey93'},
    {value: 'Random Name 94', key: 'RandomKey94'},
    {value: 'Random Name 95', key: 'RandomKey95'},
    {value: 'Random Name 96', key: 'RandomKey96'},
    {value: 'Random Name 97', key: 'RandomKey97'},
    {value: 'Random Name 98', key: 'RandomKey98'},
    {value: 'Random Name 99', key: 'RandomKey99'},
    {value: 'Random Name 100', key: 'RandomKey100'},
  ];

  return (
    <AlphabetList
      data={data}
      indexLetterStyle={{
        color: 'blue',
        fontSize: 15,
      }}
      renderCustomItem={item => (
        <View>
          <Text>{item.value}</Text>
        </View>
      )}
      renderCustomSectionHeader={section => (
        <View>
          <Text>{section.title}</Text>
        </View>
      )}
    />
  );
};

export default Try;
