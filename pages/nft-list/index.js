import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Card, CardContent, Typography, Box, Paper, Grid, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, CircularProgress } from '@mui/material';
import { Header } from '@/components';

const NFTListPage = () => {
  const [nfts, setNfts] = useState([]); // State for storing NFT data
  const [account, setAccount] = useState(''); // State for storing Ethereum account address
  const [open, setOpen] = useState(false); // State for controlling the dialog
  const [selectedNFT, setSelectedNFT] = useState(null); // State for storing the selected NFT

  const handleClickOpen = (nft) => {
    setSelectedNFT(nft);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function for loading Web3 and fetching NFT data
  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. Please consider trying MetaMask!');
        return;
      }
      
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      
      if (!accounts.length) {
        window.alert('No Ethereum account found! Please ensure MetaMask is setup correctly.');
        return;
      }
      
      setAccount(accounts[0]);
      
      const response = await fetch('https://testnets-api.opensea.io/api/v1/assets?asset_contract_addresses=0xf9f33285b8BB61519954eb5c1cCDC0b45BA45bDF&order_direction=asc');
      const openseaData = await response.json();
      setNfts(openseaData.assets);
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <Stack>
      <Header />
      <Box p={4} sx={{ height: '100vh' }}>
        <Paper elevation={0}>
          <Box p={2}>
            <Typography>
              {!account ? 'Connecting...' : `Connected to: ${account}`}
            </Typography>
          </Box>
        </Paper>
        
        <Stack alignItems={'center'} justifyContent={'center'}>
        {
          account ? (
            <Grid container spacing={5} marginTop={2}>
              {nfts.map((nft, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card elevation={3} onClick={() => handleClickOpen(nft)}>
                    <CardMedia
                      component="img"
                      height="170"
                      image={nft.image_url}
                      alt={nft.name || nft.token_id}
                    />
                    <CardContent>
                      <Stack alignItems={'center'} style={{ fontSize: '20px' }} gutterBottom>
                        {nft.name || nft.token_id}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

              {selectedNFT && (
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{selectedNFT.name || selectedNFT.token_id}</DialogTitle>
                  <DialogContent>
                    <img src={selectedNFT.image_url} alt={selectedNFT.name || selectedNFT.token_id} style={{ maxWidth: '100%', height: 'auto' }} />
                    <Typography variant="body2" sx={{ mt: 2 }}>{`Token ID: ${selectedNFT.token_id}`}</Typography>
                    <Typography variant="body2">{`Address: ${selectedNFT.asset_contract.address}`}</Typography>
                    <Typography variant="body2">{`Created: ${new Date(selectedNFT.asset_contract.created_date).toLocaleString()}`}</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                  </DialogActions>
                </Dialog>
              )}
            </Grid>
          ) : (
            <CircularProgress />
          )
        }
        </Stack>
      </Box>
    </Stack>
  );
};

export default NFTListPage;
