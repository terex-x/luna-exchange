import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, CircularProgress, Stack, Box } from '@mui/material';
import { CurrenciesCheckboxList, BitcoinPriceChart, Header } from '@/components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { isDeepEqual, getCurrencySymbol } from '@/utils';

const useStyles = makeStyles({
  root: {
    padding: 16,
    height: '100vh'
  },
  loading: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currenciesContainer: {
    marginTop: 16,
  },
  increasedPrice: {
    color: 'green',
  },
  decreasedPrice: {
    color: 'red',
  },
});

const BitcoinPricePage = () => {
  const classes = useStyles(); // Material-UI styles
  const [btcPriceData, setBtcPriceData] = useState(null); // State for storing BTC price data
  const [refreshInterval, setRefreshInterval] = useState(5000); // State for storing the refresh interval
  const [displayedCurrencies, setDisplayedCurrencies] = useState(['USD', 'GBP', 'EUR']); // State for storing the displayed currencies
  const [btcPriceList, setBtcPriceList] = useState([]); // State for storing the list of BTC price data
  const [lastChangedBtcPriceData, setLastChangedBtcPriceData] = useState(null); // State for storing the last changed BTC price data
  const [processedBtcPriceList, setProcessedBtcPriceList] = useState(null); // State for storing the processed BTC price list

  useEffect(() => {
    const fetchBtcPriceData = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        if (!isDeepEqual(data, btcPriceData)) {
          setLastChangedBtcPriceData(btcPriceData);
          setBtcPriceData(data);
          setBtcPriceList((prevBtcPriceList) => [...prevBtcPriceList, data]);
        }
      } catch (error) {
        console.error('Failed to fetch BTC price data:', error);
      }
    };

    const interval = setInterval(fetchBtcPriceData, refreshInterval);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [refreshInterval, btcPriceData]);

  useEffect(() => {
    // Processing BTC price list
    const processedBtcPriceList = btcPriceList.map(item => ({
      time: item.time.updatedISO,
      ...Object.fromEntries(Object.entries(item.bpi).map(([currency, data]) => 
        [currency, parseFloat(data.rate.replace(/,/g, ""))]
      ))
    }));
    setProcessedBtcPriceList(processedBtcPriceList);
  }, [btcPriceList]);

  const handleRefreshIntervalChange = (event) => {
    setRefreshInterval(Number(event.target.value)); // Update refresh interval
  };

  const handleCurrencyToggle = (currency) => {
    const updatedCurrencies = displayedCurrencies.includes(currency)
      ? displayedCurrencies.filter((c) => c !== currency)
      : [...displayedCurrencies, currency];
    setDisplayedCurrencies(updatedCurrencies);
  };

  if (!btcPriceData) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  const { time, bpi } = btcPriceData;

  return (
    <div className={classes.root}>
      <Header />
      <Box>
        <Stack direction="row" alignItems={'center'}><AccessTimeIcon /> &nbsp; Last updated: {new Date(time.updated).toLocaleString()}</Stack>
        <div>
          <TextField
            type="number"
            label="Refresh Interval (ms)"
            value={refreshInterval}
            onChange={handleRefreshIntervalChange}
            sx={{ mt: 3 }}
          />
        </div>
        <div className={classes.currenciesContainer}>
          <CurrenciesCheckboxList 
            bpi={bpi}
            displayedCurrencies={displayedCurrencies}
            handleCurrencyToggle={handleCurrencyToggle}
            lastChangedBtcPriceData={lastChangedBtcPriceData}
            getCurrencySymbol={getCurrencySymbol}
            priceChangeColor={classes}
          />
        </div>
        <div>
          <BitcoinPriceChart 
            processedBtcPriceList={processedBtcPriceList} 
            getCurrencySymbol={getCurrencySymbol} 
            displayedCurrencies={displayedCurrencies}
          />
        </div>
      </Box>
    </div>
  );
};

export default BitcoinPricePage;
