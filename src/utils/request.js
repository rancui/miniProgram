import request from './sealAxios';

const baseUrl = process.env.VUE_APP_BASE_URL;
export function TrendChart(
    ProductId,
    DimensionType,
    PeriodType,
    CustomerType,
    DecisionType,
    MonthTime,
    ChannelType,
    AdvanceFee,
    DecisionFlow
    ){
        console.log(process.env);
    return request.post('/VcreditAppAPI/TrendChart',{
        ProductId,
        DimensionType,
        PeriodType,
        CustomerType,
        DecisionType,
        MonthTime,
        ChannelType,
        AdvanceFee,
        DecisionFlow
    });
}

