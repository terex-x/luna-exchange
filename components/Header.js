import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const linkStyle = (path) => ({
    fontWeight: router.pathname === path ? 'bold' : 'normal',
    color: router.pathname === path ? '#000' : '#444',
    cursor: 'pointer'
  });
    
  return  (
    <Stack direction={'row'}  fontSize="20px" sx={{ mb: 4 }}>
      <Typography sx={linkStyle('/')} onClick={() => router.replace('/')}>Bitcoin Price Index</Typography>
      <Typography>&nbsp;|&nbsp;</Typography>
      <Typography sx={linkStyle('/nft-list')} onClick={() => router.replace('/nft-list')}>NFT List</Typography>
    </Stack>
  )
}

export default Header;