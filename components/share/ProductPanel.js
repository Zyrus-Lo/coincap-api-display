/** @jsxImportSource theme-ui */
import { Box, Grid, Text } from "theme-ui";
import numeral from "numeral";

const ProductPanel = ({
  id,
  rank,
  explorer,
  name,
  symbol,
  priceUsd,
  supply,
  marketCapUsd,
  vwap24Hr,
  volumeUsd24Hr,
  changePercent24Hr,
}) => {
  return (
      <Grid
        columns={[4, 4, '0.5fr 1.5fr repeat(6, 1fr)']}
        p={2}
        sx={{textAlign: 'center', borderBottom: '1px solid', borderColor:'muted'}}
      >
        <Box >{rank}</Box>
        <Box>
          <a href={explorer} target="_blank" rel="noreferrer">
            <Box>{name}</Box>
            <Text sx={{ fontSize: 1 }}>{symbol}</Text>
          </a>
        </Box>
        <Box>{numeral(marketCapUsd).format("($0.00a)")}</Box>
        <Box>{numeral(marketCapUsd).format("($0.00a)")}</Box>
        <Box sx={{ display: ["none", "none", "block"] }}>
          {numeral(vwap24Hr).format("($0.00a)")}
        </Box>
        <Box sx={{ display: ["none", "none", "block"] }}>
          {numeral(supply).format("0.00a")}
        </Box>
        <Box sx={{ display: ["none", "none", "block"] }}>
          {numeral(volumeUsd24Hr).format("($0.00a)")}
        </Box>
        <Box sx={{ display: ["none", "none", "block"] }}>
          {`${numeral(changePercent24Hr).format("0.00")}%`}
        </Box>
      </Grid>
  );
};

export default ProductPanel;
