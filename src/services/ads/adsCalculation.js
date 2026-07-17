/**
 * =====================================================
 * Project Phoenix
 * Product : Myntra Analytics
 * Module  : Ads Calculation Engine
 * Version : V1.1
 * =====================================================
 */

export function calculateAdsMetrics(row){

    const impressions = Number(row.impressions || 0);

    const clicks = Number(row.clicks || 0);

    const spend = Number(row.ad_spend || 0);

    const units = Number(row.units_sold_total || 0);

    const revenue = Number(row.total_revenue || 0);

    const directRevenue = Number(row.direct_revenue || 0);

    const ctr =

        impressions === 0

            ? 0

            : (clicks / impressions) * 100;

    const cvr =

        clicks === 0

            ? 0

            : (units / clicks) * 100;

    const roi =

        spend === 0

            ? 0

            : revenue / spend;

    return{

        impressions,

        clicks,

        spend,

        units,

        revenue,

        directRevenue,

        ctr,

        cvr,

        roi

    };

}

export function mergeAdsMetrics(target, source){

    target.impressions += source.impressions;

    target.clicks += source.clicks;

    target.spend += source.spend;

    target.units += source.units;

    target.revenue += source.revenue;

    target.directRevenue += source.directRevenue;

}

export function finalizeAdsMetrics(row){

    row.ctr =

        row.impressions === 0

            ? 0

            : (row.clicks / row.impressions) * 100;

    row.cvr =

        row.clicks === 0

            ? 0

            : (row.units / row.clicks) * 100;

    row.roi =

        row.spend === 0

            ? 0

            : row.revenue / row.spend;

    return row;

}

export function createEmptyAdsMetrics(){

    return{

        impressions:0,

        clicks:0,

        spend:0,

        units:0,

        revenue:0,

        directRevenue:0,

        ctr:0,

        cvr:0,

        roi:0

    };

}