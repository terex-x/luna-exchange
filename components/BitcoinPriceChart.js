import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import { getCurrencyColor } from '../utils';

const BitcoinPriceChart = ({ processedBtcPriceList, getCurrencySymbol, displayedCurrencies }) => {
    const formatXAxis = (tickItem) => {
        return new Date(tickItem).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getDomain = () => {
        if (!processedBtcPriceList) return ['auto', 'auto'];
        
        let min = Infinity;
        let max = -Infinity;
        
        for (const entry of processedBtcPriceList) {
            for (const currency of displayedCurrencies) {
            if (entry[currency] < min) {
                min = entry[currency];
            }
            if (entry[currency] > max) {
                max = entry[currency];
            }
            }
        }
        
        return [Math.floor(min) - 200, Math.ceil(max) + 200];
    };
    return (
        <LineChart width={800} height={400} data={processedBtcPriceList} syncId="anyId" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="time" tickFormatter={formatXAxis} style={{ fontSize: 14, color: "#555" }} />
            <YAxis domain={getDomain()} style={{ fontSize: 14, color: "#555" }} />
            <Tooltip content={<CustomTooltip getCurrencySymbol={getCurrencySymbol} />} />
            <Legend />
            {displayedCurrencies.map(currency => (
              <Line type="monotone" dataKey={currency} stroke={getCurrencyColor(currency)} dot={false} activeDot={{ r: 6 }} key={currency} />
            ))}
        </LineChart>
    );
};

export default BitcoinPriceChart;