import axios from 'axios';
import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStore();
  }, []);

  const getStore = async () => {
    const configurationObject = {
      method: 'get',
      url: `https://61ce6ff47067f600179c5e98.mockapi.io/v1/orders?page=1&limit=10`,
    };
    const response = await axios(configurationObject);
    setData(response?.data);
  };

  const Header = ({title}) => {
    return (
      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
          {title}
        </Text>
      </View>
    );
  };

  const RenderCard = ({orderId, name, quantity, totalItem, status, date}) => {
    return (
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#E0E0E0',
          borderRadius: 6,
          padding: 10,
          marginBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            borderColor: '#E0E0E0',
          }}>
          <View>
            <Text>Order Id</Text>
            <Text>{orderId}</Text>
          </View>
          <View>
            <Text>{status}</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text>Customer</Text>
            <Text>{name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text>Qty/Package</Text>
            <Text>{quantity}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text>Total Item</Text>
            <Text>{totalItem}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text>Order Date</Text>
            <Text>{date}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Header title={'Order List'} />
      <ScrollView style={{padding: 10}}>
        {data?.map(el => {
          console.log(el, 'el');
          return (
            <RenderCard
              orderId={el?.order_id}
              status={el?.status}
              name={el?.name}
              date={el?.created_at}
              quantity={el?.quantity}
              totalItem={el?.total_item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
