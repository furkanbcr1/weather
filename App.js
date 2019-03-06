import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Style , Button, TextInput } from 'react-native';



export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  state={city:''};

  componentDidMount(city){
    const api="b218d2005dd74a8ca7f113737190203";
    return fetch('http://api.worldweatheronline.com/premium/v1/weather.ashx?key='+api+'&&num_of_days=5&format=json&q='+this.state.city+'')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.data.weather
        },function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{backgroundColor:'beige', alignItems:'center',flex: 1, paddingTop:30}}>

      <TextInput
          style={{textAlign:'center', width:200, height: 40, borderWidth:0.5}}
          placeholder="Enter the city name..."
          onChangeText={(change_text) => this.setState({city:change_text})}
          change_text={this.state.city}
      />

        <FlatList style={ {paddingTop:12}}
          data={this.state.dataSource}
          renderItem={({item}) =>
          <View style={ { borderWidth:0.5,width:350}} >
            <Text style={{textAlign:'center'}}>
            {"\nDate: "+item.date+"\n"+"Minimum Temperature: "+item.mintempC+"\n"+"Maximum Temperature: "+item.maxtempC+"\n"+"Weather Forecast: "+item.hourly[0].weatherDesc[0].value+"\n"}</Text>
          </View>
          }
          
        />
    <Button
        title="SHOW WEATHER"
        onPress={() => {{{this.componentDidMount(this.state.city)}}}}
    />
      </View>
    );
  }
}
