import { FormControlLabel, Checkbox, Typography, Stack } from '@mui/material';

const CurrenciesCheckboxList = ({ bpi, displayedCurrencies, handleCurrencyToggle, lastChangedBtcPriceData, getCurrencySymbol, priceChangeColor }) => {
  return (
    <>
      <Typography variant="h6">Currencies</Typography>
      {Object.entries(bpi).map(([currency, data]) => {
        const previousRate = parseFloat((lastChangedBtcPriceData ? lastChangedBtcPriceData.bpi[currency].rate : "0").replace(/,/g, ""));
        const currentRate = parseFloat(data.rate.replace(/,/g, ""));
        const priceChange = currentRate - previousRate;

        return (
          <Stack key={currency} direction={'row'} alignItems={'center'}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={displayedCurrencies.includes(currency)}
                  onChange={() => handleCurrencyToggle(currency)}
                />
              }
              label={`${data.description} (${currency}): `}
            />
            <Typography className={priceChange > 0 ? priceChangeColor.increasedPrice : priceChangeColor.decreasedPrice}>{getCurrencySymbol(currency) + currentRate}</Typography>
          </Stack>
        );
      })}
    </>
  );
};

export default CurrenciesCheckboxList;
