import { Box } from '@mui/material';
import { getCurrencySymbol } from '../utils'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
        <Box>
            <p className="label">{`Time: ${new Date(label).toLocaleString()}`}</p>
            {payload.map((item, index) => (
            <p key={index} className="intro" style={{ color: item.color }}>
                {`${item.name}: ${getCurrencySymbol(item.name)}${item.value.toFixed(2)}`}
            </p>
            ))}
        </Box>
        );
    }

    return null;
};

export default CustomTooltip;