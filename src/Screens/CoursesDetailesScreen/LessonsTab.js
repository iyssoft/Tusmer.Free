import React, { useMemo, useContext, useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, FlatList } from "react-native";
import { LessonsTabStyle } from '../../style';
import { Container, LessonsTabViews, Spacing } from '../../Components';
import { SH } from '../../Utiles';
import { AuthContext } from '../../store/auth-context';

const Base_Url2= "https://online.tusmer.com/api";
const LectureByGroup="/lecture/LectureByGroup";
const LessonsTab = (props) => {
  const { Colors } = useTheme();
  const LessonsTabStyles = useMemo(() => LessonsTabStyle(Colors), [Colors]);
  const { onPress,groupId } = props;
  const authCtx= useContext(AuthContext);
  const [lectures, setLectures] = useState(null);

  const GetLectureList = () => {
    console.log("Get Lecture");
    console.log(groupId);
    fetch(
      Base_Url2+LectureByGroup,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "UserId": authCtx.token.id,
          "GroupId": groupId,
        })
      }
    ).then(response => response.json())
      .then(result => {
        if (result.isSuccess) {
          console.log(result);
          setLectures(result.data);
        }
        else {
        }
      }).catch(function (error) {
      });
    
  }
  useEffect(() => {
    // const title = groupName.split('>>').pop();
    // navigation.setOptions({ headerTitle: title });
    GetLectureList();
  }, []);
  return (
    <Container>
      <View style={LessonsTabStyles.overviewtabminview}>
        <View>
          <Spacing space={SH(10)} />
          <FlatList
            data={lectures}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (<LessonsTabViews
              item={item}
              onPress={() => onPress(item.link)}
            />)}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </Container>
  );
}
export default LessonsTab;





