
import { useState, useEffect, useRef } from 'react'
import Table from '../components/share/Table'
import { Container, Input, Heading, Grid, Button, Box} from 'theme-ui'

export default function Home() {
  
  const inputEl = useRef(null);
  const [initData, setInitData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(async()=>{
    let res = await fetch("https://api.coincap.io/v2/assets?limit=20").then((res) => res.json())
    setInitData(res.data);
  },[]);

  const onSearchClick = () => {
    let inputText = inputEl.current.value.toLowerCase();
    if(inputText){
      let filterResult = initData.filter(obj => {
        if(obj.symbol.toLowerCase() === inputText || obj.name.toLowerCase() === inputText){
          return obj;
        }
      return;
      })
      setTableData(filterResult);
    }else{
      setTableData([]);
    }
  };

  const onResetClick = () => {
    inputEl.current.value = '';
    setTableData(initData);
  }

  return (
    <Container p={4}>
      <Grid columns={[1,3,4]} >
        <Heading as="h1" sx={{textAlign:['center','left']}}>Crypto Market</Heading>
        <Input rows={1} ref={inputEl} />
        <Button onClick={onSearchClick} ml={[0,0,2]}>Search</Button>
        <Button onClick={onResetClick} ml={[0,0,2]}>Reset</Button>
      </Grid>
      <Box my={2} sx={{color: 'red', textAlign:'center'}}> 
        {
          tableData.length? "" : 'No Record Found'
        }
      </Box>
      <Table apiData={tableData || initData} />
    </Container>
  )
}
