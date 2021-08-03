
import { useState, useEffect, useRef } from 'react'
import Table from '../components/share/Table'
import { Container, Input, Heading, Grid, Button, Box, Spinner} from 'theme-ui'

import {
  useQuery
} from 'react-query'

export default function Home() {
  
  const inputEl = useRef(null);
  const [tableData, setTableData] = useState([]);

  const { isLoading, data:initData } = useQuery('initData', () =>
     fetch('https://api.coincap.io/v2/assets?limit=20').then(res =>
       res.json()
     ),
   )

   useEffect(()=> { 
    setTableData(initData?.data)
   },[initData])
 
  const onSearchClick = () => {
    let inputText = inputEl.current.value.toLowerCase();
    if(inputText){
      let filterResult = tableData.filter(obj => {
        if(obj.symbol.toLowerCase() === inputText || obj.name.toLowerCase() === inputText){
          return obj;
        }
      return;
      })
      setTableData(filterResult);
    }else{
      setTableData(initData?.data);
    }
  };

  const onResetClick = () => {
    inputEl.current.value = '';
    setTableData(initData?.data);
  }
  return (
    <Container p={4}>
      <Grid columns={[1,3,4]} >
        <Heading as="h1" sx={{textAlign:['center','left']}}>Crypto Market</Heading>
        <Input rows={1} ref={inputEl} placeholder='e.g. BTC'/>
        <Button onClick={onSearchClick} ml={[0,0,2]}>Search</Button>
        <Button onClick={onResetClick} ml={[0,0,2]}>Reset</Button>
      </Grid>
      {
        isLoading ? 
        <Box my={5} sx={{textAlign: 'center'}}>
          <Spinner /> 
        </Box>
        : 
        <Table apiData={tableData} />
      }
    </Container>
  )
}
