/** @jsxImportSource theme-ui */
import { Box, Grid, Text } from "theme-ui";
import numeral from "numeral";
import { useState } from "react";
import { useMutation } from "react-query";

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
  const [isClick, setIsClick] = useState(false);
  const [marketData, setMarketData] = useState(null);

  const mutation = useMutation(
    ({ id }) => {
      return fetch(
        `https://api.coincap.io/v2/assets/${id}/markets?limit=20`
      ).then((res) => res.json());
    },
    {
      onSuccess: (res) => {
        setMarketData(res.data);
      },
    }
  );

  const onProductPanleClick = () => {
    mutation.mutate({
      id,
    });
    setIsClick(!isClick);
  };

  return (
    <Box onClick={onProductPanleClick}>
      <Grid
        columns={[4, 4, '0.5fr 1.5fr repeat(6, 1fr)']}
        p={2}
        sx={{textAlign: 'center', borderBottom: '1px solid', borderColor:'muted'}}
      >
        <Box >{rank}</Box>
        <Box>
          <a href={explorer} target="_blank">
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
        <Box sx={{ display: `${isClick ? "block" : "none"}` }}>
          {/* {marketData?.map((data) => (
            <Label>
              {data.baseId}{data.baseSymbol}/{data.quoteSymbol}
            </Label>
          ))} */}
        </Box>
      </Grid>
    </Box>
  );
};

export default ProductPanel;
