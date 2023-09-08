import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { server } from '../index'
import { Container,Stack,HStack,VStack,Heading,Text,Image,Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from '../Components/Loader';
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'


const Coins = () => {
const [coins,setCoins] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(false);
const [page,setPage] = useState(1);
const [currency,setCurrency] = useState("inr");

const currencySymbol = currency ==="inr"?"Rs":currency==="eur"?"Eur":"$";
const changePage = (page) => {
  setPage(page);
  setLoading(true);
};
const btns = new Array(132).fill(1)


useEffect(()=>{

    const fetchCoins = async()=>{
      try{
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      
      setCoins(data);
      console.log(data);
      setLoading(false);
      }catch(error ){
        setError(true);
          setLoading(false);
      } 
    };
    fetchCoins();
    
},[currency,page]);

if(error)return <ErrorComponent message={"Error while fetching Coins"}/>



  return (
    <>
    <Container maxW={'container.xl'} >
      {loading?(
      <Loader/>
      ):(<>

    <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
      <HStack spacing={'4'}>
        <Radio value={'inr'}>Rs</Radio>
        <Radio value={'usd'}>$</Radio>
        <Radio value={'eur'}>Eur</Radio>
      </HStack>
    </RadioGroup>





    <HStack wrap={"wrap"}>
      {coins.map((i)=>(
       <CoinCard
       id={i.id}
       key={i.id}
       name={i.name}
       price={i.current_price}
       img={i.image}
       symbol={i.symbol}
       currencySymbol={currencySymbol}
       />
      ))}
    </HStack>
    <HStack w={"full"} overflowX={"auto"} p={"8"} justifyContent={'space-evenly'}>
      {
        btns.map((item,index)=>(
          <Button key={index}
           bgColor={'blackAlpha.900'} 
           color={'white'} 
           onClick={()=>changePage(2)}
           >
            {index+1}
           </Button>
    
        )
        )


      }
    </HStack>
    
    
    
    </>)}

    </Container>
    </>
  );
}; 

 



export default Coins;

