/** @jsxImportSource theme-ui */

import { Box, Grid } from 'theme-ui'
import ProductPanel from './ProductPanel'

const Table = ({apiData}) => {
    return(
      <Box mt={4}>
        <Grid 
          p={2} 
          columns={[4, 4, '0.5fr 1.5fr repeat(6, 1fr)']} 
          sx={{ backgroundColor: 'muted',textAlign: 'center'}}
        >
          <Box>Rank</Box>
          <Box>Name</Box>
          <Box>Price</Box>
          <Box>Market Cap</Box>
          <Box sx={{display: ["none", "none", "block"]}}>VWAP (24Hr)</Box>
          <Box sx={{display: ["none", "none", "block"]}}>Supply</Box>
          <Box sx={{display: ["none", "none", "block"]}}>Voluman (24Hr)</Box>
          <Box sx={{display: ["none", "none", "block"]}}>Change (24Hr)</Box>
        </Grid>
        {
        apiData?.map(data => (
          <ProductPanel key={data.id } {...data} />
        ))
        }    
      </Box>
    )
}

export default Table;