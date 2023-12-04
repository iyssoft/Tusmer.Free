import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { HomeStyles } from '../../style';
import { widthPercent, CarouselItemsFirst } from '../../Utiles';
import { HomePageTopSliderData} from "../../services/datas";
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';

const HomeCarouselSlider = (props) => {
  const { navigation } = props;
  const { Colors } = useTheme();
  const HomeStyle = useMemo(() => HomeStyles(Colors), [Colors]);
  let _slider1Ref;
  const { t } = useTranslation();
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={HomeStyle.rounftextview} >
          <Image style={HomeStyle.imagsetstyle} resizeMode="cover" source={{uri:item.imageUrl}} />
          {/* <Text
            style={HomeStyle.textContainer}
          >
            {t(item.title)}
          </Text>
          <Text
            style={HomeStyle.textContainertwo}
          >
            {t(item.paregraphtitle)}
          </Text> */}
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <Carousel
      ref={c => _slider1Ref = c}
      data={HomePageTopSliderData}
      renderItem={_renderItem}
      sliderWidth={widthPercent(100)}
      itemWidth={widthPercent(85)}
      hasParallaxImages={false}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      containerCustomStyle={HomeStyle.slider}
      loop={true}
      autoplay={true}
      enableSnap={true}
      bounces={false}
      lockScrollWhileSnapping={true}
    />
  );
};
export default HomeCarouselSlider;